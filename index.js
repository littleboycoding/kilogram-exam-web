const { app, ipcMain, BrowserWindow } = require("electron");
const { google } = require("googleapis");
const fs = require("fs");
const http = require("http");

const TOKEN = "token.json";

var mainWindow;
var dialogSigninWindow;
var oauth2;

var server = http.createServer((req, res) => {
  const code = require("url").parse(req.url, true).query.code;
  oauth2.getToken(code, async function(err, credentials) {
    oauth2.setCredentials(credentials);
    fs.writeFile(TOKEN, JSON.stringify(credentials), err => {
      if (err) console.log("Error in saving token.json");
    });
    dialogSigninWindow.close();
    server.close(
      mainWindow.webContents.send("signInSuccess"),
      mainWindow.webContents.send("userInfo", await getProfile())
    );
  });
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#fff",
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile("index.html");

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    fs.readFile(TOKEN, async function(err, data) {
      if (!err) {
        oauth2.setCredentials(JSON.parse(data));
        server.close(
          mainWindow.webContents.send("signInSuccess"),
          mainWindow.webContents.send("userInfo", await getProfile())
        );
      }
    });
  });
}

app.on("ready", () => {
  fs.readFile("credentials.json", (err, data) => {
    const credentials = JSON.parse(data);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    oauth2 = new google.auth.OAuth2(client_id, client_secret, redirect_uris[1]);
  });
  createWindow();
});

ipcMain.on("googleSignin", (event, arg) => {
  googleSignin();
});

function googleSignin() {
  const authUrl = oauth2.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/drive.appfolder",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile"
    ]
  });
  dialogSignin(authUrl);
}

function getProfile() {
  const people = google.people({
    version: "v1",
    auth: oauth2
  });
  return people.people.get({
    resourceName: "people/me",
    personFields: "emailAddresses,names,photos"
  });
}

function dialogSignin(url) {
  if (!dialogSigninWindow) {
    dialogSigninWindow = new BrowserWindow({
      width: 600,
      height: 800,
      autoHideMenuBar: true,
      backgroundColor: "#fff",
      webPreferences: {
        nodeIntegration: false
      }
    });
  }

  if (!server.listening) {
    server.listen(8080);
  }

  dialogSigninWindow.loadURL(url);
}

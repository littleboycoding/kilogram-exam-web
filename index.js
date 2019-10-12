const { app, ipcMain, BrowserWindow } = require("electron");
const { google } = require("googleapis");
const fs = require("fs");
const http = require("http");

var server = http.createServer((req, res) => {
  const code = require("url").parse(req.url, true).query.code;
  dialogSigninWindow.close();
  server.close(mainWindow.webContents.send("signInSuccess", code));
});

var mainWindow;
var dialogSigninWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#fff",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile("index.html");
}

app.on("ready", () => {
  createWindow();
});

ipcMain.on("googleSignin", (event, arg) => {
  googleSignin();
});

function googleSignin() {
  fs.readFile("credentials.json", (err, data) => {
    const credentials = JSON.parse(data);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oauth2 = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[1]
    );
    const authUrl = oauth2.generateAuthUrl({
      access_type: "offline",
      scope: "https://www.googleapis.com/auth/drive.appfolder"
    });
    dialogSignin(authUrl);
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

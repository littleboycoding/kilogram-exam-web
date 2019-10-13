/*
 * ====================================================================================================
 * Electron's main process file
 *
 * Author Thanawat Yodnil (Little Boy)
 * Written on 13 october 2019
 *
 * https://github.com/littleboycoding/kilogram-exam
 * ====================================================================================================
 */

const { app, ipcMain, BrowserWindow } = require("electron");
const { google } = require("googleapis");
const fs = require("fs");
const http = require("http");
//token.json used to store credentials, included refresh token, access token, scope and token type
const TOKEN = "token.json";
//scope to be request on authorization dialog
const SCOPE = [
  "https://www.googleapis.com/auth/drive.appfolder",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile"
];

var mainWindow;
var dialogSigninWindow;
var oauth2;
var server;

/*
 * createWindow()
 * create BrowserWindow instance into {var mainWindow}, which used to render main interface of program
 */

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

  //Once mainWindow ready to be shown, show it and check if there are already token.json has been saved in root directory
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    fs.readFile(TOKEN, async function(err, data) {
      if (!err) {
        oauth2.setCredentials(JSON.parse(data));
        mainWindow.webContents.send("signInSuccess");
        mainWindow.webContents.send("userInfo", await getProfile());
      }
    });
  });
}

//On app ready, read credentials.json file and create google.auth.OAuth2 with given data into oauth2. Then call createWindow() to create main window
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

/*
 * googleSignin()
 * Generate authorization url then call {function dialogSignin} with generated url
 */

function googleSignin() {
  const authUrl = oauth2.generateAuthUrl({
    access_type: "offline",
    scope: SCOPE
  });
  createHTTPServer();
  dialogSignin(authUrl);
}

/*
 * createHTTPServer()
 * Intialize http.createServer into {var server}. Used to wait for authorization that send right back from google after user gived access with request scope.
 * Once receive request set oauth2 credentials with new fecthed credentials, then save it into token.json at root directory and call server.close() to stop server.
 */

function createHTTPServer() {
  server = http.createServer((req, res) => {
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
}

/*
 * getProfile()
 * return object with user's info and request information (header, status etc)
 *
 * Usage : Must call this function with await to ensure you get the return (Because it return promise)
 */

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

/*
 * dialogSignin(String: url)
 * Create new BrowserWindow into {var dialogSigninWindow}, check if there are already server running at port 8080, if not start listen new one. Then load dialogSigninWindow with {parameter url}
 */

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

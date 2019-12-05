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
var printWindow;
var dialogSigninWindow;
var oauth2;
var server;
var drive;
var markName = { 1: "ก", 2: "ข", 3: "ค", 4: "ง", 5: "ฅ" };

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
  mainWindow.on("closed", () => app.quit());

  //Once mainWindow ready to be shown, show it and check if there are already token.json has been saved in root directory
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    fs.readFile(TOKEN, async function(err, data) {
      if (!err) {
        oauth2.setCredentials(JSON.parse(data));
        await initializeData();
        mainWindow.webContents.send("signInSuccess");
        mainWindow.webContents.send("userInfo", await getProfile());
      }
    });
  });
}
/*
 * initializeData()
 * Check if there are already has file fileID.json if yes then leave, if no, check if already created on drive, if not create new one on drive then save into fileID.json on root directory, if already has on drive then save into fileID.json on root directory.
 *
 */

function initializeData() {
  return new Promise((resolve, eject) => {
    fs.readFile("fileID.json", async (err, data) => {
      if (err) {
        drive.files.list(
          {
            spaces: "appDataFolder",
            fields: "nextPageToken, files(id, name)",
            pageSize: 100
          },
          (err, res) => {
            if (err) {
              console.log(err);
            } else {
              if (res.data.files.length > 0) {
                console.log(
                  "Found a file on Google drive fetching it into fileID.json ",
                  res.data.files
                );
                let fileUploaded = {};
                res.data.files.forEach(x => {
                  fileUploaded[x.name] = x.id;
                });
                fs.writeFile(
                  "fileID.json",
                  JSON.stringify(fileUploaded),
                  err => {
                    if (err) console.log(err);
                    resolve();
                  }
                );
              } else {
                console.log("File not found on Google drive, creating new one");
                require("./createFile")
                  .createInitialFile(drive)
                  .then(() => resolve());
              }
            }
          }
        );
      } else {
        resolve();
      }
    });
  });
}

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
      server.close(async () => {
        await initializeData();
        mainWindow.webContents.send("signInSuccess");
        mainWindow.webContents.send("userInfo", await getProfile());
      });
    });
  });
}

/*
 * getProfile()
 * return object with user's info and request information (header, status etc)
 *
 * Return : Promise with response data
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
  dialogSigninWindow = new BrowserWindow({
    width: 600,
    height: 800,
    autoHideMenuBar: true,
    backgroundColor: "#fff",
    webPreferences: {
      nodeIntegration: false
    }
  });

  dialogSigninWindow.on("closed", () => {
    server.close();
  });

  if (!server.listening) {
    server.listen(8080);
  }
  dialogSigninWindow.loadURL(url);
}

/*
 * getData(String: data)
 * fetch data from given file id
 * Return: Promise
 */

function getData(data) {
  return drive.files.get({
    fileId: data,
    alt: "media"
  });
}

function updateData(fileName, data) {
  return drive.files.update({
    fileId: fileName,
    uploadType: "media",
    media: {
      mimeType: "application/json",
      body: data
    }
  });
}

//On app ready, read credentials.json file and create google.auth.OAuth2 with given data into oauth2. Then call createWindow() to create main window
app.on("ready", () => {
  fs.readFile("credentials.json", (err, data) => {
    const credentials = JSON.parse(data);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    oauth2 = new google.auth.OAuth2(client_id, client_secret, redirect_uris[1]);
    drive = google.drive({
      version: "v3",
      auth: oauth2
    });
  });
  createWindow();
});

ipcMain.on("googleSignin", (event, arg) => {
  googleSignin();
});

ipcMain.on("driveUpdate", (event, fileName, data) => {
  updateData(fileName, data).then(res => {
    event.reply("driveUpdateRes", res);
  });
});

ipcMain.on("driveGet", (event, data) => {
  getData(data).then(res => {
    event.reply("driveGetRes", res);
  });
});

ipcMain.on("logout", () => {
  console.log("Logout !");
  fs.unlinkSync("./token.json");
  fs.unlinkSync("./fileID.json");
  app.relaunch();
  app.exit(0);
});

ipcMain.on("print", (window, data) => {
  //mainWindow.webContents.printToPDF({}).then(pdf => {
  //fs.writeFile("./pdf.pdf", pdf, err => {
  //null;
  //});
  //});

  //mainWindow.webContents.print({}, (success, failed) => {
  //if (failed) console.log(failed);
  //console.log(success);
  //});

  const dataListed = Object.keys(data);
  let htmlResult = dataListed.map(map => {
    //return data[map]["title"] + data[map]["answer"];
    return (
      "<p>" +
      map +
      ". " +
      data[map]["title"] +
      "</p>" +
      Object.keys(data[map]["answer"])
        .map(maps =>
          data[map]["answer"][maps]
            ? markName[maps] + ". " + data[map]["answer"][maps]
            : null
        )
        .join("</br>")
    );
  });

  printWindow = new BrowserWindow({
    width: 600,
    height: 800,
    backgroundColor: "#fff",
    autoHideMenuBar: true,
    show: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  fs.writeFile(
    "question.html",
    "<title>ปริ้นแบบทดสอบ</title><h2>บททดสอบ</h2><p><b>คำชี้แจ้ง</b> จงเลือกคำตอบที่ถูกต้องที่สุด</p><hr>" +
      htmlResult.join("<hr>") +
      "<script>print()</script>",
    err => {
      if (err) {
        console.log(err);
      }
      printWindow.loadFile("question.html");
      printWindow.on("close", () => fs.unlinkSync("question.html"));
    }
  );
});

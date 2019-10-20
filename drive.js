const { ipcRenderer } = require("electron");
const fs = require("fs");

/*
 * driveGet(String: name)
 * get file from drive by given name, file name will be convert to ID automatically, see fileID.json
 * Return : Promise with file reponse
 */

async function driveGet(name) {
  fileName = new Promise((resolve, reject) => {
    fs.readFile("fileID.json", (err, data) => {
      if (err) console.log(err);
      resolve(JSON.parse(data)[name]);
    });
  });
  return new Promise(async (resolve, reject) => {
    ipcRenderer.send("driveGet", await fileName);
    ipcRenderer.on("driveGetRes", (event, res) => {
      resolve(res.data);
    });
  });
}

async function driveUpdate(name, data) {
  fileName = new Promise((resolve, reject) => {
    fs.readFile("fileID.json", (err, data) => {
      if (err) console.log(err);
      resolve(JSON.parse(data)[name]);
    });
  });
  return new Promise(async (resolve, reject) => {
    ipcRenderer.send("driveUpdate", await fileName, data);
    ipcRenderer.on("driveUpdateRes", (event, res) => {
      resolve(res.data);
    });
  });
}

module.exports = {
  driveGet: driveGet,
  driveUpdate: driveUpdate
};

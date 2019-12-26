//const { ipcRenderer } = require("electron");
//const fs = require("fs");

/*
 * driveGet(String: name)
 * get file from drive by given name, file name will be convert to ID automatically, see fileID.json
 * Return : Promise with file reponse
 */

export function driveGet(name) {
  return new Promise(async (resolve, reject) => {
    const fileID = await driveFetch(name);

    gapi.client.drive.files
      .get({
        fileId: fileID,
        alt: "media"
      })
      .then(res => {
        resolve(res.result);
      });
  });
}

async function driveFetch(name) {
  return new Promise(async resolve => {
    gapi.client.drive.files
      .list({
        spaces: "appDataFolder",
        pageSize: 10,
        fields: "nextPageToken, files(id, name)"
      })
      .then(function(response) {
        if (response.result.files.length > 0) {
          const files = response.result.files.findIndex(
            data => data.name == name
          );
          resolve(response.result.files[files].id);
        } else {
          import("./createFile.js").then(async Module => {
            await Module.createInitialFile();

            gapi.client.drive.files
              .list({
                spaces: "appDataFolder",
                pageSize: 10,
                fields: "nextPageToken, files(id, name)"
              })
              .then(function(response) {
                console.log(response);
                const files = response.result.files.findIndex(
                  data => data.name == name
                );
                resolve(response.result.files[files].id);
              });
          });
        }
      });
  });
}

export async function driveUpdate(name, data) {
  return new Promise(async (resolve, reject) => {
    const fileId = await driveFetch(name);
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onreadystatechange = function() {
      if (xhr.readyState != XMLHttpRequest.DONE) {
        return;
      }
      resolve(xhr.response);
    };
    xhr.open(
      "PATCH",
      "https://www.googleapis.com/upload/drive/v3/files/" +
        fileId +
        "?uploadType=media"
    );
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + gapi.auth.getToken().access_token
    );
    xhr.send(JSON.stringify(data));
  });
}

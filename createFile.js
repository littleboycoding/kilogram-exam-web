var fileList = {
  "result.json": { body: {} },
  "student.json": { body: {} },
  "question.json": { body: {} }
};
export function createInitialFile() {
  return new Promise(async (resolve, eject) => {
    for (const key of Object.keys(fileList)) {
      await creatingProcess(key, fileList[key]["body"]);
    }
    resolve();
  });
}

function creatingProcess(fileName, body) {
  var fileMetadata = {
    name: fileName,
    parents: ["appDataFolder"]
  };
  var media = {
    mimeType: "application/json",
    body: body
  };
  return gapi.client.drive.files.create({
    resource: fileMetadata,
    fields: "id, name"
  });
}

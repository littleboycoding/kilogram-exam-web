var fileUploaded = {};
var fileList = {
  "result.json": { body: {} },
  "student.json": { body: {} },
  "question.json": {
    body: {
      ตัวอย่างข้อสอบ: {
        1: {
          title: "คำถามข้อแรก",
          answer: {
            1: "ใช่",
            2: "ไม่ใช่",
            3: "ใช่ทั้งหมด",
            4: "ไม่มีข้อที่ถูก",
            5: "ถูกทั้งหมด",
          },
          correct: 1
        }
      }
    }
  }
};

function createInitialFile(drive) {
  return new Promise(async (resolve, eject) => {
    for (const key of Object.keys(fileList)) {
      await creatingProcess(key, fileList[key]["body"], drive).then(
        res => (fileUploaded[key] = res.data.id)
      );
    }
    require("fs").writeFile(
      "fileID.json",
      JSON.stringify(fileUploaded),
      err => {
        if (err) console.log(err);
        resolve();
      }
    );
  });
}

function creatingProcess(fileName, body, drive) {
  var fileMetadata = {
    name: fileName,
    parents: ["appDataFolder"]
  };
  var media = {
    mimeType: "application/json",
    body: JSON.stringify(body)
  };
  return drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: "id"
  });
}

module.exports.createInitialFile = createInitialFile;

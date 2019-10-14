var fileUploaded = {};
var fileList = {
  "question.json": {
    body: {
      "Fruit Bucket": {
        1: {
          title: "What's color of apple",
          answer: { 1: "Red", 2: "Pink", 3: "Purple", 4: "Black" },
          correct: 1
        },
        2: {
          title: "Which one is smallest",
          answer: {
            1: "Watermelon",
            2: "Durian",
            3: "Mango",
            4: "Orange"
          },
          correct: 4
        }
      },
      Animal: {
        1: {
          title: "How many leg does dog have ?",
          answer: { 1: "Four", 2: "Three", 3: "One", 4: "Two" },
          correct: 1
        },
        2: {
          title: "Can duck fly ?",
          answer: {
            1: "Yes",
            2: "No",
            3: "Some species can and some aren't",
            4: "Yes, but not so good"
          },
          correct: 4
        }
      }
    }
  }
};

async function createInitialFile(drive) {
  for (const key of Object.keys(fileList)) {
    await creatingProcess(key, fileList[key]["body"], drive).then(
      res => (fileUploaded[key] = res.data.id)
    );
  }
  require("fs").writeFile("fileID.json", JSON.stringify(fileUploaded), err =>
    console.log(err)
  );
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

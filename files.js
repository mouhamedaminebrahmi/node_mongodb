var crypto = require("crypto");
const Path = require("path");
const fs = require("fs");
let Files = [];

/**
 *
 * @param {string} inputFolder
 * @returns {Promise<{[relativePath: string]: string}>}
 */
function calculateFiles(inputFolder) {
  function getAllDirectory(inputFolder) {
    fs.readdirSync(inputFolder).forEach((File, idx) => {
      const path = Path.join(inputFolder, File);
      if (fs.statSync(path).isDirectory()) {
        return getAllDirectory(path);
      } else {
        return Files.push(path);
      }
    });
    return Files;
  }

  let myFiles = getAllDirectory(inputFolder);
  return (obj = myFiles.reduce((accumulator, value) => {
    let contents = fs.readFileSync(value, "utf-8");
    var split = value.split("/").slice(1).join("/");
    return { ...accumulator, [split]: crypto.createHash("md5").update(contents).digest("hex") };
  }, {}));
}

console.log(calculateFiles("./inputFolder"));

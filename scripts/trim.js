const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

const soundsDir = path.join(__dirname, "../sounds");
const trimmedDir = path.join(__dirname, "../trimmed");
const maxDuration = 10; // Maximum duration in seconds
const fadeDuration = 1; // Fade duration in seconds

if (!fs.existsSync(trimmedDir)) {
  fs.mkdirSync(trimmedDir);
}

fs.readdir(soundsDir, (err, files) => {
  if (err) {
    console.error("Error reading the sounds directory:", err);
    return;
  }

  files.forEach((file, index) => {
    const filePath = path.join(soundsDir, file);
    const typeMatch = file.match(
      /(wind|ocean|waves|birds|forest|rain|thunder)/i
    );
    const type = typeMatch ? typeMatch[0].toLowerCase() : "unknown";
    const outputFileName = `${type}${index + 1}.mp3`;
    const outputPath = path.join(trimmedDir, outputFileName);

    ffmpeg(filePath)
      .audioFilters([
        `afade=t=in:ss=0:d=${fadeDuration}`,
        `afade=t=out:st=${maxDuration - fadeDuration}:d=${fadeDuration}`,
      ])
      .setDuration(maxDuration)
      .output(outputPath)
      .on("end", () => {
        console.log("File trimmed and faded:", outputFileName);
      })
      .on("error", (err) => {
        console.error("Error processing file:", err);
      })
      .run();
  });
});

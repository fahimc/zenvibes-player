const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

const trimmedDir = path.join(__dirname, "../trimmed");
const outputDir = path.join(__dirname, "../public/sounds");
const totalTracks = 30;
const minTrackDuration = 240; // Minimum track duration in seconds (4 minutes)

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdir(trimmedDir, (err, files) => {
  if (err) {
    console.error("Error reading the trimmed directory:", err);
    return;
  }

  const soundFiles = files.map((file) => ({
    filePath: path.join(trimmedDir, file),
    type: path.basename(file).split(/[0-9]/)[0],
  }));

  let trackCount = 0;

  const createTrack = () => {
    if (trackCount >= totalTracks) return;

    let currentDuration = 0;
    let trackFiles = [];
    let usedTypes = {};
    let trackName = `track${trackCount + 1}`;

    const addSound = () => {
      const randomIndex = Math.floor(Math.random() * soundFiles.length);
      const { filePath, type } = soundFiles[randomIndex];

      if (!usedTypes[type]) {
        trackName += `_${type}`;
        usedTypes[type] = true;
      }

      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
          console.error("Error getting duration:", err);
          return;
        }

        const duration = metadata.format.duration;

        if (currentDuration + duration <= minTrackDuration) {
          currentDuration += duration;
          trackFiles.push(filePath);
          addSound(); // Recursively add another sound
        } else {
          const trackPath = path.join(outputDir, `${trackName}.mp3`);
          const command = ffmpeg();

          trackFiles.reduce(
            (result, inputItem) => result.addInput(inputItem),
            command
          );
          command
            .mergeToFile(trackPath)
            .audioCodec("libmp3lame")
            .on("end", () => {
              console.log("Track created:", trackPath);
              trackCount++;
              createTrack();
            })
            .on("error", (err) => {
              console.error("Error creating track:", err);
            });
        }
      });
    };

    addSound();
  };

  createTrack();
});

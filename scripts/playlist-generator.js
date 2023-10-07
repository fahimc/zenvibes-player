const fs = require("fs");
const path = require("path");
const uuidv4 = require("uuidv4");

const soundList = fs.readdirSync(path.resolve("public", "sounds"));

const albumCovers = [
  "images/natural sounds cover.png",
  "images/natural sounds cover 2.png",
  "images/natural sounds cover 3.png",
  "images/natural sounds cover 4.png",
  "images/natural sounds cover 5.png",
];

function getRandomAlbumCover() {
  const index = randomIntFromInterval(0, albumCovers.length - 1);
  return albumCovers[index];
}
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const playlist = [];
soundList.forEach((filePath, index) => {
  playlist.push({
    src: `sounds/${filePath}`,
    id: index + 1,
    title: "Natural Sounds Track " + (index + 1),
    artist: "ZenVibes",
    image: getRandomAlbumCover(),
    name: "Natural Sounds Track " + (index + 1),
    cover: getRandomAlbumCover(),
    audio: `sounds/${filePath}`,
    color: ["#205950", "#2ab3bf"],
    id: uuidv4.uuid(),
    active: false,
  });
});

console.log(playlist);
fs.writeFileSync(
  path.resolve("src", "sounds.json"),
  JSON.stringify(playlist, null, 2),
  "utf-8"
);

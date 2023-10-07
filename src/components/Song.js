import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";

function downloadURI(uri, name) {
  var link = document.createElement("a");
  // If you don't know the name or want to use
  // the webserver default set name = ''
  link.setAttribute("download", name);
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

const Song = ({ currentSong }) => {
  return (
    <SongContainer>
      <Img src={currentSong.cover} alt={currentSong.name}></Img>
      <H1>{currentSong.name} </H1>
      <H2>{currentSong.artist}</H2>{" "}
      <FontAwesomeIcon
        onClick={() => downloadURI(currentSong.src, currentSong.name + ".mp3")}
        className="skip-back"
        icon={faDownload}
        style={{
          cursor: "pointer",
          width: "20px",
          marginTop: "20px",
        }}
      />
    </SongContainer>
  );
};

const SongContainer = styled.div`
  margin-top: 10vh;
  min-height: 50vh;
  max-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 20%;
  border-radius: 50%;
  @media screen and (max-width: 768px) {
    width: 50%;
  }
`;

const H1 = styled.h2`
  padding: 3rem 1rem 1rem 1rem;
  color: white;
`;

const H2 = styled.h3`
  font-size: 1rem;
`;

export default Song;

import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <NavContainer>
      <img src="logo-title.png"></img>
      <Button onClick={() => setLibraryStatus(!libraryStatus)}>Library</Button>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  min-height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width: 768px) {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
  }
  img {
    max-width: 200px;
  }
`;

const H1 = styled.h1`
  transition: all 0.5s ease;
  @media screen and (max-width: 768px) {
    visibility: ${(p) => (p.libraryStatus ? "hidden" : "visible")};
    opacity: ${(p) => (p.libraryStatus ? "0" : "100")};
    transition: all 0.5s ease;
  }
`;

const Button = styled.button`
  background: #000000b3;
  border: none;
  color: white;
  cursor: pointer;
  border: 0px solid rgb(65, 65, 65);
  border-radius: 5px;
  padding: 10px 20px;
  transition: all 0.3s ease;
  &:hover {
    background: rgb(65, 65, 65);
    color: white;
  }
`;

export default Nav;

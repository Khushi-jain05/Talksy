import React from "react";
import Storycard from "../storycard/Storycard";
import { Users } from "../../data";
import "./stories.scss";

const Stories = () => {
  return (
    <div className="stories glass">
      <div className="storyCard">
        <div className="overlay"></div>
        <img src="/assets/person/pic.jpeg" alt="" className="storyProfile" />
        <img src="/assets/person/pic.jpeg" alt="" className="storybackground" />
        <img src="/assets/person/upload.png" alt="" className="storyadd" />
        <span className="text">Cris</span>
      </div>

      {Users.map((u) => (
        <Storycard key={u.id} user={u} />
      ))}
    </div>
  );
};

export default Stories;
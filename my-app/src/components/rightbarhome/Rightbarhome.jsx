import React from "react";
import Online from "../online/Online";
import { Usersonline } from "../../data";
import "./rightbarhome.scss";

const Rightbarhome = () => {
  return (
    <div className="rightbarhome ">
      <div className="birthdayContainer">
        <img
          src="/assets/ads/bday1.jpeg"
          alt=""
          className="birthdayImg"
        />
        <span className="birthdayText">
          <b>Sarah Dane</b> and <b>other friends</b> have a birthday today
        </span>
      </div>
      <img src="/assets/ads/adv.jpeg" alt="" className="rightbarAdvert" />

      <span className="rightbarTitle">Online Friends</span>

      <ul className="rightbarFriendList">
        {Usersonline.map((u) => (
          <Online key={u.id} onlineuser={u} />
        ))}
      </ul>
    </div>
  );
};

export default Rightbarhome;
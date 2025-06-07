import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./profile.scss";
import Feed from "./../../components/feed/Feed";
import Rightbar from "./../../components/rightbar/Rightbar";

const Profile = () => {
  return (
    <div className="profile">
      <Navbar />
      <div className="profileWrapper">
        <Sidebar />
        <div className="profileRight ">
          <div className="profileRightTop glass">
            <div className="profileCover  ">
             
              <img
                src="/assets/person/pic.jpeg"
                alt=""
                className="profileUserImg"
              />
             
            </div>
            <div className="profileInfo  ">
               <h4 className="profileInfoName">Amit jain</h4>
               <span className="profileInfoDesc">Hi Friends!</span>
              </div>
             
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
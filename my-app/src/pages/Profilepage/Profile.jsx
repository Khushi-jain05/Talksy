import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./profile.scss";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";


const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (!error) {
          setUserData(data);
        } else {
          console.error("Error fetching user profile:", error.message);
        }
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="profile">
      <Navbar />
      <div className="profileWrapper">
        <Sidebar />
        <div className="profileRight ">
          <div className="profileRightTop glass">
            <div className="profileCover  ">
             
            <img
  src={userData?.profile_picture || "/assets/person/pic.jpeg"}
  alt="profile"
  className="profileUserImg"
/>

             
            </div>
            <div className="profileInfo">
  <h4 className="profileInfoName">
    {userData?.name|| "Loading..."}
  </h4>
  <span className="profileInfoDesc">
    {userData?.bio || "Hi Friends!"}
  </span>
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
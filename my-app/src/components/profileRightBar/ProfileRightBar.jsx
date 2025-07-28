import React from "react";
import { Link } from "react-router-dom";
import "./profileRightBar.scss";
import { useLocation } from "react-router-dom";


const ProfileRightBar = () => {
  const location = useLocation();
  
  return (
    <div className="profileRightBar">
      <div className="profileRightBarHeading">
        <span className="profileRightBarTitle"> User Information</span>
        <Link to="/profile/userId/edit" style={{ textDecoration: "none" }}>
          <span className="editButton">Edit Profile</span>
        </Link>
      </div>

      <div className="profileRightBarInfo">
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Email: </span>
          <span className="profileRightBarInfoValue">CrisKapoor@gmail.com</span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Phone Number: </span>
          <span className="profileRightBarInfoValue">+91648376437</span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Address: </span>
          <span className="profileRightBarInfoValue">
           Shanti Nagar
          </span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Country: </span>
          <span className="profileRightBarInfoValue">India</span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Relationship: </span>
          <span className="profileRightBarInfoValue">Single</span>
        </div>
      </div>

      <h4 className="profileRightBarTitle">Close Friends</h4>
      <div className="profileRightBarFollowings">
        <div className="profileRightBarFollowing">
          <img
            src="/assets/person/pp1.jpeg"
            alt=""
            className="profileRightBarFollowingImg"
          />
          <span className="profileRightBarFollowingName">Janet</span>
        </div>
        <div className="profileRightBarFollowing">
          <img
            src="/assets/person/pp2.jpeg"
            alt=""
            className="profileRightBarFollowingImg"
          />
          <span className="profileRightBarFollowingName">Isabella</span>
        </div>
        <div className="profileRightBarFollowing">
          <img
            src="/assets/person/pp3.jpeg"
            alt=""
            className="profileRightBarFollowingImg"
          />
          <span className="profileRightBarFollowingName">Beverly</span>
        </div>
    <div className="profileRightBarFollowing">
      <img
        src="/assets/person/pp4.jpeg"
        alt=""
        className="profileRightBarFollowingImg"
      />
      <span className="profileRightBarFollowingName">Glenna</span>
    </div>
        <div className="profileRightBarFollowing">
          <img
            src="/assets/person/pp5.jpeg"
            alt=""
            className="profileRightBarFollowingImg"
          />
          <span className="profileRightBarFollowingName">Alexis</span>
        </div>
        <div className="profileRightBarFollowing">
          <img
            src="/assets/person/pp6.jpeg"
            alt=""
            className="profileRightBarFollowingImg"
          />
          <span className="profileRightBarFollowingName">Kate</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileRightBar;
// import React, { useEffect, useState } from "react";
// import { supabase } from "../../supabaseClient";
// import { Link, useLocation } from "react-router-dom";
// import "./profileRightBar.scss";

// const ProfileRightBar = () => {
//   const [userData, setUserData] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();

//       if (userError || !user) {
//         console.error("Auth user error:", userError);
//         return;
//       }

//       const { data, error } = await supabase
//         .from("users")
//         .select("*")
//         .eq("id", user.id)
//         .single();

//       if (error) {
//         console.error("Supabase fetch user error:", error);
//       } else {
//         setUserData(data);
//       }
//     };

//     fetchUser();
//   }, []);

//   // ✅ Show success alert if profile was updated
//   useEffect(() => {
//     if (location.state?.updated) {
//       alert("Profile info updated! ✅");
//     }
//   }, [location.state]);

//   if (!userData) return <p>Loading user info or failed to fetch. Check console.</p>;

//   return (
//     <div className="profileRightBar">
//       <div className="profileRightBarHeading">
//         <span className="profileRightBarTitle">User Information</span>
//         <Link to={`/profile/${userData.id}/edit`} style={{ textDecoration: "none" }}>
//           <span className="editButton">Edit Profile</span>
//         </Link>
//       </div>

//       <div className="profileRightBarInfo">
//         <div className="profileRightBarInfoItem">
//           <span className="profileRightBarInfoKey">Email:</span>
//           <span className="profileRightBarInfoValue">{userData.email}</span>
//         </div>
//         <div className="profileRightBarInfoItem">
//           <span className="profileRightBarInfoKey">Phone Number:</span>
//           <span className="profileRightBarInfoValue">{userData.phone}</span>
//         </div>
//         <div className="profileRightBarInfoItem">
//           <span className="profileRightBarInfoKey">Address:</span>
//           <span className="profileRightBarInfoValue">{userData.address}</span>
//         </div>
//         <div className="profileRightBarInfoItem">
//           <span className="profileRightBarInfoKey">Country:</span>
//           <span className="profileRightBarInfoValue">India</span>
//         </div>
//         <div className="profileRightBarInfoItem">
//           <span className="profileRightBarInfoKey">Relationship:</span>
//           <span className="profileRightBarInfoValue">Single</span>
//         </div>
//       </div>

//       <h4 className="profileRightBarTitle">Close Friends</h4>
//       <div className="profileRightBarFollowings">
        
//       </div>
//     </div>
//   );
// };

// export default ProfileRightBar;

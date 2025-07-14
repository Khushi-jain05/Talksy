// import { useEffect, useState } from "react";
// import { supabase } from "../../supabaseClient"
// import { DriveFolderUploadOutlined } from "@mui/icons-material";
// import React from "react";
// import Navbar from "../../components/navbar/Navbar";
// import Sidebar from "../../components/sidebar/Sidebar";
// import "./editProfile.scss";

// const EditProfile = () => {
//   const [userData, setUserData] = useState({
//     name: "",
//     username: "",
//     email: "",
//     phone: "",
//     address: "",
//   });
//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data, error } = await supabase
//         .from("users")
//         .select("*")
//         .eq("id", users.id) // Replace with auth user id
//         .single();

//       if (data) {
//         setUserData(data);
//       }
//     };

//     fetchUser();
//   }, []);

  
//   return (
//     <div className="editProfile ">
//       <Navbar />
//       <div className="editProfileWrapper">
//         <Sidebar />
//         <div className="profileRight glass">
//           <div className="profileRightTop">
//             <div className="profileCover">
//               <img
//                 src="/assets/profileCover/profilecover.jpg"
//                 alt=""
//                 className="profileCoverImg"
//               />
//               <img
//                 src="/assets/person/pic.jpeg"
//                 alt=""
//                 className="profileUserImg"
//               />
//             </div>
//             <div className="profileInfo">
//               <h4 className="profileInfoName">Amit Jain</h4>
//               <span className="profileInfoDesc">Hi Friends!</span>
//             </div>
//           </div>
//           <div className="editprofileRightBottom">
//             <div className="top">
//               <h1>Edit User Profile</h1>
//             </div>
//             <div className="bottom">
//               <div className="left">
//                 <img src="/assets/ads/default.jpeg" alt="" />
//               </div>
//               <div className="right">
//                 <form>
//                   <div className="formInput">
//                     <label htmlFor="file">
//                       Image: <DriveFolderUploadOutlined className="icon" />
//                     </label>
//                     <input type="file" id="file" style={{ display: "none" }} />
//                   </div>
//                   <div className="formInput">
//                     <label>Name</label>
//                     <input type="text" placeholder="Jane Doe"  />
//                   </div>
//                   <div className="formInput">
//                     <label>Username</label>
//                     <input type="text" placeholder="jane_doe" />
//                   </div>
//                   <div className="formInput">
//                     <label>Email</label>
//                     <input type="email" placeholder="jane_doe@gmail.com" />
//                   </div>
//                   <div className="formInput">
//                     <label>Phone</label>
//                     <input type="text" placeholder="+4 123 456 789" />
//                   </div>
//                   <div className="formInput">
//                     <label>Address</label>
//                     <input
//                       type="text"
//                       placeholder="Melwood str. 71 Liverpool"
//                     />
//                   </div>
//                   <div className="formInput">
//                     <label>Country</label>
//                     <input type="text" placeholder="United Kingdom" />
//                   </div>
//                   <button type="submit" className="updateButton">
//                     Update Profile
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./editProfile.scss";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  const [userId, setUserId] = useState(null); // to store logged-in user id

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User not found:", userError);
        return;
      }

      setUserId(user.id); // store user id for update

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setUserData({
          name: data.name || "",
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("users")
      .update(userData)
      .eq("id", userId);

    if (error) {
      console.error("Error updating profile:", error);
    } else {
      alert("Profile updated successfully ✅");
    }
  };

  return (
    <div className="editProfile">
      <Navbar />
      <div className="editProfileWrapper">
        <Sidebar />
        <div className="profileRight glass">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src="/assets/profileCover/profilecover.jpg"
                alt=""
                className="profileCoverImg"
              />
              <img
                src="/assets/person/pic.jpeg"
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{userData.name}</h4>
              <span className="profileInfoDesc">Hi Friends!</span>
            </div>
          </div>
          <div className="editprofileRightBottom">
            <div className="top">
              <h1>Edit User Profile</h1>
            </div>
            <div className="bottom">
              <div className="left">
                <img src="/assets/ads/default.jpeg" alt="" />
              </div>
              <div className="right">
                <form onSubmit={handleUpdate}>
                  <div className="formInput">
                    <label htmlFor="file">
                      Image: <DriveFolderUploadOutlined className="icon" />
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} />
                  </div>

                  <div className="formInput">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className="formInput">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                      placeholder="jane_doe"
                    />
                  </div>

                  <div className="formInput">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      placeholder="jane_doe@gmail.com"
                    />
                  </div>

                  <div className="formInput">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={userData.phone}
                      onChange={handleChange}
                      placeholder="+91 123 456 789"
                    />
                  </div>

                  <div className="formInput">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={userData.address}
                      onChange={handleChange}
                      placeholder="Melwood str. 71, Liverpool"
                    />
                  </div>

                  <div className="formInput">
                    <label>Country</label>
                    <input
                      type="text"
                      placeholder="India" // Optional static field
                      disabled
                    />
                  </div>

                  <button type="submit" className="updateButton">
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;



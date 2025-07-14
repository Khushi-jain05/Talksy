import React, { useState } from "react";

import "./register.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import registerImg from '../../register.jpeg';
import { supabase } from "../../supabaseClient";




const Register = () => {
  const [img, setImg] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  const displayName = e.target[0].value;
  const email = e.target[1].value;
  const password = e.target[2].value;

  try {
   
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;

    let user = signUpData.user;
    if (!user) {
  const sessionResponse = await supabase.auth.getSession();
  user = sessionResponse.data?.session?.user;
}

if (!user) throw new Error("User not returned. Is email confirmation still enabled?");


    let photoURL = null;

    
    if (img) {
      const fileExt = img.name.split('.').pop();
      const filePath = `usersImages/${displayName}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("posts")
        .upload(filePath, img);

      if (uploadError) throw uploadError;

      const { data: publicURLData } = supabase.storage
        .from("posts")
        .getPublicUrl(filePath);

      photoURL = publicURLData.publicUrl;
    }

    
    const { error: insertError } = await supabase.from("users").insert({
      uid: user.id,
      displayName,
      email,
      photoURL,
    });

    if (insertError) throw insertError;

   
    await supabase.from("usersPosts").insert({ uid: user.id, messages: [] });

    
    navigate("/");
  } catch (err) {
    console.error("❌ Registration failed:", err);
    setError(err.message || err.description || "Something went wrong");
  }
};
  
  return (
    <div className="register ">
    
      <div className="registerWrapper">
        <div className="registerLeft">
          <h1>Welcome!</h1>
          <h3 className="registerLogo">Talksy</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Talksy.
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <div className="top">
              <img
                src={
                  img
                    ? URL.createObjectURL(img)
                    : "/assets/person/pic.jpeg"
                }
                alt=""
                className="profileImg"
              />
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlined className="icon" />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    style={{ display: "none" }}
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            <div className="bottom">
              <form onSubmit={handleRegister} className="bottomBox">
                <input
                  type="text"
                  placeholder="Name"
                  id="displayName"
                  className="registerInput"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="registerInput"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="registerInput"
                  minLength={6}
                  required
                />
                <button type="submit" className="registerButton">
                  Sign Up
                </button>
                <Link to="/login">
                  <button className="loginRegisterButton">
                    Log into Account
                  </button>
                </Link>
                {error && <span style={{ color: "red", fontSize: "14px" }}>{error}</span>}
              </form>
              <div className="loginImageWrapper">
      <img src={registerImg} alt="register" className="registerImage" />
    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

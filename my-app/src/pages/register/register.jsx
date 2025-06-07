import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./register.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const supabase = createClient(
  "https://icvklrslgbchqtayrowh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljdmtscnNsZ2JjaHF0YXlyb3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyOTI5MzMsImV4cCI6MjA2NDg2ODkzM30.PR-3rz92Rk51ggyMwBdiBj9r3jgqpHUo1Y0TWPvqU9A"
);

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
      const {error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
    
      if (signUpError) throw signUpError;
    
      // Get the user again to ensure it's the latest authenticated one
      const { data: { user } } = await supabase.auth.getUser();
      let photoURL = null;
    
      if (img) {
        const fileExt = img.name.split('.').pop();
        const filePath = `usersImages/${displayName}.${fileExt}`;
    
        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, img);
    
        if (uploadError) throw uploadError;
    
        const { data: publicURLData } = supabase.storage
          .from("images")
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
    
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(true);
    }
    
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
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
                    : "/assets/profileCover/DefaultProfile.jpg"
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
                {error && <span>Something went wrong</span>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

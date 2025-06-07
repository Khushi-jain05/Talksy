import React, { useState } from "react";
import "./register.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/supabase";

const Register = () => {
  const [img, setImg] = useState(null);
  const [error, setError] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(false);

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      // Step 1: Sign up user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: displayName,
          },
        },
      });

      if (signUpError) throw signUpError;

      const userId = signUpData?.user?.id;

      let imageUrl = null;

      // Step 2: Upload image (if provided)
      if (img && userId) {
        const fileExt = img.name.split('.').pop();
        const filePath = `avatars/${userId}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, img, {
            upsert: true,
          });

        if (uploadError) throw uploadError;

        // Step 3: Get public URL of image
        const { data: imageData } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        imageUrl = imageData.publicUrl;

        // Step 4: Update user profile
        await supabase.auth.updateUser({
          data: {
            full_name: displayName,
            avatar_url: imageUrl,
          },
        });
      }

      console.log("User registered successfully!");
    } catch (err) {
      console.error("Registration error:", err);
      setError(true);
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Talksy</h3>
          <span className="registerDesc">
            Connect with friends and the world around you
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <div className="top">
              <img
                src={img ? URL.createObjectURL(img) : "/assets/profileCover/DefaultProfile.jpg"}
                alt="preview"
                className="profileImg"
              />
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlined className="icon" />
                  <input
                    type="file"
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
                  className="registerInput"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="registerInput"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="registerInput"
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
                {error && <span className="error">Something went wrong!</span>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import "./register.scss";
// import { DriveFolderUploadOutlined } from "@mui/icons-material";
// import { Link, useNavigate } from "react-router-dom";
// import registerImg from '../../register.jpeg';
// import { supabase } from "../../supabaseClient";

// const Register = () => {
//   const [img, setImg] = useState(null);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(false);

//     const displayName = e.target[0].value;
//     const email = e.target[1].value;
//     const password = e.target[2].value;

//     try {
//       const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
//         email,
//         password,
//       });

//       if (signUpError) throw signUpError;

//       let user = signUpData.user;

//       if (!user) {
//         const {
//           data: { session },
//           error: sessionError,
//         } = await supabase.auth.getSession();

//         if (sessionError || !session?.user) {
//           throw new Error("User session not available. Please verify email.");
//         }

//         user = session.user;
//       }

//       // Insert user info into "users" table
//       const { error: insertError } = await supabase.from("users").insert({
//         id: user.id,
//         name: displayName,
//         email,
//       });

//       if (insertError) throw insertError;

//       // Create an empty entry in "usersPosts"
//       await supabase.from("usersPosts").insert({ uid: user.id, messages: [] });

//       navigate("/");
//     } catch (err) {
//       console.error("❌ Registration failed:", err);
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="register">
//       <div className="registerWrapper">
//         <div className="registerLeft">
//           <h1>Welcome!</h1>
//           <h3 className="registerLogo">Talksy</h3>
//           <span className="registerDesc">
//             Connect with friends and the world around you on Talksy.
//           </span>
//         </div>
//         <div className="registerRight">
//           <div className="registerBox">
//             <div className="top">
//               <img
//                 src={
//                   img
//                     ? URL.createObjectURL(img)
//                     : "/assets/person/pic.jpeg"
//                 }
//                 alt=""
//                 className="profileImg"
//               />
//               <div className="formInput">
//                 <label htmlFor="file">
//                   Image: <DriveFolderUploadOutlined className="icon" />
//                   <input
//                     type="file"
//                     name="file"
//                     id="file"
//                     accept=".png,.jpeg,.jpg"
//                     style={{ display: "none" }}
//                     onChange={(e) => setImg(e.target.files[0])}
//                   />
//                 </label>
//               </div>
//             </div>
//             <div className="bottom">
//               <form onSubmit={handleRegister} className="bottomBox">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   id="displayName"
//                   className="registerInput"
//                   required
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   id="email"
//                   className="registerInput"
//                   required
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   id="password"
//                   className="registerInput"
//                   minLength={6}
//                   required
//                 />
//                 <button type="submit" className="registerButton" disabled={loading}>
//                   {loading ? "Registering..." : "Sign Up"}
//                 </button>
//                 <Link to="/login">
//                   <button className="loginRegisterButton">
//                     Log into Account
//                   </button>
//                 </Link>
//                 {error && <span style={{ color: "red", fontSize: "14px" }}>{error}</span>}
//               </form>
//               <div className="loginImageWrapper">
//                 <img src={registerImg} alt="register" className="registerImage" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import "./register.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "../../register.jpeg";
import { supabase } from "../../supabaseClient";

const Register = () => {
  const [img, setImg] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      // 1️⃣ Sign up the user
      const {  error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name: displayName } }, // optional metadata
      });
      if (signUpError) throw signUpError;

      // 2️⃣ Auto-login immediately after signup
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (loginError) throw loginError;

      const user = loginData.user;
      if (!user) throw new Error("Login failed, user not returned.");

      // 3️⃣ Insert user into "users" table (RLS-safe)
      const { error: insertError } = await supabase.from("users").insert({
        id: user.id,       // MUST match auth.uid() for RLS
        name: displayName,
        email,
      });
      if (insertError) throw insertError;

      // 4️⃣ Insert empty entry into "usersPosts"
      const { error: postsError } = await supabase.from("usersPosts").insert({
        uid: user.id,
        messages: [],
      });
      if (postsError) throw postsError;

      // 5️⃣ Redirect to home
      navigate("/home");
    } catch (err) {
      console.error("❌ Registration failed:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
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
                src={img ? URL.createObjectURL(img) : "/assets/person/pic.jpeg"}
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
                <button
                  type="submit"
                  className="registerButton"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Sign Up"}
                </button>

                <Link to="/login">
                  <button className="loginRegisterButton">
                    Log into Account
                  </button>
                </Link>

                {error && (
                  <span style={{ color: "red", fontSize: "14px" }}>{error}</span>
                )}
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

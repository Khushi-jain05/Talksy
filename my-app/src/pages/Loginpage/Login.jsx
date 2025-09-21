// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import loginImg from '../../login-img.jpeg'

// import { supabase } from "../../supabaseClient";

// import "./login.scss";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
  
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
  
//     if (error) {
//       setError(error.message);
//     } else {
      
//       const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
//       if (!session || sessionError) {
//         setError("Login succeeded but session not initialized.");
//       } else {
//         navigate("/home");
//       }
//     }
//   };

//   return (
//     <div className="login  ">
 
//       <div className="loginWrapper">
//         <div className="loginLeft">
//           <h1>Welcome Back!</h1>
//           <h3 className="loginLogo">Talksy</h3>
//           <span className="loginDesc">
//             Connect with friends and the world around you on Talksy.
//           </span>
//         </div>
//         <div className="loginRight ">
        
//           <div className="loginBox">
//             <form className="bottomBox" onSubmit={handleLogin}>
            
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="loginInput"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="loginInput"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button type="submit" className="loginButton">
//                 Sign In
//               </button>
//               {error && <span className="errorText">{error}</span>}
//               <Link to="/register">
//                 <button type="button" className="loginRegisterButton">
//                   Create a New Account
//                 </button>
//               </Link>
              
//             </form>
//             <div className="loginImageWrapper">
//       <img src={loginImg} alt="Login" className="loginImage" />
//     </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../login-img.jpeg";
import { supabase } from "../../supabaseClient";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Sign in the user
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      // 2️⃣ Check if session exists
      if (!data.session) {
        throw new Error("Login succeeded but session not initialized.");
      }

      // 3️⃣ Redirect to home page
      navigate("/home");
    } catch (err) {
      console.error("❌ Login failed:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h1>Welcome Back!</h1>
          <h3 className="loginLogo">Talksy</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Talksy.
          </span>
        </div>

        <div className="loginRight">
          <div className="loginBox">
            <form className="bottomBox" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                className="loginInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="loginInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="loginButton" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </button>

              {error && <span className="errorText">{error}</span>}

              <Link to="/register">
                <button type="button" className="loginRegisterButton">
                  Create a New Account
                </button>
              </Link>
            </form>

            <div className="loginImageWrapper">
              <img src={loginImg} alt="Login" className="loginImage" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


// import React from "react";
// import { Link } from "react-router-dom";
// import "./login.scss";

// const Login = () => {
//   return (
//     <div className="login">
//       <div className="loginWrapper">
//         <div className="loginLeft">
//           <h3 className="loginLogo">Talksy</h3>
//           <span className="loginDesc">
//             Connect with friends and the world around you on Talksy.
//           </span>
//         </div>
//         <div className="loginRight">
//           <div className="loginBox">
//             <div className="bottom">
//               <form className="bottomBox">
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   id="email"
//                   className="loginInput"
//                   required
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   id="password"
//                   className="loginInput"
//                   required
//                 />

//                 <button type="submit" className="loginButton">
//                   Sign In
//                 </button>
//                 <Link to="/register">
//                   <button className="loginRegisterButton">
//                     Create a New Account
//                   </button>
//                 </Link>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabase";

import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const {error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/"); 
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
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
              <button type="submit" className="loginButton">
                Sign In
              </button>
              {error && <span className="errorText">{error}</span>}
              <Link to="/register">
                <button type="button" className="loginRegisterButton">
                  Create a New Account
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

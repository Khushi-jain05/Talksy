// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Homepage/Home"
// import Login from "./pages/Loginpage/Login"
// import Register from "./pages/Registerpage/Register";
// import EditProfile from "./pages/editProfile/EditProfile";
// import Profile from "./pages/Profilepage/Profile";
// import "./style/dark.scss";
// import { useContext } from "react";
// import { DarkModeContext } from "./context/darkModeContext";
// import "./App.css";
// import "./index.css";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   const { darkMode } = useContext(DarkModeContext);

//   return (
//     <div className={darkMode ? "app dark" : "app"}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Navigate to="/home" />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

          
//           <Route
//             path="/home"
//             element={
//               <ProtectedRoute>
//                 <Home />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/profile/:userId"
//             element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/profile/:userId/edit"
//             element={
//               <ProtectedRoute>
//                 <EditProfile />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Homepage/Home";
import Login from "./pages/Loginpage/Login";
import Register from "./pages/Registerpage/Register";
import EditProfile from "./pages/editProfile/EditProfile";
import Profile from "./pages/Profilepage/Profile";
  
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import "./App.css";
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:userId/edit"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          {/* ✅ Chat route added */}
          


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Homepage/Home";
// import Login from "./pages/Loginpage/Login";
// import Register from "./pages/Registerpage/Register";
// import EditProfile from "./pages/editProfile/EditProfile";
// import Profile from "./pages/Profilepage/Profile";
// import ChatPage from "./pages/ChatPage"; // ✅ Import the new Chat page

// import "./style/dark.scss";
// import { useContext } from "react";
// import { DarkModeContext } from "./context/darkModeContext";
// import "./App.css";
// import "./index.css";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   const { darkMode } = useContext(DarkModeContext);

//   return (
//     <div className={darkMode ? "app dark" : "app"}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Navigate to="/home" />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           <Route
//             path="/home"
//             element={
//               <ProtectedRoute>
//                 <Home />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/profile/:userId"
//             element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/profile/:userId/edit"
//             element={
//               <ProtectedRoute>
//                 <EditProfile />
//               </ProtectedRoute>
//             }
//           />

//           {/* ✅ Chat route added */}
//           <Route
//             path="/chat"
//             element={
//               <ProtectedRoute>
//                 <ChatPage />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

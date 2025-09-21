import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import "./navbar.scss";
import logo from "../../Talksy-1.svg";
// import ProfilePic from "../../assets/pic.jpeg";



const Navbar = () => {
  return (
    <nav className="glass">
    <div className="navbarContainer">
        <div className="navbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
          <img src={logo} alt="Talksy Logo" style={{ height: "400px",marginTop:"1vw" }} />
            
          </Link>
        </div>
        <div className="navbarCenter">
          <div className="searchBar">
            <SearchIcon className="searchIcon" />
            <input
              type="text"
              placeholder="Search for friends post or video"
              className="searchInput"
            />
          </div>
        </div>
        <div className="navbarRight">
          
      <div className="navbarIcons">
        <Link to="/profile/userId" style={{ color: "inherit" }}>
        <div className="navbarIconItem">
          <PersonIcon />
          
        </div></Link>
        <Link to="/chat" style={{ color: "inherit" }}>
        <div className="navbarIconItem">
          <ChatBubbleIcon />
          <span className="navbarIconBadge">10</span>
        </div></Link>
        {/* <div className="navbarIconItem">
          <NotificationsIcon />
          <span className="navbarIconBadge">8</span>
        </div> */}
      </div>
  <Link to="/profile/userId">
    <img src="/assets/person/pic.jpeg" alt="" className="navbarImg" />
  </Link>
        </div>
      </div>
      </nav>
  );
};

export default Navbar;
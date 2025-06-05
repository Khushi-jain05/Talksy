import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import "./navbar.scss";
import logo from "../../Talksy-1.svg";



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
        <div className="navbarIconItem">
          <PersonIcon />
          <span className="navbarIconBadge">2</span>
        </div>
        <div className="navbarIconItem">
          <ChatBubbleIcon />
          <span className="navbarIconBadge">10</span>
        </div>
        <div className="navbarIconItem">
          <NotificationsIcon />
          <span className="navbarIconBadge">8</span>
        </div>
      </div>
  <Link to="/profile/userId">
    <img src="/assets/person/user.jpg" alt="" className="navbarImg" />
  </Link>
        </div>
      </div>
      </nav>
  );
};

export default Navbar;
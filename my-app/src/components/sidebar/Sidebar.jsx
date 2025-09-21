
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import GroupsIcon from "@mui/icons-material/Groups";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

import "./sidebar.scss";
import MenuLink from "../menuLink/MenuLink";
import Friends from "../friends/Friends";
import { Users } from "../../data";
import { DarkModeContext } from "../../context/darkModeContext";
import { supabase } from "../../supabaseClient";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="sidebar glass">
      <div className="sidebarWrapper">
        <MenuLink Icon={RssFeedIcon} text="Feed" onClick={() => navigate("/home")} />

        {/* ✅ Fixed Chats button */}
        <MenuLink
  Icon={ChatIcon}
  text="Chats"
  onClick={() => navigate("/chat")}
/>


        <MenuLink Icon={GroupsIcon} text="Friends" onClick={() => navigate("/friends")} />
        {/* <MenuLink Icon={BookmarkIcon} text="Bookmarks" onClick={() => navigate("/bookmarks")} /> */}

        <div onClick={() => dispatch({ type: "TOGGLE" })}>
          <MenuLink Icon={Brightness4Icon} text="Theme" />
        </div>

        <MenuLink
          Icon={ExitToAppOutlinedIcon}
          text="Logout"
          onClick={handleLogout}
        />

        <hr className="sidebarHr" />

        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <Friends key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

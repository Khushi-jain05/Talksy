// import React from "react";
// import "./menuLink.scss";

// const MenuLink = ({ Icon, text }) => {
//   return (
//     <div className="menuLink">
//       <Icon/>
//       <span className="menuLinkText">{text}</span>
//       <span className="menuLinkTextName">{text === "Logout" && "(Cris)"}</span>
//     </div>
//   );
// };

// export default MenuLink;
import React from "react";
import { Link } from "react-router-dom";
import "./menuLink.scss";

const MenuLink = ({ Icon, text, to, onClick }) => {
  const Wrapper = to ? Link : "div";
  const props = to ? { to } : { onClick };

  return (
    <Wrapper
      {...props}
      style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
    >
      <div className="menuLink">
        <Icon />
        <span className="menuLinkText">{text}</span>
        {text === "Logout" && (
          <span className="menuLinkTextName">(Cris)</span>
        )}
      </div>
    </Wrapper>
  );
};

export default MenuLink;

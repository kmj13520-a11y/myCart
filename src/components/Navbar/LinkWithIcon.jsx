import { NavLink } from "react-router-dom";
import "./LinkWithIcon.css";

export default function LinkWithIcon({ link, title, emoji }) {
  return (
    <NavLink to={link} className="align_center">
      {title} <img src={emoji} alt="" className="link_emoji" />
    </NavLink>
  );
}

import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import logo from "../Images/logo-t.png";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { useDispatch } from "react-redux";
import { logout } from "../Features/UserSlice";
import { FaHome, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { PiUserListDuotone } from "react-icons/pi";
import { IoMdLogOut } from "react-icons/io";
import "../App.css";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogout = async () => {
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/Login");
  };
  return (
    <>
      <Navbar className="header">
        <Nav>
          <NavItem className="nav">
            <img src={logo} className="logo" />
          </NavItem>
          <NavItem>
            <Link to="/">
              <FaHome id="homeLink" />
              Home
            </Link>
          </NavItem>

          <NavItem>
            <Link to="/profile">
              <CgProfile />
              Profile
            </Link>
          </NavItem>

          <NavItem>
            <Link onClick={handlelogout}>
              <IoMdLogOut />
              Logout
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;

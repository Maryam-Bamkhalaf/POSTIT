import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

const Logout = () => {
  const email = useSelector((state) => state.users.user.email);
  const navigate = useNavigate();
  useEffect(() => {
    if (!email) {
      navigate("/Login");
    }
  }, [email]);
  return <h1>Logout</h1>;
};

export default Logout;

import user from "../Images/user.png";
import { useSelector } from "react-redux";

const User = () => {
  const user = useSelector((state) => state.users.user);
  const picURL = "http://localhost:3001/uploads/" + user.profilePic;
  console.log(picURL);

  return (
    <div>
      <img src={picURL} className="userImage" />

      <p>
        <b>{user.name}</b>
        <br />
        {user.email}
      </p>
    </div>
  );
};

export default User;

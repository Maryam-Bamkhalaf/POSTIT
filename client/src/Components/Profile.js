import User from "./User";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { BrowserRouter as Router,useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateUserProfile } from "../Features/UserSlice";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaValidation } from "../Validations/UserValidations";

const Protfile = () => {
  const user = useSelector((state) => state.users.user);

  const [userName, setUserName] = useState(user.name);
  const [pwd, setPwd] = useState(user.password);
  const [confirmPassword, setConfirmPassword] = useState(user.password);
  const [profilePic, setProfilePic] = useState(user.profilePic);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit, // Submit the form when this is called
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), //Associate your Yup validation schema using the resolver
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    // Prepare the user data object with the current user's email and updated details
    const userData = {
      // Retrieve email from the Redux store
      email: user.email,
      name: userName, // Get the updated name from the state variable
      password: pwd, // Get the updated password from the state variable
      profilePic: profilePic,
    };

    console.log(userData);
    // Dispatch the updateUserProfile action to update the user profile in the Redux store
    dispatch(updateUserProfile(userData));
    alert("Profile Updated.");
    // Navigate back to the profile page after the update is completed
    navigate("/profile");
  };
  const handleFileChange = (event) => {
    // Use e.target.files[0] to get the file itself
    const uploadFile = event.target.files[0];
    if (!uploadFile) alert("No file uploaded");
    else setProfilePic(event.target.files[0]);
  };
  useEffect(() => {
    if (!user.email) {
      navigate("/login");
    }
  }, [user.email, navigate]);
  return (
    <Container fluid className="profile-container">
      <Row className="profile-row">
        {/* User Section */}
        <Col md={3} className="user-section">
          <User />
        </Col>
  
        {/* Form Section */}
        <Col md={4} className="form-section">
          <Form onSubmit={handleUpdate} className="profile-form">
            <h5 className="form-title">Upload Photo</h5>
            <input 
              type="file" 
              name="profilePic" 
              className="file-input" 
              onChange={handleFileChange} 
            />
            <FormGroup>
              <Label for="name" className="form-label">Name</Label>
              <Input
                id="name"
                name="name"
                className="form-input"
                placeholder="Name..."
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className="form-label">Password</Label>
              <Input
                id="password"
                name="password"
                className="form-input"
                placeholder="Password..."
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword" className="form-label">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                placeholder="Confirm Password..."
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Button 
                color="primary" 
                className="submit-button" 
                type="submit"
              >
                Update Profile
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Protfile;

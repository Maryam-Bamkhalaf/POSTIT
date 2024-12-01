import {
  Container,
  Col,
  Row,
  Form,
  Input,
  Button,
  FormGroup,
  Table,
  Label,
} from "reactstrap";
import { userSchemaValidation } from "../Validations/UserValidations";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addUser, deleteUser, udpateUser } from "../Features/UserSlice";
import { Link } from "react-router-dom";
import { registerUser } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";
const Register = () => {
  const userList = useSelector((state) => state.users.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  // ` is tick
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });
  //function of the button:

  const onSubmit = (data) => {
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      console.log("Form Data", data);
      alert("All Validation good");
      dispatch(registerUser(userData));
      navigate("/login");
    } catch (error) {
      console.log("Error");
    }
  };
  const handleDelete = (email) => {
    dispatch(deleteUser(email));
  };

  return (
    <div>
      <Container fluid>
        <br />
        <br />
        <Row>
          <Col md={6} className="center">
            <img src={logo} className="center" />
          </Col>
        </Row>
        <h1 className="h">Register</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="name">Name</Label>
            <input
              id="name"
              className="form-control"
              name="name"
              placeholder="Enter your name..."
              type="text"
              {...register("name", {
                onChange: (e) => setname(e.target.value),
              })}
            ></input>
            <p className="error">{errors.name?.message}</p>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <input
              id="exampleEmail"
              className="form-control"
              name="email"
              placeholder="Enter your email..."
              type="email"
              {...register("email", {
                onChange: (e) => setemail(e.target.value),
              })}
            ></input>
            <p className="error">{errors.email?.message}</p>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <input
              id="examplePassword"
              className="form-control"
              name="Password"
              placeholder="Enter your Password..."
              type="password"
              {...register("password", {
                onChange: (e) => setpassword(e.target.value),
              })}
            ></input>
            <p className="error">{errors.password?.message}</p>
          </FormGroup>
          <FormGroup>
            <Label for="ConforimPassword">Conforim Password</Label>
            <input
              id="examplePassword"
              className="form-control"
              name="ConforimPassword"
              placeholder="Confirm your Password..."
              type="password"
              {...register("confirmPassword", {
                onChange: (e) => setconfirmPassword(e.target.value),
              })}
            ></input>
            <p className="error">{errors.confirmPassword?.message}</p>
          </FormGroup>
          <Button>Register</Button>
        </Form>
        <Row></Row>
      </Container>
    </div>
  );
};

export default Register;

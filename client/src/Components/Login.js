import { Container, Col, Row, Form, Input, Button } from "reactstrap";
import logo from "../Images/logo-t.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../Features/UserSlice";
import Home from "./Home";
const Login = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);

  const handleLogin = () => {
    try {
      const userData = {
        //if them are in same name
        email: email,
        password: password,
      };
      dispatch(login(userData));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isError) {
      navigate("/Login");
    }

    if (isSuccess) {
      navigate("/");
    } else {
      navigate("/Login");
    }
  }, [user, isError, isSuccess]);
  return (
    <div>
      <Container>
        <Form>
          <Row>
            <Col md={3} className="center">
              <img src={logo} className="logo" />
            </Col>
          </Row>
          <Row>
            <Col md={3} className="center">
              Email
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Enter email"
                type="email"
                onChange={(e) => setemail(e.target.value)}
              ></Input>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="center">
              Password
              <Input
                id="examplePassword"
                name="Password"
                placeholder="Enter Password"
                type="password"
                onChange={(e) => setpassword(e.target.value)}
              ></Input>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="center">
              <Button onClick={() => handleLogin()}>Login</Button>
              <br />
              <p className="smalltext">
                No Account?<Link to="/Register">Register now.</Link>
              </p>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Login;

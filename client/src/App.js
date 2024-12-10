import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import Logout from "./Components/Logout";
import "bootstrap/dist/css/bootstrap.min.css";
import Manage from "./Components/Manage";
import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import "./App.css";
const App = () => {
  const email = useSelector((state) => state.users.user.email);

  return (
    <Container fluid>
      <Router>
        <Row>
          {email ? (
            <>
              <Header />
            </>
          ) : null}
        </Row>
        <Row className="main">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/Logout" element={<Logout />}></Route>
            <Route path="/manage" element={<Manage />}></Route>
          </Routes>
        </Row>
        <Row>
          {email ? (
            <>
              <Footer />
            </>
          ) : null}
        </Row>
      </Router>
    </Container>
  );
};

export default App;

import { Container, Row, Col } from "reactstrap";
import User from "./User";
import SharePost from "./SharePost";
import Posts from "./Posts";
import Header from "./Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useS } from "react";
import Location from "./Locaton";
//useffect function that will exeute when then the page loads
//short code for useEffect is uef
const Home = () => {
  const email = useSelector((state) => state.users.user.email);
  const navigate = useNavigate();
  useEffect(() => {
    if (!email) {
      navigate("/Login");
    }
  }, [email]);
  return (
    <>
      <Row>
        {/* User Section */}
        <Col md={3} className="user-section">
          <User />
        </Col>

        {/* Share Post Section */}
        <Col md={9} className="share-post-section">
          <SharePost />
        </Col>
      </Row>
      <Row>
        <Col md={1} className="posts-row">
          <Location />
        </Col>
      </Row>
      <Row className="posts-row">
        <Col md={10} className="posts-section">
          <Posts />
        </Col>
      </Row>
    </>
  );
};

export default Home;

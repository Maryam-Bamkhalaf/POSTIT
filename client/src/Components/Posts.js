import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { getPosts } from "../Features/PostSlice";

import { Table, Label } from "reactstrap";
import moment from "moment";
import { likePost } from "../Features/PostSlice";
import { FaThumbsUp } from "react-icons/fa";
const Posts = () => {
  const [postId, setpostId] = useState();
  const [userId, setuserId] = useState();

  const handleLikePost = (postId) => {
    const postData = {
      postId: postId,
      userId: userId,
    };

    dispatch(likePost(postData));

    navigate("/");
  };
  const posts = useSelector((state) => state.posts.posts);

  const email = useSelector((state) => state.users.user.email);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div>
      <Table className="table-striped">
        <thead></thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              {/* Ensure to add a unique key for each row */}

              <td>{post.email}</td>

              <td>
                <p> {moment(post.createdAt).fromNow()}</p>

                {post.postMsg}

                <p className="likes">
                  <a href="#" onClick={() => handleLikePost(post._id)}>
                    <FaThumbsUp />
                  </a>
                  ({post.likes.count})
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div> /* End of posts */
  );
};

export default Posts;

import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setPosts({ posts: Array.isArray(data) ? data : [] }));
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      dispatch(setPosts({ posts: [] })); // Set to empty array on error
    }
  }, [dispatch, token]);

  const getUserPosts = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setPosts({ posts: Array.isArray(data) ? data : [] }));
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
      dispatch(setPosts({ posts: [] })); // Set to empty array on error
    }
  }, [dispatch, token, userId]);

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [getPosts, getUserPosts, isProfile]);

  return (
    <>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )
      ) : (
        <p>No posts available</p> // Tampilkan pesan jika tidak ada posts
      )}
    </>
  );
};

export default PostsWidget;

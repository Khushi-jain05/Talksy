import React from "react";
import { Posts } from "../../data";
import Post from "../post/Post";
import Share from "../share/Share";
import Stories from "../stories/Stories";
import "./feed.scss";

const Feed = () => {
  return (
    <div className="feed glass1">
      <div className="feedWrapper">
    <Stories />
    <Share />
    {Posts.map((p) => (
      <Post key={p.id} post={p} />
    ))}
  </div>
    </div>
  );
};

export default Feed;
// import React, { useEffect, useState } from "react";
// import { supabase } from "../../supabaseClient";
// import Post from "../post/Post";
// import Share from "../share/Share";
// import "./feed.scss";

// const Feed = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     const { data, error } = await supabase
//       .from("posts")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.error("Error fetching posts:", error);
//     } else {
//       setPosts(data);
//     }
//   };

//   return (
//     <div className="feed glass1">
//       <div className="feedWrapper">
//         <Share />
//         {posts.map((p) => (
//           <Post key={p.id} post={p} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Feed;

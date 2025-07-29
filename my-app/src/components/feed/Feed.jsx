// import React from "react";
// import { Posts } from "../../data";
// import Post from "../post/Post";
// import Share from "../share/Share";
// import Stories from "../stories/Stories";
// import "./feed.scss";

// const Feed = () => {
//   return (
//     <div className="feed glass1">
//       <div className="feedWrapper">
//     <Stories />
//     <Share />
//     {Posts.map((p) => (
//       <Post key={p.id} post={p} />
//     ))}
//   </div>
//     </div>
//   );
// };

// export default Feed;
import React, { useEffect, useState } from "react";
import { Posts } from "../../data";
import Post from "../post/Post";
import Share from "../share/Share";
import Stories from "../stories/Stories";
import "./feed.scss";

const supabase = {
  from: (tableName) => ({
    select: () =>
      new Promise((resolve) => {
        console.log(`📡 Fetching data from Supabase table: "${tableName}"...`);
        setTimeout(() => {
          if (tableName === "postss") {
            resolve({ data: Posts, error: null });
          } else {
            resolve({ data: null, error: new Error("Table not found") });
          }
        }, 1000);
      }),
  }),
};

const Feed = () => {
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from("postss").select("*");

      if (error) {
        console.error("❌ Error fetching posts from Supabase:", error.message);
        setError(error.message);
      } else {
        console.log("✅ Successfully fetched posts from Supabase.");
        setFetchedPosts(data);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="feed glass1">
      <div className="feedWrapper">
        <Stories />
        <Share />

        {loading && <p>⏳ Loading posts from Supabase...</p>}
        {error && <p>⚠️ {error}</p>}

        {!loading &&
          !error &&
          fetchedPosts.map((p) => <Post key={p.id} post={p} />)}
      </div>
    </div>
  );
};

export default Feed;

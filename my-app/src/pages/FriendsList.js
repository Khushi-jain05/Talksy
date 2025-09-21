import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { AuthContext } from "../context/AuthContext";

const FriendList = ({ onSelectFriend }) => {
  const { currentUser } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchFriends = async () => {
      try {
        const { data, error } = await supabase
          .from("friends")
          .select("friend_id, users(name, profile_pic)")
          .eq("user_id", currentUser.id)
          .eq("status", "accepted")
          .innerJoin("users", "users.id", "friends.friend_id");

        if (error) throw error;
        setFriends(data || []);
      } catch (err) {
        console.error("Error fetching friends:", err.message);
      }
    };

    fetchFriends();
  }, [currentUser]);

  if (!currentUser) return <p>Loading friends...</p>;

  return (
    <div style={{ padding: "10px" }}>
      <h3>Friends</h3>
      {friends.map((f) => (
        <div
          key={f.friend_id}
          onClick={() => onSelectFriend(f)}
          style={{ cursor: "pointer", margin: "10px 0", display: "flex", alignItems: "center" }}
        >
          <img
            src={f.users.profile_pic || "https://via.placeholder.com/40"}
            alt={f.users.name}
            width="40"
            style={{ borderRadius: "50%", marginRight: "10px" }}
          />
          {f.users.name}
        </div>
      ))}
    </div>
  );
};

export default FriendList;

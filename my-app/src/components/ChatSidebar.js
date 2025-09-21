import { useState } from "react";
import ChatBox from "../pages/ChatBox";
import FriendList from "./FriendList";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ChatSidebar = () => {
  const { currentUser } = useContext(AuthContext);
  const [selectedFriend, setSelectedFriend] = useState(null);

  if (!currentUser) return <p>Loading user...</p>;

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {/* Friends List */}
      <div style={{ width: "250px", borderRight: "1px solid gray" }}>
        <FriendList onSelectFriend={setSelectedFriend} />
      </div>

      {/* Chat Box */}
      <div style={{ flex: 1 }}>
        {selectedFriend ? (
          <ChatBox friend={selectedFriend} currentUser={currentUser} />
        ) : (
          <p style={{ padding: "20px" }}>Select a friend to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;



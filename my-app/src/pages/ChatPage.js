import ChatSidebar from "../components/ChatSidebar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ChatPage = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <p>Loading user...</p>;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar with Friends */}
      <ChatSidebar />

      {/* ChatBox will open inside ChatSidebar when friend is selected */}
    </div>
  );
};

export default ChatPage;

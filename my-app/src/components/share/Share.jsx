import {
    Close,
    EmojiEmotions,
    PermMedia,
    VideoCameraFront,
    ShareOutlined,
  } from "@mui/icons-material";
  import React, { useState } from "react";
  import "./share.scss";
  
import EmojiPicker from "emoji-picker-react";
  
 
// import { AuthContext } from "../../context/AuthContext";
  
  const Share = () => {
    // const {currentUser} = useContext(AuthContext);
  const [input, setInput] = useState("");
  // const [postContent, setPostContent] = useState("");

    const [file, setFile] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
   const addEmoji = (emojiData) => {
  setInput((prev) => prev + emojiData.emoji);
};

  
    const removeImage = () => {
      setFile(null);
    };
    
    return (
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              src="/assets/person/pic.jpeg"
              alt=""
              className="shareProfileImg"
            />
            <textarea
              type="text"
              
              style={{overflow: "hidden",resize: "none"}}
              placeholder="What's on your mind Cris ?"
              className="shareInput"
              value={input}
//             
            onChange={(e) => setInput(e.target.value)}
            
            />
        
          </div>
          <hr className="shareHr" />
          {file && (
            <div className="shareImgContainer">
              <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
              <Close className="shareCancelImg" onClick={removeImage} />
            </div>
          )}
          <div className="shareBottom">
            <div className="shareOptions">
              <div className="shareOption">
                <VideoCameraFront
                  className="shareIcon"
                  style={{ color: "#bb0000f2" }}
                />
                <span className="shareOptionText">Live Video</span>
              </div>
              <label htmlFor="file" className="shareOption">
                <PermMedia className="shareIcon" style={{ color: "#2e0196f1" }} />
                <span className="shareOptionText">Photo/Video</span>
                <input
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <div  onClick={()=>setShowEmojis(!showEmojis)} className="shareOption">
                <EmojiEmotions
                  className="shareIcon"
                  style={{ color: "#bfc600ec" }}
                />
                <span className="shareOptionText">Feelings/Activity</span>
              </div>
              <div className="shareOption">
              <ShareOutlined className="shareIcon" />
              <span className="shareOptionText">Share</span>
              </div>
            </div>
          </div>
          {showEmojis && (
          <div className="emoji">
            <EmojiPicker onEmojiClick={addEmoji} />

          </div>
        )}
        </div>
      </div>
    );
  };
  
  export default Share;
// import {
//   Close,
//   EmojiEmotions,
//   PermMedia,
//   ShareOutlined,
// } from "@mui/icons-material";
// import React, { useState } from "react";
// import "./share.scss";
// import EmojiPicker from "emoji-picker-react";
// import { supabase } from "../../supabaseClient";
// import { useAuth } from "../../hooks/useAuth"; // ✅ For current user

// const Share = () => {
//   const { user } = useAuth();
//   const [input, setInput] = useState("");
//   const [file, setFile] = useState(null);
//   const [showEmojis, setShowEmojis] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const addEmoji = (emojiData) => {
//     setInput((prev) => prev + emojiData.emoji);
//   };

//   const removeImage = () => {
//     setFile(null);
//   };

//   const handleShare = async () => {
//     if (!input && !file) return alert("Write something or upload a photo");
//     setLoading(true);

//     let imageUrl = null;

//     try {
//       // ✅ Upload image to Supabase Storage
//       if (file) {
//         const fileExt = file.name.split(".").pop();
//         const fileName = `${Date.now()}.${fileExt}`;
//         const { error: uploadError } = await supabase.storage
//           .from("posts")
//           .upload(fileName, file);

//         if (uploadError) throw uploadError;

//         const { data: publicURLData } = supabase.storage
//           .from("posts")
//           .getPublicUrl(fileName);

//         imageUrl = publicURLData.publicUrl;
//       }

//       // ✅ Insert post in DB
//       const { error: insertError } = await supabase.from("posts").insert([
//         {
//           content: input,
//           image_url: imageUrl,
//           user_id: user?.id, // ✅ Automatically from auth
//           created_at: new Date(),
//         },
//       ]);

//       if (insertError) throw insertError;

//       // ✅ Reset state
//       setInput("");
//       setFile(null);
//       setShowEmojis(false);
//       alert("✅ Post Shared!");
//     } catch (error) {
//       console.error("Error sharing post:", error.message);
//       alert("❌ Failed to share post.");
//     }

//     setLoading(false);
//   };
  
  

//   return (
//     <div className="share">
//       <div className="shareWrapper">
//         <div className="shareTop">
//           <img
//             src="/assets/person/pic.jpeg"
//             alt=""
//             className="shareProfileImg"
//           />
//           <textarea
//             placeholder="What's on your mind?"
//             className="shareInput"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//         </div>

//         {file && (
//           <div className="shareImgContainer">
//             <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
//             <Close className="shareCancelImg" onClick={removeImage} />
//           </div>
//         )}

//         <div className="shareBottom">
//           <div className="shareOptions">
//             <label htmlFor="file" className="shareOption">
//               <PermMedia className="shareIcon" style={{ color: "#2e0196f1" }} />
//               <span className="shareOptionText">Photo/Video</span>
//               <input
//                 type="file"
//                 id="file"
//                 accept=".png,.jpeg,.jpg"
//                 style={{ display: "none" }}
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//             </label>
//             <div onClick={() => setShowEmojis(!showEmojis)} className="shareOption">
//               <EmojiEmotions className="shareIcon" style={{ color: "#bfc600ec" }} />
//               <span className="shareOptionText">Emojis</span>
//             </div>
//             <div onClick={handleShare} className="shareOption">
//               <ShareOutlined className="shareIcon" />
//               <span className="shareOptionText">{loading ? "Sharing..." : "Share"}</span>
//             </div>
//           </div>
//         </div>

//         {showEmojis && (
//           <div className="emoji">
//             <EmojiPicker onEmojiClick={addEmoji} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Share;

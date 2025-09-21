// import {
//     Close,
//     EmojiEmotions,
//     PermMedia,
//     VideoCameraFront,
//     ShareOutlined,
//   } from "@mui/icons-material";
//   import React, { useState } from "react";
//   import "./share.scss";
  
// import EmojiPicker from "emoji-picker-react";
  
 
// // import { AuthContext } from "../../context/AuthContext";
  
//   const Share = () => {
//     // const {currentUser} = useContext(AuthContext);
//   const [input, setInput] = useState("");
//   // const [postContent, setPostContent] = useState("");

//     const [file, setFile] = useState(null);
//     const [showEmojis, setShowEmojis] = useState(false);
//    const addEmoji = (emojiData) => {
//   setInput((prev) => prev + emojiData.emoji);
// };

  
//     const removeImage = () => {
//       setFile(null);
//     };
    
//     return (
//       <div className="share">
//         <div className="shareWrapper">
//           <div className="shareTop">
//             <img
//               src="/assets/person/pic.jpeg"
//               alt=""
//               className="shareProfileImg"
//             />
//             <textarea
//               type="text"
              
//               style={{overflow: "hidden",resize: "none"}}
//               placeholder="What's on your mind Cris ?"
//               className="shareInput"
//               value={input}
// //             
//             onChange={(e) => setInput(e.target.value)}
            
//             />
        
//           </div>
//           <hr className="shareHr" />
//           {file && (
//             <div className="shareImgContainer">
//               <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
//               <Close className="shareCancelImg" onClick={removeImage} />
//             </div>
//           )}
//           <div className="shareBottom">
//             <div className="shareOptions">
//               <div className="shareOption">
//                 <VideoCameraFront
//                   className="shareIcon"
//                   style={{ color: "#bb0000f2" }}
//                 />
//                 <span className="shareOptionText">Live Video</span>
//               </div>
//               <label htmlFor="file" className="shareOption">
//                 <PermMedia className="shareIcon" style={{ color: "#2e0196f1" }} />
//                 <span className="shareOptionText">Photo/Video</span>
//                 <input
//                   type="file"
//                   id="file"
//                   accept=".png,.jpeg,.jpg"
//                   style={{ display: "none" }}
//                   onChange={(e) => setFile(e.target.files[0])}
//                 />
//               </label>
//               <div  onClick={()=>setShowEmojis(!showEmojis)} className="shareOption">
//                 <EmojiEmotions
//                   className="shareIcon"
//                   style={{ color: "#bfc600ec" }}
//                 />
//                 <span className="shareOptionText">Feelings/Activity</span>
//               </div>
//               <div className="shareOption">
//               <ShareOutlined className="shareIcon" />
//               <span className="shareOptionText">Share</span>
//               </div>
//             </div>
//           </div>
//           {showEmojis && (
//           <div className="emoji">
//             <EmojiPicker onEmojiClick={addEmoji} />

//           </div>
//         )}
//         </div>
//       </div>
//     );
//   };
  
//   export default Share;
import {
  Close,
  EmojiEmotions,
  PermMedia,
  VideoCameraFront,
  ShareOutlined,
} from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import "./share.scss";
import EmojiPicker from "emoji-picker-react";
import { supabase } from "../../supabaseClient";

const Share = () => {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // get current user (robust)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await supabase.auth.getUser();
        // res shape: { data: { user }, error }
        const user = res?.data?.user ?? res?.user ?? null;
        setCurrentUser(user);
        console.log("Auth user:", user);
      } catch (err) {
        console.error("getUser failed:", err);
      }
    };
    fetchUser();
  }, []);

  const addEmoji = (emojiData) => {
    setInput((p) => p + emojiData.emoji);
  };

  const removeImage = () => setFile(null);

  const handleShare = async () => {
    setLoading(true);
    try {
      if (!file && !input.trim()) {
        alert("Please write something or select an image!");
        setLoading(false);
        return;
      }

      
      const { data: listData, error: listError } = await supabase.storage
        .from("posts")
        .list("", { limit: 1 });
      console.log("Bucket list check:", { listData, listError });
      if (listError) {
        console.error("Bucket access error:", listError);
        alert("Cannot access storage bucket 'posts'. Check bucket name/policies.");
        setLoading(false);
        return;
      }

      
      let imageUrl = null;
      if (file) {
        
        const ext = file.name.split(".").pop();
        const fileName = `${Date.now()}.${ext}`;
        const filePath = `${fileName}`; 

        console.log("Uploading file to path:", filePath);
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("posts")
          .upload(filePath, file, { cacheControl: "3600", upsert: false });

        console.log("Upload result:", { uploadData, uploadError });
        if (uploadError) {
          
          console.error("Upload failed:", uploadError);
          alert("Upload failed: " + (uploadError.message || JSON.stringify(uploadError)));
          setLoading(false);
          return;
        }

        
        const pathUsed = uploadData?.path ?? filePath;
        const { data: urlData, error: urlError } = supabase.storage
          .from("posts")
          .getPublicUrl(pathUsed);

        console.log("getPublicUrl:", { urlData, urlError });
        if (urlError) {
          console.error("getPublicUrl error:", urlError);
          alert("Failed to get public URL");
          setLoading(false);
          return;
        }

        imageUrl = urlData?.publicUrl ?? null;
        console.log("Public image URL:", imageUrl);
      }

     
      const { data: checkPosts, error: checkError } = await supabase
        .from("posts")
        .select("id")
        .limit(1);
      console.log("posts table check:", { checkPosts, checkError });
      if (checkError) {
        console.error("Error accessing 'posts' table:", checkError);
        alert("Cannot access 'posts' table. Create it in SQL editor.");
        setLoading(false);
        return;
      }

      
      const { data: insertData, error: insertError } = await supabase
        .from("posts")
        .insert([
          {
            
            content: input,
            image_url: imageUrl,
          },
        ]);
      console.log("Insert result:", { insertData, insertError });

      if (insertError) {
        console.error("Insert failed:", insertError);
        alert("Failed to save post: " + (insertError.message || JSON.stringify(insertError)));
        setLoading(false);
        return;
      }

      // success
      setInput("");
      setFile(null);
      alert("Post shared successfully!");
    } catch (err) {
      console.error("Unexpected error in handleShare:", err);
      alert("Unexpected error occurred - check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src="/assets/person/pic.jpeg" alt="" className="shareProfileImg" />
          <textarea
            placeholder={`What's on your mind ${currentUser?.email || "User"}?`}
            className="shareInput"
            value={input}
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
              <VideoCameraFront className="shareIcon" style={{ color: "#bb0000f2" }} />
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

            <div onClick={() => setShowEmojis(!showEmojis)} className="shareOption">
              <EmojiEmotions className="shareIcon" style={{ color: "#bfc600ec" }} />
              <span className="shareOptionText">Feelings/Activity</span>
            </div>

            <div
              className="shareOption"
              onClick={handleShare}
              style={{ opacity: loading ? 0.6 : 1, pointerEvents: loading ? "none" : "auto" }}
            >
              <ShareOutlined className="shareIcon" />
              <span className="shareOptionText">{loading ? "Sharing..." : "Share"}</span>
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

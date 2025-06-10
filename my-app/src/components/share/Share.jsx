import {
    Close,
    EmojiEmotions,
    PermMedia,
    VideoCameraFront,
  } from "@mui/icons-material";
  import React, { useState } from "react";
  import "./share.scss";
// import { AuthContext } from "../../context/AuthContext";
  
  const Share = () => {
    // const {currentUser} = useContext(AuthContext);
    const [file, setFile] = useState(null);
  
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
              <div className="shareOption">
                <EmojiEmotions
                  className="shareIcon"
                  style={{ color: "#bfc600ec" }}
                />
                <span className="shareOptionText">Feelings/Activity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Share;
// import {
//   Close,
//   EmojiEmotions,
//   PermMedia,
//   VideoCameraFront,
// } from "@mui/icons-material";
// import { v4 as uuid } from "uuid";
// import React, { useContext, useState } from "react";
// import "./share.scss";
// import { AuthContext } from "../../context/AuthContext";

// import { supabase } from "../../supabase/supabase";
// import EmojiPicker from "@emoji-mart/react";

// const Share = () => {
//   const [ setError] = useState(false);
//   const { currentUser } = useContext(AuthContext);
//   const [input, setInput] = useState("");
//   const [showEmojis, setShowEmojis] = useState(false);
//   const [img, setImg] = useState(null);

//   const handlePost = async () => {
//     try {
//       let imageURL = null;

//       if (img) {
//         const fileName = `Posts/${uuid()}`;
//         const {error: uploadError} = await supabase.storage
//           .from("posts")
//           .upload(fileName, img);

//         if (uploadError) throw uploadError;

//         const { data: urlData } = await supabase
//           .storage
//           .from("posts")
//           .getPublicUrl(fileName);

//         imageURL = urlData?.publicUrl;
//       }

      
//       const { error: insertError } = await supabase.from("posts").insert([
//         {
//           uid: currentUser.id,
//           display_name: currentUser.user_metadata?.full_name || "Anonymous",
//           avatar_url: currentUser.user_metadata?.avatar_url,
//           input: input,
//           img: imageURL,
//         },
//       ]);

//       if (insertError) throw insertError;

      
//       await supabase
//         .from("users_posts")
//         .update({
//           messages: supabase.fn.array_append("messages", {
//             id: uuid(),
//             uid: currentUser.id,
//             display_name: currentUser.user_metadata?.full_name || "Anonymous",
//             avatar_url: currentUser.user_metadata?.avatar_url,
//             input: input,
//             img: imageURL,
//           }),
//         })
//         .eq("uid", currentUser.id);

//       setInput("");
//       setImg(null);
//       setShowEmojis(false);
//     } catch (err) {
//       console.error("Error posting:", err);
//       setError(true);
//     }
//   };

//   const handleKey = (e) => {
//     if (e.code === "Enter") handlePost();
//   };

//   const addEmoji = (e) => {
//     let sym = e.unified.split("-");
//     let codesArray = sym.map((el) => "0x" + el);
//     let emoji = String.fromCodePoint(...codesArray);
//     setInput((prev) => prev + emoji);
//   };

//   const removeImage = () => {
//     setImg(null);
//   };

//   return (
//     <div className="share">
//       <div className="shareWrapper">
//         <div className="shareTop">
//           <img
//             src={
//               currentUser?.user_metadata?.avatar_url ||
//               "https://via.placeholder.com/40"
//             }
//             alt=""
//             className="shareProfileImg"
//           />
//           <textarea
//             type="text"
//             rows={2}
//             style={{ resize: "none", overflow: "hidden" }}
//             placeholder={
//               "What's on your mind " +
//               (currentUser?.user_metadata?.full_name || "") +
//               "?"
//             }
//             value={input}
//             className="shareInput"
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKey}
//           />
//         </div>
//         <hr className="shareHr" />
//         {img && (
//           <div className="shareImgContainer">
//             <img src={URL.createObjectURL(img)} alt="" className="shareImg" />
//             <Close className="shareCancelImg" onClick={removeImage} />
//           </div>
//         )}
//         <div className="shareBottom">
//           <div className="shareOptions">
//             <div className="shareOption">
//               <VideoCameraFront
//                 className="shareIcon"
//                 style={{ color: "#bb0000f2" }}
//               />
//               <span className="shareOptionText">Live Video</span>
//             </div>
//             <label htmlFor="file" className="shareOption">
//               <PermMedia
//                 className="shareIcon"
//                 style={{ color: "#2e0196f1" }}
//               />
//               <span className="shareOptionText">Photo/Video</span>
//               <input
//                 type="file"
//                 id="file"
//                 accept=".png,.jpeg,.jpg"
//                 style={{ display: "none" }}
//                 onChange={(e) => setImg(e.target.files[0])}
//               />
//             </label>
//             <div
//               onClick={() => setShowEmojis(!showEmojis)}
//               className="shareOption"
//             >
//               <EmojiEmotions
//                 className="shareIcon"
//                 style={{ color: "#bfc600ec" }}
//               />
//               <span className="shareOptionText">Feelings/Activity</span>
//             </div>
//           </div>
//         </div>
//         {showEmojis && (
//           <div className="emoji">
//             <EmojiPicker onEmojiSelect={addEmoji} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Share;

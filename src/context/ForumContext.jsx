import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
    
        const res = await axios.get("/public/services.json");
        setTimeout(() => {
          setPosts(res.data);
          setLoading(false);
        }, 1500); 
      } catch (err) {
        console.error("Error fetching posts:", err);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const addPost = (newPost) => {
    setPosts((prev) => [
      { ...newPost, id: prev.length + 1, date: new Date().toISOString().split("T")[0] },
      ...prev,
    ]);
  };

  return (
    <ForumContext.Provider value={{ posts, loading, addPost }}>
      {children}
    </ForumContext.Provider>
  );
};

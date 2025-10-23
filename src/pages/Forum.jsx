import React, { useContext, useState, useEffect } from "react";
import { ForumContext } from "../context/ForumContext";

export default function Forum() {
  const { posts, loading, addPost } = useContext(ForumContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [search, posts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Both title and description are required.");
      return;
    }
    addPost({
      title,
      description,
      author: "Guest User",
      date: new Date().toLocaleDateString(),
    });
    setTitle("");
    setDescription("");
    setError("");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-green-600 font-semibold">
        Loading Forum Posts...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        🌿 AgriConnect Forum
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-green-200 shadow-md rounded-xl p-6 mb-8"
        aria-labelledby="create-post-heading"
      >
        <h2
          id="create-post-heading"
          className="text-xl font-semibold text-green-700 mb-4"
        >
          Create New Post
        </h2>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Post Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-green-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter post title"
            aria-required="true"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full border border-green-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Write the description here..."
            aria-required="true"
          ></textarea>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-3" role="alert">
            ⚠️ {error}
          </p>
        )}

        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Post
        </button>
      </form>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-green-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Search forum posts"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white border border-green-200 shadow-md rounded-xl p-5 hover:shadow-lg transition"
              tabIndex="0"
              aria-label={`Forum post: ${post.title}`}
            >
              <h2 className="text-lg font-semibold text-green-700 mb-2 line-clamp-1">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-3">
                {post.description}
              </p>
            </article>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-8">
            No forum posts match your search.
          </p>
        )}
      </div>
    </div>
  );
}

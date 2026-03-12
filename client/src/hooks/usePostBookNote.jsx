import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const usePostBookNote = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const postBookNote = async (payload) => {
    try {
      setLoading(true);
      setSuccess(false);
      setError("");

      const postResponse = await fetch(`${API_URL}/api/books/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const postData = await postResponse.json();
      if (!postResponse.ok) {
        throw new Error(postData.message || "Failed to post note");
      }

      setSuccess(true);
      console.log("Note submitted:", payload);
      return postData;
    } catch (error) {
      setError(error.message);
      console.error("Error posting note:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return { postBookNote, loading, success, error };
};

export default usePostBookNote;

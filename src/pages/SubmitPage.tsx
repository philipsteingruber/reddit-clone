import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { FaImage } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import "../styles/SubmitPage.css";

const SubmitPage = () => {
  const { subredditName } = useParams();
  const navigate = useNavigate();
  const subreddit = useQuery(api.subreddit.get, { name: subredditName || "" });

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createPost = useMutation(api.post.create);

  if (subreddit === undefined) return <p>Loading...</p>;

  if (subreddit === null) {
    return (
      <div className="content-container">
        <div className="not-found">
          <h1>Subreddit not found</h1>
          <p>The subreddit r/{subredditName} doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !subreddit) {
      alert("Please enter a title and select a subreddit");
    }

    try {
      setIsSubmitting(true);
      await createPost({
        subject: title.trim(),
        body: body.trim(),
        subreddit: subreddit._id,
      });
      navigate(`/r/${subreddit.name}`);
    } catch (error) {
      console.log(error);
      alert("Failed to create post. Please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="content-container">
      <div className="submit-container">
        <h1>Create a post in r/{subredditName}</h1>
        <form className="submit-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="submit-title"
            maxLength={100}
          />
          <textarea
            placeholder="Text (optional)"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="submit-body"
          />
          <div className="submit-actions">
            <button
              type="button"
              onClick={() => navigate(`/r/${subredditName}`)}
              className="back-button"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting || !title.trim()}
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitPage;

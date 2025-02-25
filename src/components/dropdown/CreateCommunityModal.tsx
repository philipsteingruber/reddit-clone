import { useMutation } from "convex/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../convex/_generated/api";
import "../../styles/CreateCommunityModal.css";

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCommunityModal = ({
  isOpen,
  onClose,
}: CreateCommunityModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const createSubreddit = useMutation(api.subreddit.create);

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name) {
      setError("Community name is required.");
      return;
    }
    if (name.length < 3 || name.length > 21) {
      setError("Community name must be between 3 and 21 characters.");
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      setError(
        "Community name can only contain letters, numbers and underscores."
      );
      return;
    }

    setIsLoading(true);
    await createSubreddit({ name, description })
      .then((result) => {
        console.log(result);
        onClose();
        navigate(`/r/${name}`);
      })
      .catch((err) => {
        setError(`Failed to create community. ${err.data.message}`);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="create-community-modal-overlay" onClick={onClose} />
      <div className="modal-container">
        <div className="modal-header">
          <h2>Create a Community</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <div className="input-prefix">r/</div>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Community Name"
              onChange={(e) => setName(e.target.value)}
              maxLength={21}
              disabled={isLoading}
            />
            <p className="input-help">
              Community names including capitalization cannot be changed
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="description">
              Description <span>(optional)</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your community"
              maxLength={100}
              disabled={isLoading}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="modal-folder">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="create-button"
              disabled={isLoading}
            >
              {isLoading ? "Creating community..." : "Create Community"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCommunityModal;

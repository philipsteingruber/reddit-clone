import { useQuery } from "convex/react";
import { useParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import "../styles/SubredditPage.css";

const SubredditPage = () => {
  const { subredditName } = useParams();
  const subreddit = useQuery(api.subreddit.get, { name: subredditName || "" });

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

  return (
    <div className="content-container">
      <div className="subreddit-banner">
        <h1>r/{subreddit.name}</h1>
        {subreddit.description && <p>{subreddit.description}</p>}
      </div>
      <div className="posts-container">
        <div className="no-posts">
          <p>No posts yet.</p>
        </div>
        {/* Display posts */}
      </div>
    </div>
  );
};

export default SubredditPage;

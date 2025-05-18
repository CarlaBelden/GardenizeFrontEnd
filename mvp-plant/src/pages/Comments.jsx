import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import NewCommentButton from './NewComment';

function Comments() {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reloadTrigger, setReloadTrigger] = useState(0);
    const { project_id } = useParams();



  useEffect(() => {
    const fetchComments = async () => {
      try {
        const projectURL = `http://localhost:8000/api/projects/${project_id}/comments/`
        const response = await fetch(projectURL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setComments(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        console.error("Error fetching Comments", error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [reloadTrigger, project_id]); // Dependency array to re-run the effect when new project added

  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="comments-backmat">
      <h1 className="comments-backmat-heading">Thoughts and Ideas:</h1>
      {comments ? (

      <ul className="projectlists-container">
{comments.map((comment) => (
    <div className ="projectlists-backmat" key={comment.comment_id}>

{/* <DeleteButton setReloadTrigger={setReloadTrigger} project_id={project.project_id} /> */}
            <h4 style={{ textTransform: 'capitalize' }} className="project-list-item">{comment.posted_date}</h4>
            <p>{comment.comment}</p>




    </div>
))}
</ul>
    ) : (
      <div>Loading Comments...</div>
    )}

<NewCommentButton setReloadTrigger={setReloadTrigger} project_id={project_id} />
    </div>
  );
}

export default Comments;

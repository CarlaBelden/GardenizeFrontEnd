import React, { useState, useEffect } from 'react';
import Modal from "../components/Modal"
import { createNewComment } from "./api";

function NewCommentButton({setReloadTrigger, project_id}) {
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);


    const handleClick = () =>{
        setShowForm(!showForm);
      };

      async function submitForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const comment = formData.get("comment");
        if (!comment || typeof comment !== "string" ) {
            setError("Invalid Comment");
            return;
        }
        const newComment = await createNewComment({
          project_id,
          comment,
        });
        if (newComment instanceof Error) {
            setError("Couldn't add the comment try again later");
            return;
        }
        setShowForm(!showForm);
        setReloadTrigger(prev => prev + 1);
    }

  return (
 <>
<button type="button" onClick={handleClick}>Add New Idea</button>
{showForm && (
  <Modal onClose={() => setShowForm(!showForm)}>
        <form className="project-plant-create-form" onSubmit={submitForm}>
          {/* Form elements go here */}
          <label htmlFor="comment">Ideas:</label>
              <input className="form-spaceneeded" type="text" name="comment" placeholder="Look for bright plants for outdoor Collection" required={true} />


          <button type="submit" >Submit</button>

        </form>
        </Modal>
      )}
 </>
  );
}

export default NewCommentButton;

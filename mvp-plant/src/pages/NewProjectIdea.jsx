import React, { useState, useEffect } from 'react';
import Modal from "../components/Modal"
import { createNewProject } from "./api";

function NewProjectButton({setReloadTrigger}) {
    const [showForm, setShowForm] = useState(false);


    const handleClick = () =>{
        setShowForm(!showForm);
      };

      async function submitForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const project_name = formData.get("project_name");
        if (!project_name || typeof project_name !== "string") {
            setError("Invalid Project Name");
            return;
        }
        const summary = formData.get("summary");
        if (!summary || typeof summary !== "string" ) {
            setError("Invalid Summary");
            return;
        }
        const newProject = await createNewProject({
          project_name,
          summary,
        });
        if (newProject instanceof Error) {
            setError("Couldn't add the project try again later");
            return;
        }
        setShowForm(!showForm);
        setReloadTrigger(prev => prev + 1);
    }

  return (
 <>
<button type="button" onClick={handleClick}>New Project Idea</button>
{showForm && (
  <Modal onClose={() => setShowForm(!showForm)}>
        <form className="project-plant-create-form" onSubmit={submitForm}>
          {/* Form elements go here */}
          <label htmlFor="project_name">Project Name:</label>
              <input className="form-spaceneeded" type="text" name="project_name" placeholder="Indoor Collection" required={true} />

          <label htmlFor="summary"> Describe the Project: </label>
            <textarea className="form-textarea" type="text"  name="summary" placeholder="Curated assortment of potted plants, including herbs, fruits, and vegetables, grown within a home or office for aesthetic or practical purposes. " required={true} />

          <button type="submit" >Submit</button>

        </form>
        </Modal>
      )}
 </>
  );
}

export default NewProjectButton;

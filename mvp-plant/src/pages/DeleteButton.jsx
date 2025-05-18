import React, { useState, useEffect } from 'react';

function DeleteButton({setReloadTrigger, project_id}) {
  const handleDelete = async (project_id) => {
    console.log(project_id)
    try {
      const response = await fetch(`http://localhost:8000/api/projects/${project_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      alert(data.detail); //confirmation message from backend
      setReloadTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error occurred while deleting the project', error);
    }

  };

  return (
 <>
         <button onClick={(e) => {
              e.stopPropagation();
              handleDelete(project_id);
            }} className="project-list-delete-button">Delete</button>
 </>
  );
}

export default DeleteButton;

import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router";
import "./Projects.css"
import Modal from "../components/Modal"
import { createNewProject } from "./api";

const Projects = () => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
            async function fetchProjects() {
                try {
                    const projectURL = `http://localhost:8000/api/projects/`
                    const response = await fetch(projectURL);
                    if(!response.ok){
                        throw new Error(`${response.status}`)
                    }
                    const data = await response.json();
                    // Fetching project list
                    const projectData = data;

                    setProjects(projectData);
                    setLoading(false)
                }
                catch (error) {
                    setError(error);
                    console.error("Error fetching PlantData:", error);
                } }
            fetchProjects()
        }, [reloadTrigger]); // Dependency array to re-run the effect when new project added

        if (error) {
            return <div>Something went wrong, try again..</div>;
        }
        if (loading) {
            return <div>Loading Projects ...</div>;
        }
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
    <div className="projectslistpage-backmat">
      <h1 className="projectslistpage-backmat-heading">Projects List</h1>
      {projects ? (

      <ul className="projectlists-container">
{projects.map((project) => (
    <div key={project.project_id} onClick={() => navigate(`/projects/${project.project_id}`)}>
        <div className ="projectlists-backmat">
        {/* {plant.default_image?(<img src={plant.default_image} alt={plant.common_name} />):(<p>No Image to display</p>)} */}

            <h4>{project.project_name}</h4>
        </div>
    </div>
))}
</ul>
    ) : (
      <div>Loading Plant Details...</div>
    )}



<button type="button" onClick={handleClick}>New Project Idea</button>
{showForm && (
  <Modal onClose={() => setShowForm(!showForm)}>
        <form className="project-plant-create-form" onSubmit={submitForm}>
          {/* Form elements go here */}
          <label>
            Project Name:

            <input className="form-spaceneeded" type="text" name="project_name" placeholder="Indoor Collection" required={true} />
          </label>
          <label >
            Describe the Project:
            <textarea className="form-textarea" type="text"  name="summary" placeholder="Curated assortment of potted plants, including herbs, fruits, and vegetables, grown within a home or office for aesthetic or practical purposes. " required={true} />
          </label>
          <button type="submit" >Submit</button>

        </form>
        </Modal>
      )}

    </div>
  );
};



export default Projects;

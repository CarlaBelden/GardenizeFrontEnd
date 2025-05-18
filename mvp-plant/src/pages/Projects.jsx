import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router";
import "./Projects.css"
import NewProjectButton from "./NewProjectIdea";
import DeleteButton from "./DeleteButton";


const Projects = () => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
            async function fetchProjects() {
                try {
                    const projectURL = `http://localhost:8000/api/projects`
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


        //took out the function to create new project and put it in the api.js file



  return (
    <div className="projectslistpage-backmat">
      <h1 className="projectslistpage-backmat-heading">Projects List</h1>
      {projects ? (

      <ul className="projectlists-container">
{projects.map((project) => (
    <div className ="projectlists-backmat" key={project.project_id} onClick={() => navigate(`/projects/${project.project_id}`)}>

        {/* {plant.default_image?(<img src={plant.default_image} alt={plant.common_name} />):(<p>No Image to display</p>)} */}
<DeleteButton setReloadTrigger={setReloadTrigger} project_id={project.project_id} />
            <h4 style={{ textTransform: 'capitalize' }} className="project-list-item">{project.project_name}</h4>


    </div>
))}
</ul>
    ) : (
      <div>Loading Plant Details...</div>
    )}



<NewProjectButton setReloadTrigger={setReloadTrigger} />

    </div>
  );
};



export default Projects;

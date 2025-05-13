import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router";
import "./Projects.css"

const Projects = () => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
        }, []); // Dependency array to re-run the effect

        if (error) {
            return <div>Something went wrong, try again..</div>;
        }
        if (loading) {
            return <div>Loading Projects ...</div>;
        }


  return (
    <div className="projectslistpage-backmat">
      <h1 className="projectslistpage-backmat-heading">Projects List</h1>
      {projects ? (

      <ul className="card-grid">
{projects.map((project) => (
    <div key={project.project_id} onClick={() => navigate(`/projects/${project.project_id}`)}>
        <div className ="">
        {/* {plant.default_image?(<img src={plant.default_image} alt={plant.common_name} />):(<p>No Image to display</p>)} */}

            <h4>{project.project_name}</h4>
        </div>
    </div>
))}
</ul>
    ) : (
      <div>Loading Plant Details...</div>
    )}

    </div>
  );
};

export default Projects;

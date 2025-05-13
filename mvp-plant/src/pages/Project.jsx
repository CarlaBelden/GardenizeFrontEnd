import React,{useContext,useState, useEffect} from "react";
import { useNavigate,useParams } from "react-router";
import "./Project.css";
import Modal from "../components/Modal"

const Project = () => {
  const [projectPlants, setProjectPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [project, setProject] = useState("");
  const [selectedPlant, setSelectedPlant] = useState(null);
  const navigate = useNavigate();
  const { project_id } = useParams();

   useEffect(() => {
              async function fetchProject() {
                  try {
                      const projectURL = `http://localhost:8000/api/projects/${project_id}`
                      const response = await fetch(projectURL);
                      if(!response.ok){
                          throw new Error(`${response.status}`)
                      }
                      const data = await response.json();
                      // Fetching project plants
                      const projectData = data;

                      setProjectPlants(projectData.plants);
                      setProject(projectData.project);
                      setLoading(false)
                  }
                  catch (error) {
                      setError(error);
                      console.error("Error fetching PlantData:", error);
                  } }
              fetchProject()
          }, []); // Dependency array to re-run the effect

          if (error) {
              return <div>Something went wrong, try again..</div>;
          }
          if (loading) {
              return <div>Loading Plants for your Project ...</div>;
          }

  return (
    <div className="project-plant-backmat">
      <h1 className="project-plant-backmat-heading">{project.project_name}</h1>
      {project.summary}

        {projectPlants ? (

<ul className="project-plant-container">
{projectPlants.map((project) => (
<div className ="card" key={project.plant_id} onClick={() => setSelectedPlant(project)}>
  {project.default_image?(<img src={project.default_image} alt={project.common_name} />):(<p>No Image to display</p>)}
      <h4>{project.common_name}</h4>
</div>
))}
</ul>
) : (
<div>Loading Plant Details...</div>
)}


{selectedPlant && ( // If a plant is selected, show the modal
          <Modal onClose={() => setSelectedPlant(null)}>
            <h2>{selectedPlant.common_name}</h2>
            <img src={selectedPlant.default_image} alt={selectedPlant.common_name} />
            <p>Watering: {selectedPlant.watering}</p>
            <p>Sunlight: {selectedPlant.sunlight}</p>
            <p>Hardiness Zone: {selectedPlant.hardiness_min} - {selectedPlant.hardiness_max}</p>
            <p>Flowers: {selectedPlant.flowers ? "Yes" : "No"}</p>
            <p>Flowering Season: {selectedPlant.flowering_season}</p>
            <p>Indoor Plant: {selectedPlant.indoor ? "Yes" : "No"}</p>

          </Modal>
        )}


</div>





    // </div>
  );
};

export default Project;

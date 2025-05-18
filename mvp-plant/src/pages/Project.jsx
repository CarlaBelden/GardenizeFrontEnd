import React,{useContext,useState, useEffect} from "react";
import { useNavigate,useParams } from "react-router";
import "./Project.css";
import Modal from "../components/Modal"
import Comments from "./Comments";
import NewCommentButton from "./NewComment";

const Project = () => {
  const [projectPlants, setProjectPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [project, setProject] = useState("");
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);
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
          }, [reloadTrigger]); // Dependency array to re-run the effect

          if (error) {
              return <div>Something went wrong, try again..</div>;
          }
          if (loading) {
              return <div>Loading Plants for your Project ...</div>;
          }

          const handleDelete = async (project_id,plant_id) => {
            try {
              const response = await fetch(`http://localhost:8000/api/projects/${project_id}/${plant_id}`, {
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
    <div className="project-plant-backmat">
      <h1 className="project-plant-backmat-heading" style={{ textTransform: 'capitalize' }}>{project.project_name}</h1>
      <p>{project.summary}</p>

{/* show again when comments are ready  */}
      {/* <button onClick={() => navigate(`/projects/${project.project_id}/comments`)}className="project-list-comment-button">Add new thought or idea</button> */}
{/* <NewCommentButton setReloadTrigger={setReloadTrigger} project_id={project_id} /> */}

<div className="project-plant-comment-container">
        {projectPlants ? (

<ul className="project-plant-container">
{projectPlants.map((plant) => (
<div className ="card" key={plant.plant_id} onClick={() => setSelectedPlant(plant)}>
  {plant.default_image?(<img src={plant.default_image} alt={plant.common_name} /> ):(<p>No Image to display</p>)}
      <h4>{plant.common_name}</h4>
      <button onClick={(e) => {
              e.stopPropagation();
              handleDelete(project.project_id,plant.plant_id);
            }} className="project-list-delete-button">Delete</button>
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


<Comments reloadTrigger={reloadTrigger} project_id={project_id}/>


</div>
</div>






  );
};

export default Project;

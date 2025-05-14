import React,{useState,useEffect} from "react";
import { useNavigate,useParams } from "react-router";
import "./PlantDetail.css";
import DropDown from "./DropDown";

const PlantDetail = () => {
  const [plant, setPlant] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { plant_id } = useParams();

  useEffect(() => {
          async function fetchPlant() {
              try {
                  const plantURL = `http://localhost:8000/api/plants/${plant_id}`
                  const response = await fetch(plantURL);
                  if(!response.ok){
                      throw new Error(`${response.status}`)
                  }
                  const data = await response.json();
                  // Fetching plant data
                  const plantData = data;

                  setPlant(plantData);
                  setLoading(false)
              }
              catch (error) {
                  setError(error);
                  console.error("Error fetching PlantData:", error);
              } }
          fetchPlant()
      }, [plant_id]); // Dependency array to re-run the effect when offset changes







      const handleClick = async () => {

        console.log(selectedProjectId)
        console.log(plant_id)
        if (!selectedProjectId) {
          alert("Please select a project first.");
          return;
        }

        try {
          const payload = {
            project_id: selectedProjectId,
            plant_id: plant_id
          };

          const response = await fetch('http://localhost:8000/api/project-plants/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });

          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }

          const result = await response.json();
          alert("Plant added to project successfully!");
          console.log(result);
        } catch (error) {
          console.error("Error submitting plant to project:", error);
          alert("Failed to add plant to project.");
        }
      };









      if (error) {
          return <div>Something went wrong, try again..</div>;
      }
      if (loading) {
          return <div>Loading Plant Details...</div>;
      }



  return (
    <>
    {plant ? (
      <div className="plantlistpage-backmat">

        <h1 className="plantlistpage-backmat-heading">{plant.common_name}</h1>
        <div className="plantlistpage-backmat-heading white-mat-container">
            <div className="large_detail_card">
                <img
                  src={plant.default_image}
                  alt={plant.common_name}
                  className="plant-image"
                />
                <p>Watering: {plant.watering}</p>
                <p>Sunlight: {plant.sunlight}</p>
                <p>Hardiness Zone: {plant.hardiness_min} - {plant.hardiness_max}</p>
                <p>Flowers: {plant.flowers ? "Yes" : "No"}</p>
                <p>Flowering Season: {plant.flowering_season}</p>
                <p>Indoor Plant: {plant.indoor ? "Yes" : "No"}</p>
                <p>Description: {plant.description}</p>
            </div>
        <DropDown selectedValue={selectedProjectId} onChange={setSelectedProjectId}/>
        <button className="add-plant-project-button" type="button" onClick={handleClick}>Add plant to project</button>
        </div>
      </div>
    ) : (
      <div>Loading Plant Details...</div>
    )}

  </>
  );
};

export default PlantDetail;

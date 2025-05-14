import React,{useState,useEffect} from "react";
import { useNavigate,useParams } from "react-router";
import "./PlantDetail.css";
import DropDown from "./DropDown";

const PlantDetail = () => {
  const [plant, setPlant] = useState(null);
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
        <DropDown/>
        </div>
      </div>
    ) : (
      <div>Loading Plant Details...</div>
    )}

  </>
  );
};

export default PlantDetail;

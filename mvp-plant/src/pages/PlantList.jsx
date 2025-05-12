import React,{useContext,useState, useEffect} from "react";
import { ThemeContext } from "../context/ThemeContext.js";
import { useNavigate } from "react-router";
import "./PlantList.css";

const GetPlantList = ({offset, loading, setLoading}) => {
    const [plants, setPlants] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPlants() {
            try {
                // const key = "sk-nUTl681d56208eb2b10323"
                // // TODO: call backend API instead
                // const plantURL = `https://perenual.com/api/v2/species-list?key=${key}&page=${offset}`;

                const plantURL = "http://localhost:8000/api/plants"
                const response = await fetch(plantURL);
                if(!response.ok){
                    throw new Error(`${response.status}`)
                }
                const data = await response.json();
                // Fetching list of plants
                const plantData = data;

                setPlants(plantData); // Merging the new Pokemon with the previous list?? only if appears twice
                setLoading(false)
            }
            catch (error) {
                setError(error);
                console.error("Error fetching PlantData:", error);
            } }
        fetchPlants()
    }, [offset, setLoading]); // Dependency array to re-run the effect when offset changes

    if (error) {
        return <div>Something went wrong, try again..</div>;
    }
    if (loading) {
        return <div>Loading Plant List...</div>;
    }

    return (
        <>
            <ul className="card-grid">

                {plants.map((plant) => (
                    <div key={plant.plant_id} onClick={() => navigate(`/plant/${plant.plant_id}`)}>
                        <div className ="card">
                        {plant.default_image?(<img src={plant.default_image} alt={plant.common_name} />):(<p>No Image to display</p>)}

                            <h4 style={{ textTransform: 'capitalize' }}>{plant.common_name}</h4>
                        </div>
                    </div>
                ))}

            </ul>
        </>
    );
};


function PlantList() {
    const [offset, setOffset] = useState(1) // State to manage the offset for pagination
    const [loading, setLoading] = useState(false); // State to manage the loading state
    const [showMore, setShowMore] = useState(false);

    let hasPrev = offset > 0;
    let hasNext = offset < 338;


const handlePrevClick = () => {
    setLoading(true); // Set loading to true when the button is clicked
    if(hasPrev){
        setOffset(prev => prev - 1); // Increment the offset by 1 page
    }}
    // Function to handle the button click and fetch the next set of plants

const handleNextClick = () => {
    setLoading(true); // Set loading to true when the button is clicked
    if(hasNext){
        setOffset(prev => prev + 1); // Increment the offset by 1 page
    }}
        // Function to handle the button click and fetch the next set of plants



    return (
    <div className="plantlistpage-backmat">
        <h1 className="plantlistpage-backmat-heading">Cultivated Collection</h1>
        <button onClick={handlePrevClick} disabled={loading || !hasPrev}>
        <p>Previous Page</p>
        </button>
        <button onClick={handleNextClick} disabled={loading || !hasNext}>
        <p>Next Page</p>
        </button>
            <h2>Click on a Plant to see its details
        <GetPlantList offset = {offset} loading = {loading} setLoading= {setLoading}/>
        </h2>
    </div>

    );
};


export default PlantList;

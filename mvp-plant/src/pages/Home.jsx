import React,{useContext, useState} from "react";
import "./Home.css";


const Home = () => {
  const [error,setError] = useState(null);
  const [zone, setZone] = useState(null);
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);



async function fetchZone() {
  if (!zip) return;
  setLoading(true);
  setError(null);
  setZone(null);
    try {
        const URL = `https://phzmapi.org/${zip}.json`;
        const response = await fetch(URL);
        if(!response.ok){
            throw new Error(`${response.status}`)
        }
        const data = await response.json();
        setZone(data);
        // let extractZone = data.zone;
        // let userZone = str.split('').filter(char=> !isNaN(char) && char !== ' ').join('');



        setLoading(false)
    }
    catch (error) {
        setError(error);
        console.error("Error fetching Zipcode:", error);
    } }


if (error) {
  return <div>Something went wrong, try again..</div>;
}
if (loading) {
  return <div>Loading Hardiness Zone...</div>;
}


  return (
    <div className="page-backmat">

      <h1 className="page-backmat-heading">Welcome to Gardenize</h1>
      <div className="input-container page-backmat-heading">
        <p className="homepage-summary">Gardenize is a digital garden planning
tool that helps you organize your garden spaces.
It allows you to store details of your plant projects,
save ideas for future projects,
and discover which plants thrive in your
specific hardiness
zone — all in one place.</p>

{zone && (
        <div className="zoneDisplay">
          <h2>Your Growing Zone is:</h2>
          <p>Zone: {zone.zone}</p>
        </div>
      )}

      <label htmlFor="zipCodeTB">Enter Your Zip Code to Find Your Growing Zone:</label>
      <input
        type="text"
        id="zipCodeTB"
        placeholder="Zip Code"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
      />
      <button className="submit-button" onClick={fetchZone}>Submit</button>
    </div>

    {loading && <p>Loading Hardiness Zone...</p>}
      {error && <p className="error">Something went wrong: {error}</p>}




    </div>
  );
};

export default Home;

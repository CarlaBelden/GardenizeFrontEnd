import React, { useState, useEffect } from 'react';

function DropDown({ selectedValue, onChange, reloadTrigger }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectURL = `http://localhost:8000/api/projects`
        const response = await fetch(projectURL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const format = data.map(item => ({
          value: item.project_id,
          label: item.project_name
        }));

        setOptions(format);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    fetchData();
  }, [reloadTrigger]); // Dependency array to re-run the effect when new project added

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <select className="projects-dropdown" value={selectedValue} onChange={(e) => onChange(e.target.value)}>
    <option value="" disabled hidden>Select Plant Project</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default DropDown;

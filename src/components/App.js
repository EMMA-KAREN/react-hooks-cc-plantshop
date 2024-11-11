import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";
import PlantList from "./PlantList";
import Loading from "./Loading";


function App() {
   // State to store the list of plants.
  const [plants, setPlants] = useState([]);
    // State to manage loading status.
  const [isLoading, setIsLoading] = useState(true);
    // State to handle and display errors.
  const [error, setError] = useState(null);
    // State to track the search query.
  const [searchTerm, setSearchTerm] = useState(''); 
    // State to store plants filtered based on search input
  const [filteredPlants, setFilteredPlants] = useState([]);

  useEffect(() => {
    // Simulate data fetching or other initialization tasks
    setTimeout(() => {
      setIsLoading(false);  // Set loading to false after 2 seconds to simulate loading delay.
    }, 2000);
  }, []);// ARRAY ENSURES IT ONLY RUNS ONCE

  // Fetch data on load
  useEffect(() => {
    fetch("https://react-hooks-cc-plantshop-5-yxgc.onrender.com/plants")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setPlants(data);
        setFilteredPlants(data); // Initialize filtered plants
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error fetching plants: " + error.message);
        setIsLoading(false);
      });
  }, []);

  // Search functionality AND  Update the search term state.
  const handleSearch = (query) => {
    setSearchTerm(query);
    setFilteredPlants(
      plants.filter((plant) =>
        plant.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  // Add new plant: form submission capture and send a POST request
  const handleAddPlant = (newPlant) => {
    fetch("https://react-hooks-cc-plantshop-5-yxgc.onrender.com/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((data) => {
        setPlants((prevPlants) => [...prevPlants, data]);
        setFilteredPlants((prevPlants) => [...prevPlants, data]);
      })
      .catch((error) => setError("Error adding plant: " + error.message));
  };




  // Delete plant VIA DELETE request:remove it from plants and also filtered
  const handleDeletePlant = (id) => {
    fetch(`https://react-hooks-cc-plantshop-5-yxgc.onrender.com/plants/${id}`, { method: "DELETE" })
      .then(() => {
        setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
        setFilteredPlants((prevPlants) =>
          prevPlants.filter((plant) => plant.id !== id)
        );
      })
      .catch((error) => setError("Error deleting plant: " + error.message));
  };

  // Show plant details 
  const handleShowDetails = (id) => {
    const plant = plants.find((plant) => plant.id === id);
    if (plant) {
      // Display plant info in an alert or you could use a modal for more details
      alert(`Plant Details:\nName: ${plant.name}\nPrice: $${plant.price.toFixed(2)}\nDescription: ...`);
    }
  };

  //in the return :Render the loader animation if loading is true 
  //               Render PlantPage and pass props(pass function for adding new plant,searchin and pass current search term)
  //               render plantlist(pass filtered plants,handle deleting,show detail of plants)
  return (
    <div className="app">
     
     {isLoading && <Loading />}
          <Header />
          <PlantPage
            onAddPlant={handleAddPlant}
            onSearch={handleSearch}
            searchTerm={searchTerm}
          />
          <h1>Plantsy</h1>
          {isLoading ? (
            <p>Loading plants...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <PlantList
              plants={filteredPlants}
              onDeletePlant={handleDeletePlant}
              onShowDetails={handleShowDetails} 
            />
          )}
      
    
    </div>
  );
}

export default App;



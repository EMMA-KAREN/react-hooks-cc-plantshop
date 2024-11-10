import React from "react";
import PlantCard from "./PlantCard";

//a list of plants
function PlantList({ plants, onDeletePlant, onUpdatePrice, onToggleSoldOut, onShowDetails }) {
  // Ensure plants is always an array if not display a fallback message that returns plant prop is not an array
  if (!Array.isArray(plants)) {
    return <p>No plants available</p>;
  }
  // In the return :render a list of plant component.Map to loop thru each plant array
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          id={plant.id}
          name={plant.name}
          image={plant.image}
          price={plant.price}
          onDelete={onDeletePlant}
          onUpdatePrice={onUpdatePrice}
          onToggleSoldOut={onToggleSoldOut}
          onShowDetails={onShowDetails} 
        />
      ))}
    </ul>
  );
}

export default PlantList;

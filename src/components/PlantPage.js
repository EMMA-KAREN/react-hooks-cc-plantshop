import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
function PlantPage({ plants, onSearch, searchTerm,  onAddPlant }){

  //In the return :
  //   newplantform >add plant,pass an add plant function as prop
  //   searchbar >filter plants,  pass the onSearch function and the searchTerm as props
  //    passing the plants prop to the PlantList component.
  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant} />
      <Search onSearch={onSearch} searchTerm={searchTerm} />
      <PlantList plants={plants}  />
    </main>
  );
}

export default PlantPage;

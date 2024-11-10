import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new plant object
    const newPlant = { name, image,  price: parseFloat(price), };
     
    
      // Call the parent function to add the new plant
      onAddPlant(newPlant);

      // Reset the form fields
      setName('');
      setImage('');
      setPrice('');
    };
    return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name"  value={name} onChange={(e) => setName(e.target.value)} placeholder="Plant name"   required />
        <input type="text" name="image"  value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL"   required />
        <input type="number" name="price"  value={price} onChange={(e) => setPrice(e.target.value)} step="0.01" placeholder="Price"
          required />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;

import React, { useState, useEffect } from 'react';

// display individual plant details and manage its stock status
function PlantCard({ id, name, image, price, initialIsSoldOut, onDelete, onShowDetails }) {
  const [isSoldOut, setIsSoldOut] = useState(initialIsSoldOut);

  //  useEffect: This is used to fetch the isSoldOut state from localStorage when the component is mounted or when the id changes.
  useEffect(() => {
    const storedIsSoldOut = localStorage.getItem(`plant_${id}_isSoldOut`);
    if (storedIsSoldOut !== null) {
      setIsSoldOut(JSON.parse(storedIsSoldOut));
    }
  }, [id]);// Run the "id"changes

  // handleToggleSoldOut: This function toggles the sold-out state and stores it in localStorage to persist the data even after a page refresh.
  const handleToggleSoldOut = () => {
    setIsSoldOut(!isSoldOut);
    localStorage.setItem(`plant_${id}_isSoldOut`, JSON.stringify(!isSoldOut));
    // a request to your backend to update the server-side state as well
  };
  //we return:plant image,name,price
  //         :Conditional button render based on isSoldOut 
  //         :deletebutton
  //         :show detail button
  return (
    <li className="card col-sm-12 col-md-6 col-lg-4 mb-4" data-testid="plant-item">
      <div className="card-body">
        <img 
          src={image} 
          alt={name} 
          className="card-img-top" 
          style={{ maxHeight: "200px", objectFit: "cover" }} 
        />
        <h4 className="card-title mt-3">{name}</h4>
        <p className="card-text">Price: ${price.toFixed(2)}</p>
        
        <div className="d-flex justify-content-between">
                    {isSoldOut ? (
      <button>Out of Stock</button>
      ) : (
      <button className="primary" onClick={handleToggleSoldOut}>In Stock</button>
      )}
          
          <button onClick={() => onDelete(id)} className="btn btn-danger">
            Delete
          </button>
          
          <button onClick={() => onShowDetails(id)} className="btn btn-primary">
            About the Plant
          </button>
        </div>
      </div>
    </li>
  );
}

export default PlantCard;

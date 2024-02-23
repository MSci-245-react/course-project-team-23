
import React, { useState, useEffect } from 'react';

function FoodIngredientsList() {
  const [foodIngredients, setFoodIngredients] = useState([]);

  useEffect(() => {
    // Fetch data from your backend API endpoint
    fetch('/api/foodIngredients')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log the data fetched from the server
        setFoodIngredients(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Food Ingredients List</h1>
      <ul>
        {foodIngredients.map((ingredient, index) => (
          <li key={index}>
            <strong>Food Product:</strong> {ingredient['Food Product']},{' '}
            <strong>Main Ingredient:</strong> {ingredient['Main Ingredient']}
            {/* Add additional fields here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodIngredientsList;

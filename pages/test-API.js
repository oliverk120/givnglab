import React from 'react';

const TestPage = () => {
  // Define the gifts data
  const gifts = [
    // Your gift objects here
    {
        "name": "Vitruvi stone diffuser",
        "brand": "Nordstrom",
        "description": "Give their new apartment an aromatic makeover.",
        "metadata": {
          "start_url": "https://www.example.com"
        }
      },
      {
        "name": "Beast blender & hydration system",
        "brand": "Beast",
        "description": "The best smoothie is the one you make at home.",
        "metadata": {
          "start_url": "https://www.example.com"
        }
      }
  ];

  // Function to handle the button click and send the POST request
  const handleButtonClick = () => {
    // Make a POST request to the Flask API
    console.log(JSON.stringify({ gifts: gifts}));
    fetch('http://localhost:5000/generate-categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gifts: gifts })
    })
    .then(response => response.json())
    .then(data => {
      // The generated categories are available in the 'data' variable
      console.log(data);
    })
    .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Test Page</h1>
      {/* Button to trigger the POST request */}
      <button onClick={handleButtonClick}>Generate Categories</button>
    </div>
  );
};

export default TestPage;

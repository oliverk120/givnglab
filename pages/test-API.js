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

    // Define the articles data
  const articles = [
    {
      "title": "The Best Gifts for Your Girlfriend",
      "body_text": "Check out our top picks for meaningful gifts that will make your girlfriend smile.",
      "start_url" : "https://www.example.com",
      "article_date": "2020-12-01"
    },
    {
      "title": "Thoughtful Gifts for Men",
      "body_text": "Discover unique and thoughtful gifts for the special men in your life.",
      "start_url" : "https://www.example.com",
      "article_date": "2020-12-01"
    },{
      "title": "Nerdy Gifts for Anyone in your Life",
      "body_text": "Regardless of who the recipient is, these gifts will be sure to delight.",
      "start_url" : "https://www.example.com",
      "article_date": "2020-12-01"
    }
  ];

  // Function to handle the button click and send the POST request for categories
  const handleGenerateCategories = () => {
    // Make a POST request to the Flask API
    console.log(JSON.stringify({ gifts: gifts }));
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

  // Function to handle the button click and send the POST request for vibes
  const handleGenerateVibes = () => {
    // Make a POST request to the Flask API
    console.log(JSON.stringify({ gifts: gifts }));
    fetch('http://localhost:5000/generate-vibes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gifts: gifts })
    })
    .then(response => response.json())
    .then(data => {
      // The generated vibes are available in the 'data' variable
      console.log(data);
    })
    .catch(error => console.error(error));
  };

  // Function to handle the button click and send the POST request for gender
  const handleGenerateGender = () => {
    // Make a POST request to the Flask API
    console.log(JSON.stringify({ articles: articles })); // Send articles instead of gifts
    fetch('http://localhost:5000/generate-gender', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articles: articles }) // Send articles instead of gifts
    })
    .then(response => response.json())
    .then(data => {
      // The generated gender values are available in the 'data' variable
      console.log(data);
    })
    .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Test Page</h1>
      {/* Button to trigger the POST request for categories */}
      <button onClick={handleGenerateCategories}>Generate Categories</button>
      {/* Button to trigger the POST request for vibes */}
      <button onClick={handleGenerateVibes}>Generate Vibes</button>
      {/* Button to trigger the POST request for gender */}
      <button onClick={handleGenerateGender}>Generate Gender</button>
    </div>
  );
};

export default TestPage;

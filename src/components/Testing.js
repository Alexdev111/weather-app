// import React from "react";
function Testing() {
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=f20a13b40af67463fd877f6d98a2f22c')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  
}

export default Testing;
import ws from './database.js';

// Use the ws object in your code here

setTimeout(() => {
  console.clear();
},100)
  

// Function to fetch data from server and update HTML
function updateHTML() {
    fetch('../data.json')
      .then(response => response.json())
      .then(data => {
        //create datasets
        const teamData = data[teamNumber];
        const teamNumber = teamData.teamNumber.toString();
        const teamName = teamData.teamName.toString();
        const canAutoBalance = teamData.canAutoBalance.toString();
        const notes = teamData.notes.toString();
 
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  // Call the updateHTML function when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateHTML();
  });
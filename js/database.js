const ws = new WebSocket('ws://localhost:8080/websocket');

ws.on('connection', function connection(ws) {
  console.log('New client connected');

  // Send a message to the client on connection
  ws.send('Welcome to the server');

  // Listen for messages from the client
  ws.on('message', function incoming(message) {
    console.log(`Received message from client: ${message}`);
  });
});



function addData(data) {
  const newTeamData = {
    [data.team]: {
      team: data.team,
      canAutoBalance: data.canAutoBalance,
      notes: data.notes
    }
  }

  // Send a POST request to the server-side PHP script
  fetch('../add_data.php', {
    method: 'POST',
    body: JSON.stringify(newTeamData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.message);
  })
  .catch(error => {
    console.error(error);
  });
  ws.send("Data added");
}



function editData(teamNumber, newData) {
  // Send a POST request to the server-side PHP script to update the data for the team
  fetch('../edit_data.php', {
    method: 'POST',
    body: JSON.stringify({ team: teamNumber, data: newData }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.message);
  })
  .catch(error => {
    console.error(error);
  });
  ws.send("Data edited");
}
export default ws;

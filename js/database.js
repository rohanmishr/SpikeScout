const ws = new WebSocket('ws://localhost:5555');
ws.addEventListener('error', (event) => {
  console.error('WebSocket error:', event);
});
ws.addEventListener('open', function() {
  console.log('New client connected');

  // Send a message to the server on connection
  ws.send('Welcome to the server');
});

// Listen for messages from the server
ws.addEventListener('message', function(event) {
  console.log(`Received message from server: ${event.data}`);
});

function addData(data) {
  const newTeamData = {
    [data.team]: {
      team: data.team,
      canAutoBalance: data.canAutoBalance,
      notes: data.notes
    }
  }

  if (ws.readyState === WebSocket.OPEN) {
    // If the WebSocket connection is open, send the message
    ws.send(JSON.stringify({ action: 'add', data: newTeamData }));
    
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
  } else {
    // If the WebSocket connection is still connecting, wait for the 'open' event
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({ action: 'add', data: newTeamData }));

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
    });
  }
}


function editData(teamNumber, newData) {
  const updatedData = {
    [teamNumber]: newData
  }

  if (ws.readyState === WebSocket.OPEN) {
    // If the WebSocket connection is open, send the message
    ws.send(JSON.stringify(updatedData));
  } else {
    // If the WebSocket connection is still connecting, wait for the 'open' event
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify(updatedData));
    });
  }

  // Send a POST request to the server-side PHP script
  fetch('../edit_data.php', {
    method: 'POST',
    body: JSON.stringify(updatedData),
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
}


const data = {
  teamNumber: 293,
  canAutoBalance: true,
  notes: 'This team is awesome!'
}

addData(data);
export default ws;

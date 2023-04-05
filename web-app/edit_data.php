<?php
// Read the POST request data
$data = json_decode(file_get_contents("php://input"), true);

// Read the existing data from the JSON file
$file_contents = file_get_contents("data.json");
$existing_data = json_decode($file_contents, true);

// Find the relevant data for the team number provided and update it
foreach ($existing_data as &$team) {
  if ($team['teamNumber'] == $data['teamNumber']) {
    $team['canAutoBalance'] = $data['canAutoBalance'];
    $team['notes'] = $data['notes'];
    break;
  }
}

// Write the updated data back to the JSON file
file_put_contents("data.json", json_encode($existing_data));

// Send a response back to the client
$response = array('message' => 'Data updated successfully');
echo json_encode($response);
?>

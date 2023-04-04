<?php
// Get the JSON data from the request body
$json = file_get_contents('php://input');

if (!$json) {
  http_response_code(400);
  header('Content-Type: application/json');
  echo json_encode(array('error' => 'Invalid or empty request body.'));
  exit;
}

// Parse the JSON data into a PHP array
$team = json_decode($json, true);

if (!$team) {
  http_response_code(400);
  header('Content-Type: application/json');
  echo json_encode(array('error' => 'Invalid or malformed JSON data.'));
  exit;
}

// Load the existing team data from the JSON file
$data = json_decode(file_get_contents('data.json'), true);

if (!$data) {
  http_response_code(500);
  header('Content-Type: application/json');
  echo json_encode(array('error' => 'Error loading team data.'));
  error_log('Error loading team data from data.json');
  exit;
}

// Add the new team data to the array
$data[] = $team;

// Save the updated team data back to the JSON file
if (!file_put_contents('data.json', json_encode($data))) {
  http_response_code(500);
  header('Content-Type: application/json');
  echo json_encode(array('error' => 'Error saving team data.'));
  error_log('Error saving team data to data.json');
  exit;
}

// Return a JSON response with a success message
header('Content-Type: application/json');
echo json_encode(array('message' => 'Team added successfully.'));
?>
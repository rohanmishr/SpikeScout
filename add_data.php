<?php
// Get the JSON data from the request body
$json = file_get_contents('php://input');

// Parse the JSON data into a PHP array
$team = json_decode($json, true);

// Load the existing team data from the JSON file
$data = json_decode(file_get_contents('data.json'), true);

// Add the new team data to the array
$data[] = $team;

// Save the updated team data back to the JSON file
file_put_contents('data.json', json_encode($data));

// Return a JSON response with a success message
header('Content-Type: application/json');
echo json_encode(array('message' => 'Team added successfully.'));
?>

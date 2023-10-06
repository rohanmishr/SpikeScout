import React, { useEffect, useState } from 'react';
import { Client, Account, Teams } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('651e10942f2cd0797080');

const account = new Account(client);

const teams = new Teams(client);

function handleSubmit(event) {
  const promise = teams.create(
    event.target.teamName.value,
    event.target.teamNumber.value,
    ['mentor', 'member', 'admin'],
  );
}

export default function RegisterTeam() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await account.get();
        console.log(response);

        if (response.status === 401) {
          // Set the content for unauthorized users
          setContent(
            <div>
              <h1>Unauthorized Access</h1>
              <p>You are not authorized to view this page.</p>
            </div>
          );
        } else {
          // Set the content for authorized users or handle other response cases
          // ...
        }
      } catch (error) {
        // Handle promise rejection (e.g., network error)
        console.error(error);
        // Set the content for the error case
        setContent(
          <div>
            <h1>Error</h1>
            <p>An error occurred while processing your request.</p>
          </div>
        );
      }
    };

    fetchAccount();
  }, []);

  return (
    <div>
      {content || (
        <div>
          <h1>Register Team</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Team Number:
              <input type="text" name="teamNumber" />
            </label>
            <label>
              Team Name:
              <input type="text" name="teamName" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Client, Account } from 'appwrite';
import { redirect } from 'next/navigation';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('651e10942f2cd0797080');

const account = new Account(client);

export default function RegisterTeam() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await account.get();
        console.log(response);

        if (response.status === 401) {
          // Set the content for unauthorized users
          redirect('/login');
        } else {
          // Set the content for authorized users or handle other response cases
          // ...
        }
      } catch (error) {
        // Handle promise rejection (e.g., network error)
        console.error(error);
        // Set the content for the error case
        // redirect user to login page
        redirect('/login');
      }
    };

    fetchAccount();
  }, []);

  return (
    <div>
      {content || (
        <div>
          <h1>Register Team</h1>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import ConnectSlack from './ConnectSlack';

function UserDetails() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details
    fetch('/api/users/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error('Error fetching user details:', error));
  }, []);

  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <ConnectSlack isConnected={user.slackConnected} />
    </div>
  );
}

export default UserDetails;

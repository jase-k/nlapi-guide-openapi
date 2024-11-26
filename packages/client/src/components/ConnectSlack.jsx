import PropTypes from 'prop-types';

function ConnectSlack({ isConnected }) {
  const slackClientId = import.meta.env.VITE_SLACK_CLIENT_ID;
  const slackRedirectUri = import.meta.env.VITE_SLACK_REDIRECT_URI;

  if (!slackClientId || !slackRedirectUri) {
    console.error('Slack client ID or redirect URI is missing');
    return null; // Return null to prevent rendering if there's an error
  }
  const accessToken = localStorage.getItem('accessToken');
  const slackAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${slackClientId}&user_scope=identity.basic&redirect_uri=${slackRedirectUri}&state=${accessToken}`;

  return (
    <div>
      {isConnected ? (
        <p>Slack Connected</p>
      ) : (
        <a href={slackAuthUrl}>
          <button>Connect Slack</button>
        </a>
      )}
    </div>
  );
}

ConnectSlack.propTypes = {
  isConnected: PropTypes.bool.isRequired,
};

export default ConnectSlack;

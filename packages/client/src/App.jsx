// src/App.js
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import ChatBubble from './components/ChatBubble';

const AppLayout = () => {
  const location = useLocation();

  // Define routes where ChatBubble should NOT be displayed
  const excludedRoutes = ['/login', '/signup', '/'];

  // Determine if the current route is excluded
  const hideChatBubble = excludedRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/" element={<LoginPage />} />
        {/* Add more routes here as needed */}
      </Routes>
      {/* Conditionally render ChatBubble */}
      {!hideChatBubble && <ChatBubble />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;

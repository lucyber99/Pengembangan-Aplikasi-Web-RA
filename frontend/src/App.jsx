import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/sign-in';
import Register from './pages/register';
import PropertyBrowse from './pages/PropertyBrowse';
import PropertyDetail from './pages/PropertyDetail';
import AgentDashboard from './pages/AgentDashboard';
import ProfileSettings from './pages/ProfileSettings';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/properties" element={<PropertyBrowse />} />
      <Route path="/properties/:id" element={<PropertyDetail />} />
      <Route path="/agent/dashboard" element={<AgentDashboard />} />
      <Route path="/profile" element={<ProfileSettings />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

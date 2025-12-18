import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/sign-in';
import Register from './pages/register';
import AgentDashboard from './pages/AgentDashboard';
import ProfileSettings from './pages/ProfileSettings';
import PropertyRoute from './components/PropertyRoute';
import PropertyCreate from './pages/PropertyCreate';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/properties/*" element={<PropertyRoute />} />
      <Route path="/agent/dashboard" element={<AgentDashboard />} />
      <Route path="/agent/properties/new" element={<PropertyCreate />} />
      <Route path="/agent/properties/:id/edit" element={<PropertyCreate />} />
      <Route path="/profile" element={<ProfileSettings />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

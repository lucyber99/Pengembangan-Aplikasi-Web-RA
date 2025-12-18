import { Routes, Route, Navigate } from 'react-router-dom';
import PropertyBrowse from '../pages/PropertyBrowse';
import PropertyDetail from '../pages/PropertyDetail';
import PropertyCreate from '../pages/PropertyCreate';

const PropertyRoute = () => {
  return (
    <Routes>
      <Route index element={<PropertyBrowse />} />
      <Route path="new" element={<PropertyCreate />} />
      <Route path=":id" element={<PropertyDetail />} />
      <Route path=":id/edit" element={<PropertyCreate />} />
      <Route path="*" element={<Navigate to="/properties" replace />} />
    </Routes>
  );
};

export default PropertyRoute;


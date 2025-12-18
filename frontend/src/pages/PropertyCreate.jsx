import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyListingForm from '../components/PropertyListingForm';
import { DEMO_PHOTOS, getDemoProperties, getDemoPropertyById } from '../utils/demoProperties';

const STORAGE_KEY = 'agentProperties';

const readStoredProperties = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const writeStoredProperties = (properties) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
};

const normalizeType = (type) => {
  if (!type) return 'Property';
  const cleaned = String(type).trim();
  if (!cleaned) return 'Property';
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
};

const parsePrice = (value) => {
  if (value == null) return 0;
  const num = Number(String(value).replace(/[^\d]/g, ''));
  return Number.isFinite(num) ? num : 0;
};

const PropertyCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const apiBase = useMemo(() => import.meta.env.VITE_API_BASE || 'http://localhost:6543', []);

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (!id) {
      setInitialData({});
      return;
    }

    const stored = readStoredProperties();
    const found =
      (stored || []).find((p) => String(p.id) === String(id)) || getDemoPropertyById(id) || getDemoProperties(1)[0];

    setInitialData({
      id,
      title: found?.title || '',
      description: found?.description || '',
      price: found?.price ? String(found.price) : '',
      type: found?.type || '',
      address: found?.location || found?.address || '',
    });
  }, [id]);

  const handleFormSubmit = (formData) => {
    const stored = readStoredProperties() || getDemoProperties(6).slice(0, 6);
    const baseId = stored.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0) || 0;

    const next = {
      id: id ? Number(id) || id : baseId + 1,
      title: formData.title?.trim() || 'Untitled Property',
      description: formData.description?.trim() || '',
      price: parsePrice(formData.price),
      type: normalizeType(formData.type),
      location: formData.address?.trim() || 'Unknown location',
      beds: Number(formData.beds) || 3,
      baths: Number(formData.baths) || 2,
      area: Number(formData.area) || 120,
    };

    const photoUrl = stored.find((p) => String(p.id) === String(next.id))?.photoUrl || DEMO_PHOTOS[next.id % DEMO_PHOTOS.length];
    const images =
      stored.find((p) => String(p.id) === String(next.id))?.images || [photoUrl, ...DEMO_PHOTOS].slice(0, 5);

    const nextWithMedia = { ...next, photoUrl, images };

    const updated = id
      ? stored.map((p) => (String(p.id) === String(id) ? { ...p, ...nextWithMedia } : p))
      : [nextWithMedia, ...stored];

    writeStoredProperties(updated);
    navigate('/agent/dashboard');
  };

  return (
    <>
      <Navbar apiBase={apiBase} />
      <main style={{ maxWidth: '980px', margin: '0 auto', padding: '22px 18px 90px' }}>
        <h1 style={{ margin: '0 0 10px', color: '#0f172a' }}>{id ? 'Edit Property' : 'Add Property'}</h1>
        <p style={{ margin: '0 0 18px', color: '#64748b', fontWeight: 600 }}>
          {id ? 'Update your listing details.' : 'Create a new listing for your portfolio.'}
        </p>

        {initialData == null ? (
          <div style={{ padding: '18px', border: '1px dashed #cbd5e1', borderRadius: '16px', color: '#64748b' }}>
            Loading…
          </div>
        ) : (
          <PropertyListingForm
            onSubmit={handleFormSubmit}
            onCancel={() => navigate('/agent/dashboard')}
            submitLabel={id ? 'Update Property' : 'Post Property'}
            initialData={initialData}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default PropertyCreate;

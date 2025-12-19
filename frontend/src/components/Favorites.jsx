import { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import { favoritesAPI } from '../utils/api';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await favoritesAPI.getFavorites();
      
      if (response.success) {
        setFavorites(response.favorites || []);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error loading favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleFavorite = async (propertyId, isCurrentlyFavorite) => {
    try {
      if (isCurrentlyFavorite) {
        await favoritesAPI.removeFavorite(propertyId);
        // Remove from local state
        setFavorites(prev => prev.filter(prop => prop.id !== propertyId));
      } else {
        await favoritesAPI.addFavorite(propertyId);
        // Reload favorites to get updated list
        await loadFavorites();
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
      alert(err.message || 'Failed to update favorite');
    }
  };

  // Transform API property format to PropertyCard format
  const transformProperty = (property) => {
    // Get first photo URL or use a placeholder
    const photoUrl = property.photos && property.photos.length > 0
      ? property.photos[0].url
      : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80';
    
    return {
      id: property.id,
      title: property.title,
      location: property.location,
      price: parseFloat(property.price),
      type: property.type ? property.type.charAt(0).toUpperCase() + property.type.slice(1) : property.type,
      beds: property.bedrooms,
      baths: property.bathrooms,
      area: parseFloat(property.area),
      photoUrl: photoUrl,
    };
  };

  if (loading) {
    return (
      <section className="showcase" id="favorites">
        <div className="section-header">
          <p className="eyebrow">Favorites</p>
          <h2>Properti Tersimpan</h2>
          <p className="lede">Memuat daftar favorit Anda...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="showcase" id="favorites">
        <div className="section-header">
          <p className="eyebrow">Favorites</p>
          <h2>Properti Tersimpan</h2>
          <div className="status status--pill" style={{ marginTop: '1rem' }}>
            <span className="dot error" />
            <span>{error}</span>
          </div>
          {error.includes('Unauthorized') && (
            <p className="lede" style={{ marginTop: '1rem' }}>
              Silakan login terlebih dahulu untuk melihat favorit Anda.
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="showcase" id="favorites">
      <div className="section-header">
        <p className="eyebrow">Favorites</p>
        <h2>Properti Tersimpan</h2>
        <p className="lede">
          {favorites.length === 0
            ? 'Anda belum menyimpan properti favorit. Mulai jelajahi dan simpan properti yang Anda sukai!'
            : `Anda memiliki ${favorites.length} properti tersimpan.`}
        </p>
      </div>
      
      {favorites.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          color: '#64748b',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem', color: '#fbbf24' }}>★</div>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: '600', color: '#0f172a' }}>
            Belum ada favorit
          </p>
          <p style={{ fontSize: '0.95rem', color: '#64748b' }}>
            Klik ikon bintang pada properti untuk menyimpannya ke favorit
          </p>
        </div>
      ) : (
        <div className="property-grid">
          {favorites.map((property) => {
            const transformed = transformProperty(property);
            return (
              <PropertyCard
                key={property.id}
                property={transformed}
                favorite={true}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={true}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Favorites;


import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  Share2,
  BedDouble,
  Bath,
  Ruler,
  MapPin,
  BadgeCheck,
  Image as ImageIcon,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InquiryCard from '../components/InquiryCard';
import PropertyCard from '../components/PropertyCard';
import Button from '../components/ui/Button';
import { DEMO_PHOTOS, getDemoProperties, getDemoPropertyById } from '../utils/demoProperties';
import './PropertyDetail.css';

const formatPrice = (value) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value || 0);

const normalizeProperty = (item, index) => {
  const id = item?.id ?? item?.property_id ?? index + 1;
  const price = Number(item?.price ?? item?.harga ?? 0) || 0;
  const beds = Number(item?.beds ?? item?.bedrooms ?? 0) || 0;
  const baths = Number(item?.baths ?? item?.bathrooms ?? 0) || 0;
  const area = Number(item?.area ?? item?.sqm ?? item?.size ?? 0) || 0;

  const images = Array.isArray(item?.images) ? item.images : null;
  const photoUrl = item?.photoUrl ?? item?.image_url ?? item?.photo_url ?? DEMO_PHOTOS[id % DEMO_PHOTOS.length];

  return {
    id,
    title: item?.title ?? item?.name ?? `Property #${id}`,
    location: item?.location ?? item?.address ?? 'Unknown location',
    type: item?.type ?? item?.property_type ?? 'Property',
    price,
    beds,
    baths,
    area,
    description:
      item?.description ??
      'A beautifully designed home in a prime location. Spacious living areas, modern finishes, and great access to amenities.',
    photoUrl,
    images: images?.length ? images : [photoUrl, ...DEMO_PHOTOS].slice(0, 5),
  };
};

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiBase = useMemo(() => import.meta.env.VITE_API_BASE || 'http://localhost:6543', []);

  const [status, setStatus] = useState('idle'); // loading | ok | error
  const [error, setError] = useState('');
  const [property, setProperty] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setStatus('loading');
      setError('');

      try {
        const detailRes = await fetch(`${apiBase}/api/properties/${id}`);
        if (detailRes.ok) {
          const detail = await detailRes.json();
          const normalizedDetail = normalizeProperty(detail, 0);
          if (!isMounted) return;
          setProperty(normalizedDetail);

          const listRes = await fetch(`${apiBase}/api/properties`);
          const listJson = listRes.ok ? await listRes.json() : [];
          const items = Array.isArray(listJson) ? listJson : listJson?.items ?? listJson?.results ?? [];
          const normalized = items.map((item, idx) => normalizeProperty(item, idx));
          if (!isMounted) return;
          setRelated(normalized.filter((p) => String(p.id) !== String(normalizedDetail.id)).slice(0, 3));
          setStatus('ok');
          return;
        }

        const listRes = await fetch(`${apiBase}/api/properties`);
        if (!listRes.ok) throw new Error(`HTTP ${listRes.status}`);
        const listJson = await listRes.json();
        const items = Array.isArray(listJson) ? listJson : listJson?.items ?? listJson?.results ?? [];
        const normalized = items.map((item, idx) => normalizeProperty(item, idx));
        const found = normalized.find((p) => String(p.id) === String(id));

        if (!isMounted) return;
        const demoFallback = getDemoPropertyById(id) || getDemoProperties(1)[0];
        setProperty(found || normalizeProperty(demoFallback, 0));
        const relatedFromList = normalized.filter((p) => String(p.id) !== String(id)).slice(0, 3);
        const relatedFallback = getDemoProperties()
          .filter((p) => String(p.id) !== String(id))
          .slice(0, 3)
          .map((p, idx) => normalizeProperty(p, idx + 1));
        setRelated(relatedFromList.length ? relatedFromList : relatedFallback);
        setStatus('ok');
      } catch (e) {
        if (!isMounted) return;
        setError('Tidak bisa menghubungi backend. Menampilkan data contoh.');
        const demoFallback = getDemoPropertyById(id) || getDemoProperties(1)[0];
        setProperty(normalizeProperty(demoFallback, 0));
        setRelated(
          getDemoProperties()
            .filter((p) => String(p.id) !== String(id))
            .slice(0, 3)
            .map((p, idx) => normalizeProperty(p, idx + 1))
        );
        setStatus('error');
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [apiBase, id]);

  useEffect(() => {
    setActiveIndex(0);
  }, [property?.id]);

  const images = property?.images ?? [];
  const activeImage = images[activeIndex] || property?.photoUrl;

  const specs = property
    ? [
        { icon: <BedDouble size={18} />, label: 'Bedrooms', value: property.beds },
        { icon: <Bath size={18} />, label: 'Bathrooms', value: property.baths },
        { icon: <Ruler size={18} />, label: 'Area', value: `${property.area} sqm` },
      ]
    : [];

  return (
    <>
      <Navbar apiBase={apiBase} />
      <main className="detail-page">
        <div className="detail-topbar">
          <Button variant="link" to="/properties" leftIcon={<ArrowLeft size={18} />}>
            Back to browse
          </Button>
          <div className="detail-status">{status === 'loading' ? 'Loading…' : error ? error : ''}</div>
        </div>

        {!property ? (
          <div className="detail-skeleton">Loading property…</div>
        ) : (
          <div className="detail-layout">
            <section className="detail-main">
              <header className="detail-header">
                <div className="detail-badge">{property.type}</div>
                <h1 className="detail-title">{property.title}</h1>
                <div className="detail-location">
                  <MapPin size={16} />
                  <span>{property.location}</span>
                </div>
                <div className="detail-price">{formatPrice(property.price)}</div>

                <div className="detail-actions">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFavorite((v) => !v)}
                    leftIcon={<Heart size={16} fill={isFavorite ? '#ef4444' : 'none'} color={isFavorite ? '#ef4444' : '#0f172a'} />}
                  >
                    {isFavorite ? 'Saved' : 'Save'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const url = `${window.location.origin}/properties/${property.id}`;
                      navigator.clipboard?.writeText(url);
                    }}
                    leftIcon={<Share2 size={16} />}
                  >
                    Share
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' })}>
                    Contact Agent
                  </Button>
                </div>
              </header>

              <div className="detail-media">
                <div className="detail-hero-image" style={{ backgroundImage: `url(${activeImage})` }} role="img" aria-label={property.title}>
                  <div className="detail-hero-chip">
                    <ImageIcon size={16} />
                    <span>{images.length} photos</span>
                  </div>
                </div>

                <div className="detail-thumbs" aria-label="Photo gallery">
                  {images.slice(0, 5).map((src, idx) => (
                    <button
                      key={`${property.id}-thumb-${idx}`}
                      type="button"
                      className={`detail-thumb ${idx === activeIndex ? 'active' : ''}`.trim()}
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Photo ${idx + 1}`}
                    >
                      <span className="detail-thumb__img" style={{ backgroundImage: `url(${src})` }} aria-hidden />
                    </button>
                  ))}
                </div>
              </div>

              <section className="detail-section">
                <div className="detail-section__title">About This Property</div>
                <p className="detail-desc">{property.description}</p>
              </section>

              <section className="detail-section">
                <div className="detail-section__title">Specs</div>
                <div className="detail-specs">
                  {specs.map((s) => (
                    <div key={s.label} className="detail-spec">
                      <div className="detail-spec__icon">{s.icon}</div>
                      <div className="detail-spec__label">{s.label}</div>
                      <div className="detail-spec__value">{s.value}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="detail-section">
                <div className="detail-section__title">Highlights</div>
                <div className="detail-features">
                  {[
                    { label: 'Verified Listing', icon: <BadgeCheck size={18} /> },
                    { label: 'Great Neighborhood', icon: <BadgeCheck size={18} /> },
                    { label: 'Modern Finishes', icon: <BadgeCheck size={18} /> },
                    { label: 'Ready to Move', icon: <BadgeCheck size={18} /> },
                  ].map((f) => (
                    <div key={f.label} className="detail-feature">
                      <span className="detail-feature__icon">{f.icon}</span>
                      <span className="detail-feature__label">{f.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            </section>

            <aside className="detail-aside" id="inquiry">
              <InquiryCard
                onSubmit={(payload) => {
                  // Placeholder: wire to backend later.
                  console.log('Inquiry submitted', payload);
                  navigate('/properties');
                }}
              />
            </aside>
          </div>
        )}

        {related.length ? (
          <section className="detail-related">
            <div className="detail-related__top">
              <h2>Similar Properties</h2>
              <Link className="detail-related__link" to="/properties">
                View all
              </Link>
            </div>

            <div className="property-grid">
              {related.map((p) => (
                <Link key={p.id} to={`/properties/${p.id}`} className="detail-cardlink">
                  <PropertyCard property={p} />
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
};

export default PropertyDetail;

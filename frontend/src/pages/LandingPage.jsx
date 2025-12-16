import { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import SectionHeader from '../components/SectionHeader';
import PropertyCard from '../components/PropertyCard';

const sampleProperties = [
  {
    id: 1,
    title: 'Modern Scandinavian House',
    location: 'BSD, Tangerang',
    price: 2150000000,
    type: 'House',
    beds: 4,
    baths: 3,
    area: 210,
    photoUrl:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Highrise City Apartment',
    location: 'Kuningan, Jakarta',
    price: 1250000000,
    type: 'Apartment',
    beds: 2,
    baths: 2,
    area: 86,
    photoUrl:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'Coastal Villa',
    location: 'Canggu, Bali',
    price: 3550000000,
    type: 'House',
    beds: 3,
    baths: 3,
    area: 260,
    photoUrl:
      'https://images.unsplash.com/photo-1465805139202-a644e217f00e?auto=format&fit=crop&w=1200&q=80',
  },
];

const reasons = [
  { title: 'Trusted Platform', desc: 'Terverifikasi, ready untuk transaksi aman.' },
  { title: 'Wide Selection', desc: 'Rumah & apartemen terbaik di lokasi strategis.' },
  { title: 'Expert Support', desc: 'Tim siap bantu filter & negosiasi properti.' },
  { title: 'Easy Financing', desc: 'Ragam opsi KPR/financing yang dipersonalisasi.' },
];

const locations = [
  { name: 'New York', listings: '10k+ listings', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=80' },
  { name: 'LosAngeles', listings: '8.2k listings', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80' },
  { name: 'Chicago', listings: '6.4k listings', image: 'https://images.unsplash.com/photo-1529429617124-aee0bd51f4eb?auto=format&fit=crop&w=900&q=80' },
  { name: 'Miami', listings: '5.7k listings', image: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=900&q=80' },
];

const LandingPage = () => {
  const [apiStatus, setApiStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const apiBase = useMemo(() => import.meta.env.VITE_API_BASE || 'http://localhost:6543', []);

  useEffect(() => {
    const checkApi = async () => {
      try {
        const res = await fetch(`${apiBase}/api/properties`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setApiStatus('ok');
        setMessage('Backend reachable. Ready to build UI.');
      } catch (error) {
        setApiStatus('error');
        setMessage('Tidak bisa menghubungi backend. Pastikan Pyramid jalan di 6543 atau set VITE_API_BASE.');
      }
    };

    checkApi();
  }, [apiBase]);

  return (
    <>
      <Navbar apiBase={apiBase} />
      <main className="page landing">
        <Hero
          title="Find your"
          highlight="place to live."
          subtitle="Discover the perfect property with the best deals and locations. Start your journey in just a few clicks."
          ctaLabel="Search Properties"
          ctaHref="#properties"
          status={
            <div className="status status--pill">
              <span className={`dot ${apiStatus}`} />
              <span>
                {apiStatus === 'idle' && 'Mengecek backend...'}
                {apiStatus === 'ok' && 'Backend terhubung'}
                {apiStatus === 'error' && 'Backend tidak terhubung'}
              </span>
              {message && <span className="status-detail-inline">{message}</span>}
            </div>
          }
        />

        <section className="feature-section" id="features">
          <SectionHeader title="Featured Properties" actionLabel="View all" actionHref="#properties" />
          <p className="lede">
            Listing unggulan yang bisa langsung dihubungkan ke endpoint <code>/api/properties</code>.
          </p>
          <div className="property-grid">
            {sampleProperties.map((property, idx) => (
              <PropertyCard key={property.id} property={property} favorite={idx === 0} />
            ))}
          </div>
        </section>

        <section className="feature-section" id="why">
          <SectionHeader title="Why Choose Estatery" />
          <div className="feature-grid">
            {reasons.map((item) => (
              <article key={item.title} className="feature-card">
                <h3>{item.title}</h3>
                <p className="feature-card__desc">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="showcase" id="locations">
          <SectionHeader title="Browse by Location" actionLabel="View all" actionHref="#locations" />
          <div className="location-grid">
            {locations.map((loc) => (
              <article
                key={loc.name}
                className="location-card"
                style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.35)), url(${loc.image})` }}
                aria-label={loc.name}
              >
                <div className="location-card__title">{loc.name}</div>
                <div className="location-card__meta">{loc.listings}</div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;

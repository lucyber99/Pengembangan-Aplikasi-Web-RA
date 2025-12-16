import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PropertyCard from './components/PropertyCard';
import Hero from './components/Hero';
import SectionHeader from './components/SectionHeader';

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

const featureCards = [
  {
    title: 'Buyer experience',
    points: ['Browse & filter harga/tipe/lokasi', 'Simpan favorit', 'Kirim inquiry ke agent'],
  },
  {
    title: 'Agent cockpit',
    points: ['CRUD properti + foto', 'Kelola inquiries', 'Dashboard cepat'],
  },
  {
    title: 'Keamanan',
    points: ['Auth JWT', 'Role buyer/agent', 'Protected routes'],
  },
];

function App() {
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
        setMessage(
          'Tidak bisa menghubungi backend. Pastikan Pyramid jalan di 6543 atau set VITE_API_BASE.',
        );
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
          <div className="feature-grid">
            {featureCards.map((card) => (
              <article key={card.title} className="feature-card">
                <h3>{card.title}</h3>
                <ul>
                  {card.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="showcase" id="properties">
          <SectionHeader title="Browse by Location" actionLabel="View all" actionHref="#locations" />
          <p className="lede">
            Contoh data dummy sebelum disambungkan ke data nyata.
          </p>
          <div className="property-grid">
            {sampleProperties.map((property, idx) => (
              <PropertyCard key={property.id} property={property} favorite={idx === 0} />
            ))}
          </div>
        </section>

        <section className="workflow" id="dashboard">
          <div className="workflow__card">
            <h3>Untuk buyer</h3>
            <ol>
              <li>Register/login buyer</li>
              <li>Browse, search, filter properti</li>
              <li>Simpan favorit & kirim inquiry</li>
            </ol>
          </div>
          <div className="workflow__card">
            <h3>Untuk agent</h3>
            <ol>
              <li>Login agent</li>
              <li>Tambah/update/hapus listing + foto</li>
              <li>Kelola inquiries di dashboard</li>
            </ol>
          </div>
          <div className="workflow__card workflow__card--cta">
            <h3>Mulai bangun UI</h3>
            <p>Hook ke API Pyramid, tambahkan router, dan sambungkan state auth.</p>
            <div className="cta-row">
              <a className="btn primary" href="#features">
                Lihat fitur
              </a>
              <a className="btn ghost" href="#properties">
                Lihat listing
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;

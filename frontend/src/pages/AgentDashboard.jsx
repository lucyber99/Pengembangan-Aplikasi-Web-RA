import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, MessageSquareText, TrendingUp, Handshake, MoreVertical, Pencil, Trash2, Eye } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';
import { getDemoProperties } from '../utils/demoProperties';
import './AgentDashboard.css';

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

const formatPrice = (value) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value || 0);

const StatCard = ({ icon, value, label, delta }) => {
  return (
    <div className="agent-stat">
      <div className="agent-stat__top">
        <div className="agent-stat__icon">{icon}</div>
        <div className="agent-stat__delta">{delta}</div>
      </div>
      <div className="agent-stat__value">{value}</div>
      <div className="agent-stat__label">{label}</div>
    </div>
  );
};

const InquiryItem = ({ inquiry }) => {
  return (
    <div className="agent-inquiry">
      <div className="agent-inquiry__head">
        <div className="agent-inquiry__user">
          <span className="agent-inquiry__avatar" aria-hidden>
            {inquiry.name
              .split(' ')
              .slice(0, 2)
              .map((p) => p[0]?.toUpperCase())
              .join('')}
          </span>
          <div>
            <div className="agent-inquiry__name">{inquiry.name}</div>
            <div className="agent-inquiry__meta">{inquiry.email}</div>
          </div>
        </div>
        <div className="agent-inquiry__time">{inquiry.time}</div>
      </div>

      <div className="agent-inquiry__body">
        <div className="agent-inquiry__property">Property: {inquiry.propertyTitle}</div>
        <div className="agent-inquiry__message">{inquiry.message}</div>
      </div>

      <Button variant="primary" size="md" fullWidth to={`/properties/${inquiry.propertyId}`}>
        View Details
      </Button>
    </div>
  );
};

const AgentDashboard = () => {
  const apiBase = useMemo(() => import.meta.env.VITE_API_BASE || 'http://localhost:6543', []);
  const navigate = useNavigate();

  const [properties, setProperties] = useState(() =>
    (readStoredProperties() || getDemoProperties(8).slice(0, 6)).map((p, idx) => ({
      ...p,
      status: idx % 4 === 0 ? 'Draft' : 'Active',
      views: 120 + idx * 31,
      inquiries: 2 + (idx % 4),
    }))
  );

  useEffect(() => {
    writeStoredProperties(properties);
  }, [properties]);

  const inquiries = useMemo(
    () => [
      {
        id: 'inq-1',
        name: 'Sarah Mitchell',
        email: 'sarah.mitchell@email.com',
        propertyId: 1,
        propertyTitle: 'Modern Sunset Villa',
        time: '5m ago',
        message: "Hi! I'm interested in scheduling a viewing for this property. Is it available next week?",
      },
      {
        id: 'inq-2',
        name: 'Marcus Roberts',
        email: 'marcus.roberts@email.com',
        propertyId: 2,
        propertyTitle: 'Downtown Luxury Loft',
        time: '2h ago',
        message: 'Could you provide more details about the parking and maintenance fees?',
      },
      {
        id: 'inq-3',
        name: 'Emily Chen',
        email: 'emily.chen@email.com',
        propertyId: 3,
        propertyTitle: 'Oceanfront Paradise',
        time: '1d ago',
        message: "What's the nearest public transport like? The neighborhood looks great in the photos!",
      },
    ],
    []
  );

  const totals = useMemo(() => {
    const totalProperties = properties.length;
    const newInquiries = inquiries.length;
    const totalViews = properties.reduce((acc, p) => acc + (Number(p.views) || 0), 0);
    const activeDeals = properties.reduce((acc, p) => acc + (Number(p.inquiries) || 0), 0);

    return {
      totalProperties,
      newInquiries,
      totalViews,
      activeDeals,
    };
  }, [properties, inquiries.length]);

  const onDelete = (propertyId) => {
    const ok = window.confirm('Delete this property?');
    if (!ok) return;
    setProperties((prev) => prev.filter((p) => p.id !== propertyId));
  };

  return (
    <>
      <Navbar apiBase={apiBase} />
      <main className="agent-page">
        <header className="agent-hero">
          <div className="agent-hero__top">
            <div>
              <h1>Dashboard</h1>
              <p>Welcome back, John</p>
            </div>
            <button className="agent-hero__menu" type="button" aria-label="Menu">
              <MoreVertical size={18} />
            </button>
          </div>

          <div className="agent-stats">
            <StatCard icon={<Home size={18} />} value={totals.totalProperties} label="Total Properties" delta="+4" />
            <StatCard
              icon={<MessageSquareText size={18} />}
              value={totals.newInquiries}
              label="New Inquiries"
              delta="+12"
            />
            <StatCard icon={<TrendingUp size={18} />} value={totals.totalViews} label="Total Views" delta="This week" />
            <StatCard icon={<Handshake size={18} />} value={totals.activeDeals} label="Active Deals" delta="Pending" />
          </div>
        </header>

        <section className="agent-section">
          <div className="agent-section__head">
            <h2>My Properties</h2>
            <Button variant="primary" size="sm" to="/agent/properties/new">
              Add Property
            </Button>
          </div>

          <div className="agent-properties">
            {properties.map((p) => (
              <article key={p.id} className="agent-prop">
                <Link to={`/properties/${p.id}`} className="agent-prop__media" aria-label={p.title}>
                  <span className="agent-prop__badge">{p.status}</span>
                  <span className="agent-prop__img" style={{ backgroundImage: `url(${p.photoUrl})` }} aria-hidden />
                </Link>

                <div className="agent-prop__body">
                  <div className="agent-prop__price">{formatPrice(p.price)}</div>
                  <div className="agent-prop__title">{p.title}</div>
                  <div className="agent-prop__loc">{p.location}</div>

                  <div className="agent-prop__meta">
                    <span className="agent-prop__metaItem">
                      <Eye size={14} /> {p.views}
                    </span>
                    <span className="agent-prop__metaItem">
                      <MessageSquareText size={14} /> {p.inquiries}
                    </span>
                  </div>

                  <div className="agent-prop__actions">
                    <button type="button" className="agent-iconbtn" onClick={() => navigate(`/properties/${p.id}`)} aria-label="View">
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      className="agent-iconbtn"
                      onClick={() => navigate(`/agent/properties/${p.id}/edit`)}
                      aria-label="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button type="button" className="agent-iconbtn agent-iconbtn--danger" onClick={() => onDelete(p.id)} aria-label="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="agent-section">
          <div className="agent-section__head">
            <h2>Recent Inquiries</h2>
          </div>
          <div className="agent-inquiries">
            {inquiries.map((inq) => (
              <InquiryItem key={inq.id} inquiry={inq} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AgentDashboard;

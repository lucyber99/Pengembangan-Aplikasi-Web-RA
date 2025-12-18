import { useEffect, useMemo, useState } from 'react';
import { LayoutGrid, List, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilterSearch from '../components/FilterSearch';
import PropertyCard from '../components/PropertyCard';
import Pagination from '../components/Pagination';
import { getDemoProperties } from '../utils/demoProperties';
import './PropertyBrowse.css';

const normalizeProperty = (item, index) => {
  const id = item?.id ?? item?.property_id ?? index + 1;
  const price = Number(item?.price ?? item?.harga ?? 0) || 0;
  const beds = Number(item?.beds ?? item?.bedrooms ?? 0) || 0;
  const baths = Number(item?.baths ?? item?.bathrooms ?? 0) || 0;
  const area = Number(item?.area ?? item?.sqm ?? item?.size ?? 0) || 0;

  return {
    id,
    title: item?.title ?? item?.name ?? `Property #${id}`,
    location: item?.location ?? item?.address ?? 'Unknown location',
    type: item?.type ?? item?.property_type ?? 'Property',
    price,
    beds,
    baths,
    area,
    photoUrl: item?.photoUrl ?? item?.image_url ?? item?.photo_url,
  };
};

const applyFilters = (properties, filters) => {
  const nameQuery = (filters?.name ?? '').trim().toLowerCase();
  const minPrice = filters?.minPrice !== '' ? Number(filters?.minPrice) : null;
  const maxPrice = filters?.maxPrice !== '' ? Number(filters?.maxPrice) : null;
  const type = (filters?.type ?? '').trim();
  const location = (filters?.location ?? '').trim();

  return properties.filter((property) => {
    const matchesName = !nameQuery || property.title.toLowerCase().includes(nameQuery);
    const matchesType = !type || property.type === type;
    const matchesLocation = !location || property.location.toLowerCase().includes(location.toLowerCase());
    const matchesMin = minPrice == null || property.price >= minPrice;
    const matchesMax = maxPrice == null || property.price <= maxPrice;
    return matchesName && matchesType && matchesLocation && matchesMin && matchesMax;
  });
};

const sortProperties = (properties, sortKey) => {
  const list = [...properties];
  switch (sortKey) {
    case 'price_asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return list.sort((a, b) => b.price - a.price);
    case 'area_desc':
      return list.sort((a, b) => b.area - a.area);
    case 'beds_desc':
      return list.sort((a, b) => b.beds - a.beds);
    case 'newest':
    default:
      return list.sort((a, b) => Number(b.id) - Number(a.id));
  }
};

const PropertyBrowse = () => {
  const apiBase = useMemo(() => import.meta.env.VITE_API_BASE || 'http://localhost:6543', []);

  const [status, setStatus] = useState('idle'); // idle | loading | ok | error
  const [error, setError] = useState('');
  const [properties, setProperties] = useState([]);

  const [filters, setFilters] = useState({
    name: '',
    minPrice: '',
    maxPrice: '',
    type: '',
    location: '',
  });
  const [sortKey, setSortKey] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // grid | list
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setStatus('loading');
      setError('');
      try {
        const res = await fetch(`${apiBase}/api/properties`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const items = Array.isArray(data) ? data : data?.items ?? data?.results ?? [];
        if (!Array.isArray(items) || items.length === 0) {
          if (!isMounted) return;
          setError('Backend kosong. Menampilkan data contoh.');
          setProperties(getDemoProperties().map((item, idx) => normalizeProperty(item, idx)));
          setStatus('ok');
          return;
        }

        const demo = getDemoProperties(items.length);
        const normalized = items.map((item, idx) => normalizeProperty(item, idx)).map((p, idx) => {
          const fallbackPhoto =
            demo[idx]?.photoUrl || 'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1400&q=80';
          return { ...p, photoUrl: p.photoUrl || fallbackPhoto, id: p.id ?? idx + 1 };
        });
        if (!isMounted) return;
        setProperties(normalized);
        setStatus('ok');
      } catch (e) {
        if (!isMounted) return;
        setError('Tidak bisa menghubungi backend. Menampilkan data contoh.');
        setProperties(getDemoProperties().map((item, idx) => normalizeProperty(item, idx)));
        setStatus('error');
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [apiBase]);

  const filteredSorted = useMemo(() => {
    const filtered = applyFilters(properties, filters);
    return sortProperties(filtered, sortKey);
  }, [properties, filters, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSorted.slice(start, start + pageSize);
  }, [filteredSorted, currentPage]);

  useEffect(() => {
    setPage(1);
  }, [filters, sortKey]);

  return (
    <>
      <Navbar apiBase={apiBase} />
      <main className="browse-page">
        <div className="browse-layout">
          <aside className="browse-sidebar">
            <FilterSearch
              onFilter={(next) => {
                setFilters(next);
              }}
            />
          </aside>

          <section className="browse-main">
            <div className="browse-top">
              <div className="browse-heading">
                <h2 className="browse-title">Browse Properties</h2>
                <div className="browse-subtitle">
                  {status === 'loading' ? 'Loading…' : `${filteredSorted.length} result(s)`}
                  {error ? <span className="browse-error"> • {error}</span> : null}
                </div>
              </div>

              <div className="browse-controls">
                <label className="browse-sort" aria-label="Sort properties">
                  <ArrowUpDown size={16} />
                  <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
                    <option value="newest">Newest</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="area_desc">Area: Largest</option>
                    <option value="beds_desc">Bedrooms: Most</option>
                  </select>
                </label>

                <div className="browse-view" aria-label="View mode">
                  <button
                    type="button"
                    className={`browse-view__btn ${viewMode === 'grid' ? 'active' : ''}`.trim()}
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                    aria-pressed={viewMode === 'grid'}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button
                    type="button"
                    className={`browse-view__btn ${viewMode === 'list' ? 'active' : ''}`.trim()}
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                    aria-pressed={viewMode === 'list'}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className={`property-grid ${viewMode === 'list' ? 'property-grid--list' : ''}`.trim()}>
              {paged.map((property) => (
                <Link key={property.id} to={`/properties/${property.id}`} className="browse-cardlink">
                  <PropertyCard property={property} />
                </Link>
              ))}
            </div>

            <div className="browse-pagination">
              <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PropertyBrowse;

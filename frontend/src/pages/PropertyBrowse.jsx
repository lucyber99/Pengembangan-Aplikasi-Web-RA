import { useEffect, useMemo, useState } from 'react';
import { LayoutGrid, List, ArrowUpDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilterSearch from '../components/FilterSearch';
import PropertyCard from '../components/PropertyCard';
import Pagination from '../components/Pagination';
import './PropertyBrowse.css';

const FALLBACK_PHOTOS = [
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1519710887729-7fcbf9f39f95?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80',
];

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
    photoUrl: item?.photoUrl ?? item?.image_url ?? item?.photo_url ?? FALLBACK_PHOTOS[id % FALLBACK_PHOTOS.length],
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
        const normalized = items.map((item, idx) => normalizeProperty(item, idx));
        if (!isMounted) return;
        setProperties(normalized);
        setStatus('ok');
      } catch (e) {
        if (!isMounted) return;
        setError('Tidak bisa menghubungi backend. Menampilkan data contoh.');
        setProperties(
          Array.from({ length: 18 }).map((_, idx) =>
            normalizeProperty(
              {
                id: idx + 1,
                title: `Modern Sunset Villa ${idx + 1}`,
                location: ['Jakarta', 'Bali', 'Tangerang', 'Bandung'][idx % 4],
                price: 650000000 + idx * 125000000,
                type: idx % 2 === 0 ? 'House' : 'Apartment',
                beds: 1 + (idx % 5),
                baths: 1 + (idx % 3),
                area: 60 + (idx % 7) * 25,
              },
              idx
            )
          )
        );
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
                <PropertyCard key={property.id} property={property} />
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


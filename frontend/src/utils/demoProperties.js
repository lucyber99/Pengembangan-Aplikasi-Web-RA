export const DEMO_PHOTOS = [
  'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1465805139202-a644e217f00e?auto=format&fit=crop&w=1400&q=80',
];

const makeImages = (main) => {
  const others = DEMO_PHOTOS.filter((p) => p !== main);
  return [main, ...others].slice(0, 5);
};

export const DEMO_PROPERTIES = [
  {
    id: 1,
    title: 'Modern Sunset Villa',
    location: 'Jakarta',
    type: 'House',
    price: 850000000,
    beds: 4,
    baths: 3,
    area: 240,
    photoUrl: DEMO_PHOTOS[0],
    images: makeImages(DEMO_PHOTOS[0]),
    description:
      'A modern villa with warm sunset views, open living spaces, and premium finishes. Close to key amenities and designed for comfort.',
  },
  {
    id: 2,
    title: 'Downtown Luxury Loft',
    location: 'Tangerang',
    type: 'Apartment',
    price: 4200000000,
    beds: 2,
    baths: 2,
    area: 140,
    photoUrl: DEMO_PHOTOS[1],
    images: makeImages(DEMO_PHOTOS[1]),
    description: 'A spacious downtown loft with panoramic views, modern kitchen, and access to premium facilities.',
  },
  {
    id: 3,
    title: 'Oceanfront Paradise',
    location: 'Bali',
    type: 'House',
    price: 1250000000,
    beds: 4,
    baths: 4,
    area: 320,
    photoUrl: DEMO_PHOTOS[7],
    images: makeImages(DEMO_PHOTOS[7]),
    description: 'Steps from the ocean with serene outdoor spaces and bright interiors. Perfect for a getaway or investment.',
  },
];

export const getDemoProperties = (count = 18) => {
  const base = [...DEMO_PROPERTIES];
  const locations = ['Jakarta', 'Bali', 'Tangerang', 'Bandung'];
  const types = ['House', 'Apartment'];

  for (let idx = base.length; idx < count; idx += 1) {
    const id = idx + 1;
    const photoUrl = DEMO_PHOTOS[id % DEMO_PHOTOS.length];
    base.push({
      id,
      title: `Modern Family Home ${id}`,
      location: locations[idx % locations.length],
      type: types[idx % types.length],
      price: 650000000 + idx * 125000000,
      beds: 1 + (idx % 5),
      baths: 1 + (idx % 3),
      area: 60 + (idx % 7) * 25,
      photoUrl,
      images: makeImages(photoUrl),
      description:
        'A thoughtfully designed property with comfortable spaces and modern details. Great access to transport, schools, and shopping.',
    });
  }

  return base.slice(0, count);
};

export const getDemoPropertyById = (id) => getDemoProperties().find((p) => String(p.id) === String(id)) || null;


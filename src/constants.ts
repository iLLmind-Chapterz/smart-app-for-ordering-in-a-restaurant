import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'ov1',
    name: 'Wild-Caught Lobster Thermidor',
    description: 'Fresh Atlantic lobster tail in a rich, creamy cognac sauce, topped with Gruyère and a hint of tarragon.',
    price: 48,
    category: 'Food',
    tags: ['luxury', 'seafood', 'classic'],
    image: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80',
    pairingIds: ['d3', 'd4']
  },
  {
    id: 'ov2',
    name: 'Pacific Bluefin Tuna Crudo',
    description: 'Diced sashimi-grade tuna tossed with Meyer lemon and cold-pressed olive oil, served with avocado and house-made crisps.',
    price: 26,
    category: 'Food',
    tags: ['raw', 'seafood', 'elegant'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    pairingIds: ['d1']
  },
  {
    id: 'ov3',
    name: 'Crispy Mediterranean Sea Bass',
    description: 'Pan-seared sea bass with a blistered skin, served over roasted fennel and a saffron-lemon reduction.',
    price: 34,
    category: 'Food',
    tags: ['seafood', 'refined', 'keto'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    pairingIds: ['d3', 'd5']
  },
  {
    id: 'ov4',
    name: 'Charred Spanish Octopus',
    description: 'Wood-fired octopus tentacles with smoky paprika oil, fingerling potatoes, and house-made chimichurri.',
    price: 28,
    category: 'Food',
    tags: ['small-plate', 'seafood', 'smoky'],
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    pairingIds: ['d2']
  },
  {
    id: 'ov5',
    name: 'Artisanal Oyster Platter',
    description: 'Half-dozen hand-shucked boutique oysters with mignonette and fresh-grated horseradish.',
    price: 24,
    category: 'Food',
    tags: ['raw', 'seafood', 'appetizer'],
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80',
    pairingIds: ['d4']
  },
  {
    id: 'ov6',
    name: 'Coastal Crab Cakes',
    description: 'Maryland-style jumbo lump crab cakes with a delicate breading and zesty remoulade sauce.',
    price: 22,
    category: 'Food',
    tags: ['seafood', 'comfort', 'appetizer'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    pairingIds: ['d5']
  },
  {
    id: 'ov7',
    name: 'Black Pearl Caviar Service',
    description: 'Boutique Oscietra caviar served in a chilled oyster shell, accompanied by artisanal crostini and fresh Meyer lemon.',
    price: 95,
    category: 'Food',
    tags: ['ultra-luxe', 'seafood', 'exclusive'],
    image: 'https://images.unsplash.com/photo-1544648356-82087eb49a88?auto=format&fit=crop&w=800&q=80',
    pairingIds: ['d4']
  },
  {
    id: 'ov8',
    name: 'Pan-Roasted Sea Scallops',
    description: 'Hokkaido scallops with a caramelized crust, served on a bed of sweet corn purée and crispy pancetta.',
    price: 38,
    category: 'Food',
    tags: ['seafood', 'elegant', 'savory'],
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=800&q=80',
    pairingIds: ['d3']
  },
  {
    id: 'd1',
    name: 'Ocean Mist Gin & Tonic',
    description: 'Empress 1908 gin, elderflower tonic, and a sprig of fresh sea-lavender.',
    price: 16,
    category: 'Drink',
    tags: ['cocktail', 'botanical', 'refreshing'],
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'd2',
    name: 'Deep Sea Negroni',
    description: 'Coastal gin, infused vermouth, and a salty grapefruit twist.',
    price: 18,
    category: 'Drink',
    tags: ['cocktail', 'bitter', 'spirit-forward'],
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'd3',
    name: 'Seaside Sauvignon' ,
    description: 'A crisp, mineral-forward white wine with notes of sea salt and lemon zest.',
    price: 14,
    category: 'Drink',
    tags: ['wine', 'white', 'crisp'],
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'd4',
    name: 'Sparkling Shore',
    description: 'A vibrant turquoise cocktail with citrus notes and a hint of blue curacao, reflecting the crystal waters of the shore.',
    price: 18,
    category: 'Drink',
    tags: ['cocktail', 'tropical', 'vibrant'],
    image: 'https://images.unsplash.com/photo-1574033282207-60317e651586?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'd5',
    name: 'Coastal Craft Lager',
    description: 'A light, crisp lager brewed with premium sea minerals for a clean finish.',
    price: 9,
    category: 'Drink',
    tags: ['beer', 'refreshing', 'local'],
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'de1',
    name: 'Sea Salt Caramel Tart',
    description: 'Rich dark chocolate ganache, buttery crust, and a liberal dusting of Maldon sea salt.',
    price: 14,
    category: 'Dessert',
    tags: ['sweet', 'dessert', 'decadent'],
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'de2',
    name: 'Meyer Lemon Sorbet',
    description: 'Artisanal cold-pressed lemon sorbet served in a frozen lemon shell with fresh mint.',
    price: 12,
    category: 'Dessert',
    tags: ['refreshing', 'vegan', 'light'],
    image: 'https://images.unsplash.com/photo-1570197571499-166b36435e9f?auto=format&fit=crop&w=800&q=80'
  }
];

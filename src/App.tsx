import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FilterPanel, FilterState } from './components/FilterPanel';
import { ProductCard } from './components/ProductCard';
import { SortingControls } from './components/SortingControls';
import { MobileFilterSheet } from './components/MobileFilterSheet';
import { ChevronRight } from 'lucide-react';

interface Product {
  id: string;
  image: string;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  size: string[];
  color: string[];
  shipping: string[];
}

const products: Product[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1630948688037-aa88dc433a57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBwcm9kdWN0fGVufDF8fHx8MTc2MzIzMDUwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    brand: 'Nike',
    name: 'Premium Cotton T-Shirt - Classic Fit',
    price: 2499,
    originalPrice: 3999,
    rating: 4.5,
    reviews: 128,
    category: 'Men\'s Fashion',
    size: ['S', 'M', 'L', 'XL'],
    color: ['Black', 'White'],
    shipping: ['Cash on Delivery', 'Free Delivery'],
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1622760807301-4d2351a5a942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHNob2VzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjMyMTc2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    brand: 'Adidas',
    name: 'Running Sneakers - Lightweight & Breathable',
    price: 5499,
    originalPrice: 7999,
    rating: 4.8,
    reviews: 342,
    category: 'Sports & Outdoors',
    size: ['M', 'L', 'XL'],
    color: ['Blue', 'White'],
    shipping: ['Free Delivery', 'Express Shipping'],
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1658910452951-68bd93e558ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRjaCUyMGFjY2Vzc29yaWVzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjMyMDA5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    brand: 'Champion',
    name: 'Analog Watch - Water Resistant',
    price: 3299,
    rating: 4.3,
    reviews: 89,
    category: 'Watches & Accessories',
    size: ['M', 'L'],
    color: ['Black', 'Blue'],
    shipping: ['Cash on Delivery'],
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1579718067654-cda6d61706e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMGJhZyUyMHByb2R1Y3R8ZW58MXx8fHwxNzYzMTQ1MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    brand: 'Puma',
    name: 'Travel Backpack - 25L Capacity',
    price: 4199,
    originalPrice: 5999,
    rating: 4.6,
    reviews: 156,
    category: 'Sports & Outdoors',
    size: ['L', 'XL'],
    color: ['Black', 'Green'],
    shipping: ['Cash on Delivery', 'Free Delivery', 'Express Shipping'],
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1638109556691-2e36b5e0f39e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzYzMTc0Nzg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    brand: 'Reebok',
    name: 'Polarized Sunglasses - UV Protection',
    price: 1899,
    originalPrice: 2999,
    rating: 4.4,
    reviews: 234,
    category: 'Watches & Accessories',
    size: ['M'],
    color: ['Black', 'Blue'],
    shipping: ['Cash on Delivery', 'Free Delivery'],
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1693443687750-611ad77f3aba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0c2hpcnQlMjBjbG90aGluZ3xlbnwxfHx8fDE3NjMyMjM2MTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    brand: 'Under Armour',
    name: 'Performance T-Shirt - Moisture Wicking',
    price: 2799,
    rating: 4.7,
    reviews: 198,
    category: 'Men\'s Fashion',
    size: ['S', 'M', 'L', 'XL', 'XXL'],
    color: ['White', 'Blue', 'Black'],
    shipping: ['Free Delivery', 'Express Shipping'],
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1706765779494-2705542ebe74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWNrZXQlMjBmYXNoaW9ufGVufDF8fHx8MTc2MzIxMDk1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    brand: 'Nike',
    name: 'Winter Jacket - Waterproof & Warm',
    price: 6999,
    originalPrice: 9999,
    rating: 4.9,
    reviews: 412,
    category: 'Men\'s Fashion',
    size: ['M', 'L', 'XL', 'XXL'],
    color: ['Black', 'Blue', 'Green'],
    shipping: ['Cash on Delivery', 'Free Delivery'],
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZWFucyUyMGRlbmltfGVufDF8fHx8MTc2MzEyNjY3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    brand: 'Converse',
    name: 'Slim Fit Jeans - Stretchable Denim',
    price: 3499,
    originalPrice: 4999,
    rating: 4.2,
    reviews: 276,
    category: 'Men\'s Fashion',
    size: ['M', 'L', 'XL'],
    color: ['Blue', 'Black'],
    shipping: ['Cash on Delivery', 'Free Delivery', 'Express Shipping'],
  },
  {
    id: '9',
    image: 'https://images.unsplash.com/photo-1630948688037-aa88dc433a57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBwcm9kdWN0fGVufDF8fHx8MTc2MzIzMDUwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    brand: 'Vans',
    name: 'Graphic T-Shirt - Limited Edition',
    price: 2199,
    rating: 4.1,
    reviews: 89,
    category: 'Men\'s Fashion',
    size: ['S', 'M', 'L'],
    color: ['White', 'Yellow'],
    shipping: ['Cash on Delivery'],
  },
  {
    id: '10',
    image: 'https://images.unsplash.com/photo-1622760807301-4d2351a5a942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHNob2VzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjMyMTc2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    brand: 'New Balance',
    name: 'Training Shoes - High Performance',
    price: 6499,
    rating: 4.7,
    reviews: 301,
    category: 'Sports & Outdoors',
    size: ['M', 'L', 'XL', 'XXL'],
    color: ['Red', 'Black'],
    shipping: ['Free Delivery', 'Express Shipping'],
  },
  {
    id: '11',
    image: 'https://images.unsplash.com/photo-1658910452951-68bd93e558ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRjaCUyMGFjY2Vzc29yaWVzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjMyMDA5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    brand: 'Fila',
    name: 'Smart Watch - Fitness Tracker',
    price: 4899,
    originalPrice: 6999,
    rating: 4.5,
    reviews: 167,
    category: 'Electronics',
    size: ['M', 'L'],
    color: ['Black', 'Pink'],
    shipping: ['Cash on Delivery', 'Free Delivery'],
  },
  {
    id: '12',
    image: 'https://images.unsplash.com/photo-1579718067654-cda6d61706e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMGJhZyUyMHByb2R1Y3R8ZW58MXx8fHwxNzYzMTQ1MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    brand: 'Adidas',
    name: 'Gym Bag - Spacious & Durable',
    price: 3799,
    rating: 4.4,
    reviews: 124,
    category: 'Sports & Outdoors',
    size: ['L', 'XL'],
    color: ['Black', 'Red'],
    shipping: ['Cash on Delivery', 'Free Delivery', 'Express Shipping'],
  },
];

const initialFilters: FilterState = {
  categories: [],
  brands: [],
  priceRange: [0, 10000],
  sizes: [],
  colors: [],
  rating: null,
  shipping: [],
};

export default function App() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }

    // Brand filter
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }

    // Price filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }

    // Size filter
    if (filters.sizes.length > 0 && !filters.sizes.some(size => product.size.includes(size))) {
      return false;
    }

    // Color filter
    if (filters.colors.length > 0 && !filters.colors.some(color => product.color.includes(color))) {
      return false;
    }

    // Rating filter
    if (filters.rating && product.rating < filters.rating) {
      return false;
    }

    // Shipping filter
    if (filters.shipping.length > 0 && !filters.shipping.some(ship => product.shipping.includes(ship))) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id.localeCompare(a.id);
      default:
        return 0;
    }
  });

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <span className="hover:text-orange-600 cursor-pointer">Home</span>
          <ChevronRight className="w-4 h-4" />
          <span className="hover:text-orange-600 cursor-pointer">Shop</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">All Products</span>
        </div>

        {/* Main Layout */}
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          {!isMobile && (
            <aside className="w-[280px] flex-shrink-0">
              <div className="sticky top-24">
                <FilterPanel
                  filters={filters}
                  onFilterChange={setFilters}
                  onReset={handleResetFilters}
                />
              </div>
            </aside>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Sorting Controls */}
            <SortingControls
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalResults={sortedProducts.length}
              onMobileFilterClick={() => setIsMobileFilterOpen(true)}
              isMobile={isMobile}
            />

            {/* Products Grid */}
            <div
              className={`mt-6 grid gap-4 md:gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                  : 'grid-cols-1'
              }`}
            >
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Empty State */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-24 h-24 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                    />
                  </svg>
                </div>
                <h3 className="text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to find what you're looking for
                </p>
                <button
                  onClick={handleResetFilters}
                  className="text-orange-600 hover:text-orange-700"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filter Sheet */}
      <MobileFilterSheet
        open={isMobileFilterOpen}
        onOpenChange={setIsMobileFilterOpen}
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleResetFilters}
        onApply={() => setIsMobileFilterOpen(false)}
      />
    </div>
  );
}

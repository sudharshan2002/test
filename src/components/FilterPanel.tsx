import { useState } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

export interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  rating: number | null;
  shipping: string[];
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

const categories = [
  'Men\'s Fashion',
  'Women\'s Fashion',
  'Electronics',
  'Home & Living',
  'Sports & Outdoors',
  'Health & Beauty',
  'Watches & Accessories',
  'Kids & Baby',
];

const brands = [
  'Nike',
  'Adidas',
  'Puma',
  'Reebok',
  'Under Armour',
  'New Balance',
  'Converse',
  'Vans',
  'Fila',
  'Champion',
];

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const colors = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Red', hex: '#EF4444' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Green', hex: '#10B981' },
  { name: 'Yellow', hex: '#F59E0B' },
  { name: 'Purple', hex: '#8B5CF6' },
  { name: 'Pink', hex: '#EC4899' },
];

const shippingOptions = [
  'Cash on Delivery',
  'Free Delivery',
  'Express Shipping',
];

export function FilterPanel({ filters, onFilterChange, onReset }: FilterPanelProps) {
  const [brandSearch, setBrandSearch] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const filteredBrands = brands.filter(brand =>
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const displayCategories = showAllCategories ? categories : categories.slice(0, 5);
  const displayBrands = showAllBrands ? filteredBrands : filteredBrands.slice(0, 5);

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: newSizes });
  };

  const handleColorToggle = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    onFilterChange({ ...filters, colors: newColors });
  };

  const handleShippingToggle = (option: string) => {
    const newShipping = filters.shipping.includes(option)
      ? filters.shipping.filter(s => s !== option)
      : [...filters.shipping, option];
    onFilterChange({ ...filters, shipping: newShipping });
  };

  const activeFilterCount = 
    filters.categories.length +
    filters.brands.length +
    filters.sizes.length +
    filters.colors.length +
    filters.shipping.length +
    (filters.rating ? 1 : 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2>Filters</h2>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
        >
          Reset All
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-280px)]">
        <Accordion type="multiple" defaultValue={['category', 'brand', 'price', 'size', 'color', 'rating', 'shipping']} className="w-full">
          {/* Categories */}
          <AccordionItem value="category" className="border-b border-gray-200 px-4">
            <AccordionTrigger className="hover:no-underline py-4">
              <span>Categories</span>
            </AccordionTrigger>
            <AccordionContent className="pb-4 space-y-3">
              {displayCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <Label
                    htmlFor={`cat-${category}`}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
              {categories.length > 5 && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="text-orange-600 p-0 h-auto"
                >
                  {showAllCategories ? 'Show less' : `See all categories (${categories.length})`}
                </Button>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Brands */}
          <AccordionItem value="brand" className="border-b border-gray-200 px-4">
            <AccordionTrigger className="hover:no-underline py-4">
              <span>Brand</span>
            </AccordionTrigger>
            <AccordionContent className="pb-4 space-y-3">
              {/* Brand Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search brands..."
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="pl-9 py-2 text-sm"
                />
              </div>

              {displayBrands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={() => handleBrandToggle(brand)}
                  />
                  <Label
                    htmlFor={`brand-${brand}`}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {brand}
                  </Label>
                </div>
              ))}
              {filteredBrands.length > 5 && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setShowAllBrands(!showAllBrands)}
                  className="text-orange-600 p-0 h-auto"
                >
                  {showAllBrands ? 'Show less' : `See more (${filteredBrands.length - 5})`}
                </Button>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Price Range */}
          <AccordionItem value="price" className="border-b border-gray-200 px-4">
            <AccordionTrigger className="hover:no-underline py-4">
              <span>Price Range</span>
            </AccordionTrigger>
            <AccordionContent className="pb-4 space-y-4">
              <Slider
                min={0}
                max={10000}
                step={100}
                value={filters.priceRange}
                onValueChange={(value) => onFilterChange({ ...filters, priceRange: value as [number, number] })}
                className="w-full"
              />
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Label htmlFor="min-price" className="text-xs text-gray-600">Min</Label>
                  <Input
                    id="min-price"
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={(e) => onFilterChange({ ...filters, priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]] })}
                    className="mt-1"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="max-price" className="text-xs text-gray-600">Max</Label>
                  <Input
                    id="max-price"
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={(e) => onFilterChange({ ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value) || 10000] })}
                    className="mt-1"
                  />
                </div>
              </div>
              
              {/* Preset Price Chips */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFilterChange({ ...filters, priceRange: [0, 1500] })}
                  className="text-sm"
                >
                  Under 1500
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFilterChange({ ...filters, priceRange: [1500, 3000] })}
                  className="text-sm"
                >
                  1500-3000
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFilterChange({ ...filters, priceRange: [3000, 10000] })}
                  className="text-sm"
                >
                  3000+
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Size */}
          <AccordionItem value="size" className="border-b border-gray-200 px-4">
            <AccordionTrigger className="hover:no-underline py-4">
              <span>Size</span>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={filters.sizes.includes(size) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleSizeToggle(size)}
                    className={`min-w-[56px] ${filters.sizes.includes(size) ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Color */}
          <AccordionItem value="color" className="border-b border-gray-200 px-4">
            <AccordionTrigger className="hover:no-underline py-4">
              <span>Color</span>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="grid grid-cols-4 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorToggle(color.name)}
                    className="flex flex-col items-center gap-1 group"
                    title={color.name}
                  >
                    <div
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        filters.colors.includes(color.name)
                          ? 'border-orange-600 scale-110'
                          : 'border-gray-300 group-hover:border-gray-400'
                      } ${color.hex === '#FFFFFF' ? 'shadow-sm' : ''}`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {filters.colors.includes(color.name) && (
                        <div className="w-full h-full rounded-full flex items-center justify-center">
                          <div className={`w-2 h-2 rounded-full ${color.hex === '#FFFFFF' || color.hex === '#F59E0B' ? 'bg-orange-600' : 'bg-white'}`} />
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-600">{color.name}</span>
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Rating */}
          <AccordionItem value="rating" className="border-b border-gray-200 px-4">
            <AccordionTrigger className="hover:no-underline py-4">
              <span>Rating</span>
            </AccordionTrigger>
            <AccordionContent className="pb-4 space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => onFilterChange({ ...filters, rating: filters.rating === rating ? null : rating })}
                  className={`w-full flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    filters.rating === rating ? 'bg-orange-50 border border-orange-200' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-700">& above</span>
                </button>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Shipping */}
          <AccordionItem value="shipping" className="px-4">
            <AccordionTrigger className="hover:no-underline py-4">
              <span>Shipping Options</span>
            </AccordionTrigger>
            <AccordionContent className="pb-4 space-y-3">
              {shippingOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`shipping-${option}`}
                    checked={filters.shipping.includes(option)}
                    onCheckedChange={() => handleShippingToggle(option)}
                  />
                  <Label
                    htmlFor={`shipping-${option}`}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </div>
  );
}

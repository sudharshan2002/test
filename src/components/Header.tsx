import { Search, ShoppingCart, User, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Header() {
  return (
    <header className="bg-orange-600 border-b border-orange-700 sticky top-0 z-50 shadow-md">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-white tracking-tight">SHOP</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for products, brands and more..."
                className="pl-10 pr-4 py-6 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 w-full bg-white"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="relative hover:bg-orange-700">
              <Heart className="w-5 h-5 text-white" />
            </Button>
            <Button variant="ghost" size="icon" className="relative hover:bg-orange-700">
              <ShoppingCart className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-orange-700">
              <User className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

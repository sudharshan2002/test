import { Grid3x3, List, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface SortingControlsProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalResults: number;
  onMobileFilterClick?: () => void;
  isMobile?: boolean;
}

export function SortingControls({
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  totalResults,
  onMobileFilterClick,
  isMobile = false,
}: SortingControlsProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="text-gray-600 text-sm">
          <span className="hidden sm:inline">{totalResults} Products Found</span>
          <span className="sm:hidden">{totalResults} Results</span>
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Mobile Filter Button */}
        {isMobile && (
          <Button
            variant="outline"
            size="sm"
            onClick={onMobileFilterClick}
            className="gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </Button>
        )}

        {/* Sort By */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 hidden md:inline">Sort by:</span>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[160px] md:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View Toggle - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-1 border border-gray-200 rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            onClick={() => onViewModeChange('grid')}
          >
            <Grid3x3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            onClick={() => onViewModeChange('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

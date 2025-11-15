import { X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { FilterPanel, FilterState } from './FilterPanel';

interface MobileFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  onApply: () => void;
}

export function MobileFilterSheet({
  open,
  onOpenChange,
  filters,
  onFilterChange,
  onReset,
  onApply,
}: MobileFilterSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-3xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <SheetTitle>Filters</SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* Filter Content */}
          <div className="flex-1 overflow-hidden">
            <FilterPanel
              filters={filters}
              onFilterChange={onFilterChange}
              onReset={onReset}
            />
          </div>

          {/* Sticky Footer */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onReset}
                className="flex-1"
              >
                Reset
              </Button>
              <Button
                onClick={() => {
                  onApply();
                  onOpenChange(false);
                }}
                className="flex-1 bg-orange-600 hover:bg-orange-700"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

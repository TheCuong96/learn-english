'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { VERB_CATEGORIES } from '@/utils/verb-categories';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState } from 'react';

interface CategorySelectorProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

export default function CategorySelector({ selectedCategories, onCategoriesChange }: CategorySelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoriesChange(selectedCategories.filter(id => id !== categoryId));
    } else {
      onCategoriesChange([...selectedCategories, categoryId]);
    }
  };

  const handleSelectAll = () => {
    onCategoriesChange(VERB_CATEGORIES.map(c => c.id));
  };

  const handleDeselectAll = () => {
    onCategoriesChange([]);
  };

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          🎯 Chọn chủ đề 
          <Badge variant="secondary" className="ml-2">
            {selectedCategories.length}/{VERB_CATEGORIES.length}
          </Badge>
        </h3>
        <div className="flex gap-2">
          <Button
            onClick={handleSelectAll}
            variant="outline"
            size="sm"
            className="h-8 text-xs"
          >
            ✓ Chọn tất cả
          </Button>
          <Button
            onClick={handleDeselectAll}
            variant="outline"
            size="sm"
            className="h-8 text-xs"
          >
            ✗ Bỏ chọn
          </Button>
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="ghost"
            size="sm"
            className="h-8"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Thu gọn
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Mở rộng
              </>
            )}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
          {VERB_CATEGORIES.map((category) => (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all hover:scale-105 ${
                selectedCategories.includes(category.id)
                  ? 'ring-2 ring-primary shadow-lg'
                  : 'hover:border-primary/50'
              }`}
              onClick={() => handleToggle(category.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <span className="text-2xl">{category.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">
                      {category.nameVi}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {category.name}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isExpanded && (
        <div className="flex flex-wrap gap-2">
          {selectedCategories.length === 0 ? (
            <Badge variant="secondary" className="text-xs">
              Chưa chọn chủ đề nào (sẽ dùng tất cả)
            </Badge>
          ) : (
            selectedCategories.map((catId) => {
              const category = VERB_CATEGORIES.find(c => c.id === catId);
              if (!category) return null;
              return (
                <Badge
                  key={catId}
                  variant="default"
                  className="gap-1 cursor-pointer hover:opacity-80"
                >
                  <span>{category.icon}</span>
                  <span>{category.nameVi}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle(catId);
                    }}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}


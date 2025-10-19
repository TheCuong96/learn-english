'use client';

import { VERB_CATEGORIES } from '@/utils/verb-categories';
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
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-slate-200">
          🎯 Chọn chủ đề ({selectedCategories.length}/{VERB_CATEGORIES.length})
        </h3>
        <div className="flex gap-2 mb-3">
            <button
              onClick={handleSelectAll}
              className="px-3 py-1 text-xs bg-green-600/20 text-green-400 border border-green-500/50 rounded hover:bg-green-600/30"
            >
              ✓ Chọn tất cả
            </button>
            <button
              onClick={handleDeselectAll}
              className="px-3 py-1 text-xs bg-red-600/20 text-red-400 border border-red-500/50 rounded hover:bg-red-600/30"
            >
              ✗ Bỏ chọn tất cả
            </button>
          </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-purple-400 hover:text-purple-300 transition-all"
        >
          {isExpanded ? '▲ Thu gọn' : '▼ Mở rộng'}
        </button>
      </div>

      {isExpanded && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 flex-1 overflow-y-auto max-h-96 pr-2 custom-scrollbar">
            {VERB_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => handleToggle(category.id)}
                className={`
                  p-3 rounded-lg border-2 text-left transition-all transform hover:scale-102
                  ${selectedCategories.includes(category.id)
                    ? 'bg-purple-600/30 border-purple-500 ring-2 ring-purple-400/50 shadow-lg shadow-purple-500/20'
                    : 'bg-slate-700/40 border-slate-600 hover:bg-slate-700/60 hover:border-purple-500/30 hover:shadow-md'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{category.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-200 break-words whitespace-normal">
                      {category.nameVi}
                    </div>
                    <div className="text-xs text-slate-400 break-words whitespace-normal">
                      {category.name}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {!isExpanded && (
        <div className="flex flex-wrap gap-2 flex-1">
          {selectedCategories.length === 0 ? (
            <span className="text-sm text-slate-400 italic">Chưa chọn chủ đề nào (sẽ dùng tất cả)</span>
          ) : (
            selectedCategories.map((catId) => {
              const category = VERB_CATEGORIES.find(c => c.id === catId);
              if (!category) return null;
              return (
                <span
                  key={catId}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-purple-600/30 border border-purple-500/50 rounded text-xs text-purple-300"
                >
                  {category.icon} {category.nameVi}
                  <button
                    onClick={() => handleToggle(catId)}
                    className="ml-1 hover:text-red-400"
                  >
                    ✕
                  </button>
                </span>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}


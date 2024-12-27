import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import type { Category } from '../types';

interface NavDropdownProps {
  categories: Category[];
}

export function NavDropdown({ categories }: NavDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-gray-300 hover:text-white"
      >
        <span>More</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div 
          className="absolute left-0 mt-2 w-48 rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5"
          onMouseLeave={() => setIsOpen(false)}
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.name}`}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import type { Category } from '../types';

interface MobileMenuProps {
  categories: Category[];
  isAdmin: boolean;
}

export function MobileMenu({ categories, isAdmin }: MobileMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
      setIsOpen(false);
      setSearch('');
    }
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-300 hover:text-white"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-16 bg-gray-800 px-4 py-2 shadow-lg">
          <form onSubmit={handleSearch} className="relative mb-4 mt-2">
            <input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full bg-gray-700 px-4 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </form>

          <Link
            to="/"
            className="block py-2 text-gray-300 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="block py-2 text-gray-300 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Movies
          </Link>
          <Link
            to="/series"
            className="block py-2 text-gray-300 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Series
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.name.toLowerCase()}`}
              className="block py-2 text-gray-300 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {category.name}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className="block py-2 text-red-500 hover:text-red-400"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

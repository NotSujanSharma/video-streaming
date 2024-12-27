import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, LogOut, LogIn } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AuthContext } from '../contexts/AuthContext';
import { NavDropdown } from './NavDropdown';
import { MobileMenu } from './MobileMenu';
import type { Category } from '../types';
import favicon from '../../favicon.png';

const MAIN_CATEGORIES = ['Movies', 'Series'];

export function Navbar() {
  const { session, loading, profile } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (data) {
        setCategories(data.filter(cat => 
          !MAIN_CATEGORIES.includes(cat.name)
        ));
      }
    }
    fetchCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
      setSearch('');
    }
  };

  if (loading) {
    return (
      <nav className="fixed top-0 z-50 w-full bg-black bg-opacity-90 px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 z-50 w-full bg-black bg-opacity-90 px-4 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <img src={favicon} className="h-8 w-8 text-red-600" alt="logo" />
            <span className="text-2xl font-bold text-white hidden md:inline">Surge</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
            <Link to="/movies" className="text-gray-300 hover:text-white">Movies</Link>
            <Link to="/series" className="text-gray-300 hover:text-white">Series</Link>
            <NavDropdown categories={categories} />
            {profile?.is_admin && (
              <Link to="/admin" className="text-red-500 hover:text-red-400">Admin</Link>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 rounded-full bg-gray-800 px-4 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </form>

          {session ? (
            <button
              onClick={() => supabase.auth.signOut()}
              className="hidden sm:flex items-center space-x-2 text-gray-300 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          ) : (
            <Link 
              to="/login" 
              className="hidden sm:flex items-center space-x-2 text-gray-300 hover:text-white"
            >
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Link>
          )}

          <MobileMenu 
            categories={categories} 
            isAdmin={profile?.is_admin || false} 
          />
        </div>
      </div>
    </nav>
  );
}

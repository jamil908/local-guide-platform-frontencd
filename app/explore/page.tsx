/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @next/next/no-img-element */


/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
// Assuming '@/lib/api' and '@/types' are correctly defined
import api from '@/lib/api'; 
import { Listing } from '@/types';
import { FiStar, FiClock, FiDollarSign, FiMapPin, FiFilter, FiX } from 'react-icons/fi';
// Assuming '@/components/shared/Loading' is correctly defined
import { LoadingSpinner } from '@/components/shared/Loading'; 
// Assuming '@/lib/utils' is correctly defined
import { formatCurrency } from '@/lib/utils'; 
// Assuming '@/components/ui/Button' and '@/components/ui/Input' are correctly defined
import Button from '@/components/ui/Button'; 
import Input from '@/components/ui/Input';

// --- CUSTOM BUTTON COMPONENTS FOR DARK THEME (Copied from previous file for styling consistency) ---
const AmberButton = ({ children, onClick, className, size, type, variant, ...props }: any) => {
  const baseStyle = "font-bold transition duration-200 ease-in-out rounded-full";
  const sizeStyle = size === 'lg' ? 'px-8 py-3 text-lg' : size === 'sm' ? 'px-4 py-1.5 text-sm' : 'px-6 py-2 text-base';
  
  let colorStyle = "";
  if (variant === 'outline') {
    colorStyle = "border-2 border-amber-600 text-amber-400 hover:bg-amber-600/10";
  } else if (variant === 'secondary') {
    colorStyle = "bg-gray-700 text-gray-200 hover:bg-gray-600";
  } else {
    colorStyle = "bg-amber-500 text-gray-900 hover:bg-amber-400 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50";
  }

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseStyle} ${sizeStyle} ${colorStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
// --------------------------------------------------------------------------------------------------


export default function ExplorePage() {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  });

  useEffect(() => {
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // Re-fetch when URL changes (e.g., from homepage search)

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/listings', { params: filters });
      setListings(response.data.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    fetchListings();
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({ city: '', category: '', minPrice: '', maxPrice: '' });
    // Re-fetch listings after state update
    setTimeout(fetchListings, 0); 
    setShowFilters(false);
  };

  if (loading) {
    // Ensuring Loading Spinner adapts to dark background
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <LoadingSpinner size="lg" color="text-amber-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      
      {/* Header (Black/Dark Background) */}
      <div className="bg-black text-white py-12 border-b border-amber-500/50">
        <div className="container-custom">
          <h1 className="text-4xl font-extrabold mb-2 text-amber-400">Explore Tours</h1>
          <p className="text-gray-400">
            Discover **{listings.length}** amazing experiences with local experts
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters - Desktop (Dark Card) */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-gray-800 rounded-xl shadow-xl p-6 sticky top-24 border border-gray-700">
              <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-4">
                <h3 className="text-2xl font-bold text-white">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-amber-500 hover:text-amber-400 transition"
                >
                  Clear all
                </button>
              </div>

              <div className="space-y-6">
                {/* Input components need to be styled for dark mode if they are basic HTML inputs */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">City</label>
                    <Input // Assuming Input component is styled to handle dark mode or takes classes
                      name="city"
                      type="text"
                      placeholder="e.g., Paris, Tokyo"
                      value={filters.city}
                      onChange={handleFilterChange}
                      className="w-full bg-gray-700 text-white border-gray-600 focus:ring-amber-500 placeholder-gray-500"
                    />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2.5 border border-gray-600 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                  >
                    <option value="" className="bg-gray-900">All Categories</option>
                    <option value="Food & Culinary" className="bg-gray-900">Food & Culinary</option>
                    <option value="Photography" className="bg-gray-900">Photography</option>
                    <option value="History & Culture" className="bg-gray-900">History & Culture</option>
                    <option value="Adventure" className="bg-gray-900">Adventure</option>
                    <option value="Wine & Food" className="bg-gray-900">Wine & Food</option>
                    <option value="Art & Design" className="bg-gray-900">Art & Design</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Min Price Input */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Min Price</label>
                    <Input
                      name="minPrice"
                      type="number"
                      placeholder="$0"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="w-full bg-gray-700 text-white border-gray-600 focus:ring-amber-500 placeholder-gray-500"
                    />
                  </div>
                  {/* Max Price Input */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Max Price</label>
                    <Input
                      name="maxPrice"
                      type="number"
                      placeholder="$500"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="w-full bg-gray-700 text-white border-gray-600 focus:ring-amber-500 placeholder-gray-500"
                    />
                  </div>
                </div>

                <AmberButton
                  onClick={applyFilters}
                  className="w-full"
                >
                  Apply Filters
                </AmberButton>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <AmberButton
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full mb-4"
            >
              <FiFilter className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </AmberButton>

            {/* Mobile Filters Modal */}
            {showFilters && (
              <div className="fixed inset-0 z-50 bg-black/80 flex justify-end">
                <div className="w-full max-w-sm bg-gray-800 h-full p-6 shadow-2xl overflow-y-auto">
                  
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-700">
                    <h3 className="text-2xl font-bold text-white">Filter Options</h3>
                    <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-amber-500">
                      <FiX size={24} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* City Input */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-300">City</label>
                        <Input 
                            name="city"
                            type="text"
                            placeholder="e.g., Paris"
                            value={filters.city}
                            onChange={handleFilterChange}
                            className="w-full bg-gray-700 text-white border-gray-600 focus:ring-amber-500 placeholder-gray-500"
                        />
                    </div>
                    
                    {/* Category Select */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2.5 border border-gray-600 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                      >
                        <option value="" className="bg-gray-900">All Categories</option>
                        <option value="Food & Culinary" className="bg-gray-900">Food & Culinary</option>
                        <option value="Photography" className="bg-gray-900">Photography</option>
                        <option value="History & Culture" className="bg-gray-900">History & Culture</option>
                        <option value="Adventure" className="bg-gray-900">Adventure</option>
                      </select>
                    </div>

                    {/* Price Range */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-300">Min</label>
                        <Input
                          name="minPrice"
                          type="number"
                          value={filters.minPrice}
                          onChange={handleFilterChange}
                          className="w-full bg-gray-700 text-white border-gray-600 focus:ring-amber-500 placeholder-gray-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-300">Max</label>
                        <Input
                          name="maxPrice"
                          type="number"
                          value={filters.maxPrice}
                          onChange={handleFilterChange}
                          className="w-full bg-gray-700 text-white border-gray-600 focus:ring-amber-500 placeholder-gray-500"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <AmberButton onClick={applyFilters} className="flex-1">
                        Apply Filters
                      </AmberButton>
                      <AmberButton onClick={clearFilters} variant="secondary" className="flex-1">
                        Clear
                      </AmberButton>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Listings Grid */}
          <div className="flex-1">
            {listings.length === 0 ? (
              <div className="text-center py-20 bg-gray-800 rounded-xl p-8 border border-gray-700">
                <div className="text-6xl mb-4 text-amber-500">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  No tours found
                </h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your filters or search in a different city
                </p>
                <AmberButton onClick={clearFilters}>Clear Filters</AmberButton>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <Link
                    key={listing.id}
                    href={`/tours/${listing.id}`}
                    className="bg-gray-800 rounded-xl shadow-xl overflow-hidden hover:shadow-amber-500/30 transition-all duration-300 hover:-translate-y-1 border border-gray-700 hover:border-amber-500"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={listing.images[0] || 'https://via.placeholder.com/400x300?text=Image+Coming+Soon'}
                        alt={listing.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 opacity-80"
                      />
                      <div className="absolute top-4 right-4 bg-amber-500 px-3 py-1 rounded-full text-sm font-bold text-gray-900">
                        {listing.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-xl mb-2 line-clamp-2 text-white">
                        {listing.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {listing.description}
                      </p>

                      {/* Guide Info */}
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-700">
                        <img
                          src={listing.guide.profilePic || `https://ui-avatars.com/api/?name=${listing.guide.name}&background=d97706&color=fff`}
                          alt={listing.guide.name}
                          className="w-8 h-8 rounded-full border-2 border-amber-500"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">
                            {listing.guide.name}
                          </p>
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center gap-1 text-amber-500">
                          <FiStar className="fill-current" />
                          <span className="text-white font-semibold">
                            {listing.averageRating?.toFixed(1) || 'New'}
                          </span>
                          {listing.reviewCount! > 0 && (
                            <span className="text-gray-500">
                              ({listing.reviewCount})
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3 text-gray-400">
                          <div className="flex items-center gap-1">
                            <FiClock className="text-amber-500" />
                            <span>{listing.duration}h</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiMapPin className="text-amber-500" />
                            <span>{listing.city}</span>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-amber-400">
                            {formatCurrency(listing.tourFee)}
                          </span>
                          <span className="text-gray-500 text-sm ml-1">/ person</span>
                        </div>
                        <AmberButton size="sm">View Details</AmberButton>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
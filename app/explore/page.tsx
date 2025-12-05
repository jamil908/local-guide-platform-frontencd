/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Listing } from '@/types';
import { FiStar, FiClock, FiDollarSign, FiMapPin, FiFilter } from 'react-icons/fi';
import { LoadingSpinner } from '@/components/shared/Loading';
import { formatCurrency } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

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
  }, []);

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
console.log(listings)
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    fetchListings();
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({ city: '', category: '', minPrice: '', maxPrice: '' });
    fetchListings();
  };

  if (loading) {
    return (
      <div className="container-custom py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-2">Explore Tours</h1>
          <p className="text-blue-100">
            Discover {listings.length} amazing experiences with local experts
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear all
                </button>
              </div>

              <div className="space-y-6">
                <Input
                  label="City"
                  name="city"
                  type="text"
                  placeholder="e.g., Paris, Tokyo"
                  value={filters.city}
                  onChange={handleFilterChange}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Categories</option>
                    <option value="Food & Culinary">Food & Culinary</option>
                    <option value="Photography">Photography</option>
                    <option value="History & Culture">History & Culture</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Wine & Food">Wine & Food</option>
                    <option value="Art & Design">Art & Design</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Min Price"
                    name="minPrice"
                    type="number"
                    placeholder="$0"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                  />
                  <Input
                    label="Max Price"
                    name="maxPrice"
                    type="number"
                    placeholder="$500"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                  />
                </div>

                <Button
                  onClick={applyFilters}
                  className="w-full"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full mb-4"
            >
              <FiFilter className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="space-y-4">
                  <Input
                    label="City"
                    name="city"
                    type="text"
                    placeholder="e.g., Paris"
                    value={filters.city}
                    onChange={handleFilterChange}
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                    >
                      <option value="">All Categories</option>
                      <option value="Food & Culinary">Food & Culinary</option>
                      <option value="Photography">Photography</option>
                      <option value="History & Culture">History & Culture</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Min"
                      name="minPrice"
                      type="number"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                    />
                    <Input
                      label="Max"
                      name="maxPrice"
                      type="number"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={applyFilters} className="flex-1">
                      Apply
                    </Button>
                    <Button onClick={clearFilters} variant="secondary" className="flex-1">
                      Clear
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Listings Grid */}
          <div className="flex-1">
            {listings.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No tours found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search in a different city
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <Link
                    key={listing.id}
                    
                    href={`/tours/${listing.id}`}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={listing.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
                        alt={listing.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                        {listing.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900">
                        {listing.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {listing.description}
                      </p>

                      {/* Guide Info */}
                      <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                        <img
                          src={listing.guide.profilePic || `https://ui-avatars.com/api/?name=${listing.guide.name}&background=3b82f6&color=fff`}
                          alt={listing.guide.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {listing.guide.name}
                          </p>
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <FiStar className="fill-current" />
                          <span className="text-gray-900 font-semibold">
                            {listing.averageRating?.toFixed(1) || 'New'}
                          </span>
                          {listing.reviewCount ! > 0 && (
                            <span className="text-gray-500">
                              ({listing.reviewCount})
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3 text-gray-600">
                          <div className="flex items-center gap-1">
                            <FiClock />
                            <span>{listing.duration}h</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiMapPin />
                            <span>{listing.city}</span>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-blue-600">
                            {formatCurrency(listing.tourFee)}
                          </span>
                          <span className="text-gray-500 text-sm ml-1">/ person</span>
                        </div>
                        <Button size="sm">View Details</Button>
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
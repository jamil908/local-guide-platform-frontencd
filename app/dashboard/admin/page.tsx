// pages/dashboard/admin/AdminDashboard.tsx
'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { User, Listing, Booking } from '@/types';
import { formatDate, formatCurrency } from '@/lib/utils';
import { FiUsers, FiMap, FiCalendar, FiDollarSign, FiTrash2 } from 'react-icons/fi';
import Button from '@/components/ui/Button';

// --- IMPORT CHANGE: Replacing generic Card with DarkCard from car2.tsx ---
import DarkCard, { DarkCardBody } from '@/components/ui/Card2'; // Assuming car2.tsx is in components/ui/

import Loading from '@/components/shared/Loading';
import toast from 'react-hot-toast';
import Link from 'next/link';

// Helper function for Role Badge styling (unchanged)
const getRoleBadgeClasses = (role: string) => {
  switch (role) {
    case 'ADMIN':
      return 'bg-amber-900/50 text-amber-300';
    case 'GUIDE':
      return 'bg-blue-900/50 text-blue-300';
    case 'TOURIST':
    default:
      return 'bg-green-900/50 text-green-300';
  }
};

// Helper function for Booking Status Badge styling (unchanged)
const getStatusBadgeClasses = (status: string) => {
    switch (status) {
        case 'CONFIRMED':
            return 'bg-green-900/50 text-green-300';
        case 'PENDING':
            return 'bg-yellow-900/50 text-yellow-300';
        case 'COMPLETED':
            return 'bg-amber-900/50 text-amber-300';
        case 'CANCELLED':
        default:
            return 'bg-red-900/50 text-red-300';
    }
};


export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'users' | 'listings' | 'bookings'>('users');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    if (user?.role !== 'ADMIN') {
      router.push('/');
      toast.error('Admin access required');
      return;
    }
    fetchData();
  }, [isAuthenticated, user]);

  const fetchData = async () => {
    try {
      const [usersRes, listingsRes, bookingsRes] = await Promise.all([
        api.get('/users'),
        api.get('/listings'),
        api.get('/bookings'),
      ]);
      setUsers(usersRes.data.data);
      setListings(listingsRes.data.data);
      setBookings(bookingsRes.data.data);
    } catch (error) {
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await api.delete(`/users/${userId}`);
      toast.success('User deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleDeleteListing = async (listingId: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    
    try {
      await api.delete(`/listings/${listingId}`);
      toast.success('Listing deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete listing');
    }
  };

  const totalRevenue = bookings
    .filter((b) => b.status === 'COMPLETED')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  if (loading) return <Loading />;
  
  // Custom Card component for stats (REMOVED generic Card, now using DarkCard)
  const AdminStatCard = ({ icon: Icon, title, value, subtext }: { icon: React.ElementType, title: string, value: string | number, subtext: ReactNode }) => (
    // --- DarkCard Usage ---
    <DarkCard hover={true} className="shadow-lg">
      <DarkCardBody className="text-center">
        <Icon className="mx-auto text-amber-500 mb-2" size={32} />
        <div className="text-3xl font-extrabold text-gray-50 mb-1">{value}</div>
        <div className="text-gray-400">{title}</div>
        <div className="text-sm text-gray-500 mt-1">{subtext}</div>
      </DarkCardBody>
    </DarkCard>
  );

  // Tab Button Class Helper (unchanged)
  const TabButton = ({ tab, label, count }: { tab: typeof activeTab, label: string, count: number }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 sm:px-6 py-3 rounded-lg font-semibold transition text-sm sm:text-base w-full sm:w-auto ${
        activeTab === tab
          ? 'bg-amber-600 text-gray-900 shadow-lg shadow-amber-500/30'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-amber-500 border border-gray-700'
      }`}
    >
      {label} ({count})
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-amber-500 mb-2">Admin Panel</h1>
          <p className="text-gray-400">Manage platform users, listings, and financial data</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <AdminStatCard 
            icon={FiUsers} 
            title="Total Users" 
            value={users.length} 
            subtext={
              <>
                <span className="text-blue-400">{users.filter((u) => u.role === 'GUIDE').length} Guides</span> •{' '}
                <span className="text-green-400">{users.filter((u) => u.role === 'TOURIST').length} Tourists</span>
              </>
            }
          />

          <AdminStatCard 
            icon={FiMap} 
            title="Total Tours" 
            value={listings.length} 
            subtext={
              <>
                <span className="text-amber-400">{listings.filter((l) => l.isActive).length} Active</span>
                {' / '}
                <span>{listings.filter((l) => !l.isActive).length} Drafts</span>
              </>
            }
          />

          <AdminStatCard 
            icon={FiCalendar} 
            title="Total Bookings" 
            value={bookings.length} 
            subtext={
              <>
                <span className="text-amber-400">{bookings.filter((b) => b.status === 'COMPLETED').length} Completed</span>
              </>
            }
          />

          <AdminStatCard 
            icon={FiDollarSign} 
            title="Total Revenue" 
            value={formatCurrency(totalRevenue)} 
            subtext="From completed bookings"
          />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          <TabButton tab="users" label="Users" count={users.length} />
          <TabButton tab="listings" label="Listings" count={listings.length} />
          <TabButton tab="bookings" label="Bookings" count={bookings.length} />
        </div>

        {/* Users Tab Content */}
        {activeTab === 'users' && (
          // --- DarkCard Usage ---
          <DarkCard hover={false} className="shadow-xl"> 
            <DarkCardBody>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-700 transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={user.profilePic || `https://ui-avatars.com/api/?name=${user.name}&background=fde68a&color=78350f`}
                              alt={user.name}
                              className="w-10 h-10 rounded-full mr-3 border border-amber-500/50"
                            />
                            <div>
                              <div className="font-medium text-gray-100">{user.name}</div>
                              <Link href={`/profile/${user.id}`} className="text-xs text-amber-500 hover:underline">
                                View Profile
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeClasses(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDeleteUser(user.id)}
                            disabled={user.role === 'ADMIN'}
                            className="bg-red-600 hover:bg-red-500"
                          >
                            <FiTrash2 />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DarkCardBody>
          </DarkCard>
        )}

        {/* Listings Tab Content */}
        {activeTab === 'listings' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              // --- DarkCard Usage ---
              <DarkCard key={listing.id} hover={true} className="shadow-xl">
                <img
                  src={listing.images[0] || '/placeholder.jpg'}
                  alt={listing.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <DarkCardBody>
                  <h3 className="font-bold text-xl mb-2 text-amber-500">{listing.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{listing.city} • {listing.category}</p>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{listing.description}</p>
                  
                  <div className="flex items-center justify-between mb-4 border-t border-gray-700 pt-3">
                    <span className="text-2xl font-extrabold text-green-400">
                      {formatCurrency(listing.tourFee)}
                    </span>
                    <span className="text-xs text-gray-500">by <Link href={`/profile/${listing.guide.id}`} className="text-blue-400 hover:underline">{listing.guide.name}</Link></span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-gray-900"
                      onClick={() => router.push(`/tours/${listing.id}`)}
                    >
                      View Tour
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      className="bg-red-600 hover:bg-red-500"
                      onClick={() => handleDeleteListing(listing.id)}
                    >
                      <FiTrash2 />
                    </Button>
                  </div>
                </DarkCardBody>
              </DarkCard>
            ))}
          </div>
        )}

        {/* Bookings Tab Content */}
        {activeTab === 'bookings' && (
          // --- DarkCard Usage ---
          <DarkCard hover={false} className="shadow-xl">
            <DarkCardBody>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Tour</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Tourist</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Guide</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-700 transition">
                        <td className="px-6 py-4 text-sm font-medium text-gray-100">
                          {booking.listing?.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          <Link href={`/profile/${booking.tourist?.id}`} className="hover:text-amber-500">
                            {booking.tourist?.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          <Link href={`/profile/${booking.guide?.id}`} className="hover:text-amber-500">
                            {booking.guide?.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {formatDate(booking.bookingDate)}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-amber-400">
                          {formatCurrency(booking.totalAmount)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClasses(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DarkCardBody>
          </DarkCard>
        )}
      </div>
    </div>
  );
}
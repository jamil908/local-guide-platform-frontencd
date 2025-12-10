'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { User, Listing, Booking } from '@/types';
import { formatDate, formatCurrency } from '@/lib/utils';
import { FiUsers, FiMap, FiCalendar, FiDollarSign, FiTrash2, FiEdit } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Card, { CardBody } from '@/components/ui/Card';
import Loading from '@/components/shared/Loading';
import toast from 'react-hot-toast';

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage platform users, listings, and bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardBody className="text-center">
              <FiUsers className="mx-auto text-blue-600 mb-2" size={32} />
              <div className="text-3xl font-bold text-gray-900 mb-1">{users.length}</div>
              <div className="text-gray-600">Total Users</div>
              <div className="text-sm text-gray-500 mt-1">
                {users.filter((u) => u.role === 'GUIDE').length} Guides •{' '}
                {users.filter((u) => u.role === 'TOURIST').length} Tourists
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="text-center">
              <FiMap className="mx-auto text-purple-600 mb-2" size={32} />
              <div className="text-3xl font-bold text-gray-900 mb-1">{listings.length}</div>
              <div className="text-gray-600">Total Tours</div>
              <div className="text-sm text-gray-500 mt-1">
                {listings.filter((l) => l.isActive).length} Active
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="text-center">
              <FiCalendar className="mx-auto text-green-600 mb-2" size={32} />
              <div className="text-3xl font-bold text-gray-900 mb-1">{bookings.length}</div>
              <div className="text-gray-600">Total Bookings</div>
              <div className="text-sm text-gray-500 mt-1">
                {bookings.filter((b) => b.status === 'COMPLETED').length} Completed
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="text-center">
              <FiDollarSign className="mx-auto text-yellow-600 mb-2" size={32} />
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {formatCurrency(totalRevenue)}
              </div>
              <div className="text-gray-600">Total Revenue</div>
              <div className="text-sm text-gray-500 mt-1">From completed bookings</div>
            </CardBody>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'users'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'listings'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Listings ({listings.length})
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'bookings'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Bookings ({bookings.length})
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <Card>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={user.profilePic || `https://ui-avatars.com/api/?name=${user.name}`}
                              alt={user.name}
                              className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                              <div className="font-medium text-gray-900">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.role === 'ADMIN'
                                ? 'bg-purple-100 text-purple-800'
                                : user.role === 'GUIDE'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDeleteUser(user.id)}
                            disabled={user.role === 'ADMIN'}
                          >
                            <FiTrash2 />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <Card key={listing.id} hover>
                <img
                  src={listing.images[0] || '/placeholder.jpg'}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <CardBody>
                  <h3 className="font-bold text-lg mb-2">{listing.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{listing.city} • {listing.category}</p>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{listing.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-blue-600">
                      {formatCurrency(listing.tourFee)}
                    </span>
                    <span className="text-sm text-gray-500">by {listing.guide.name}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => router.push(`/tours/${listing.id}`)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteListing(listing.id)}
                    >
                      <FiTrash2 />
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <Card>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Tour
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Tourist
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Guide
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {booking.listing?.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {booking.tourist?.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {booking.guide?.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(booking.bookingDate)}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          {formatCurrency(booking.totalAmount)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              booking.status === 'CONFIRMED'
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'PENDING'
                                ? 'bg-yellow-100 text-yellow-800'
                                : booking.status === 'COMPLETED'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
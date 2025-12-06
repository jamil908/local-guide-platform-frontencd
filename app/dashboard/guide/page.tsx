/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Booking, Listing } from '@/types';
import { formatDate, formatCurrency } from '@/lib/utils';
import { FiPlus, FiCalendar, FiDollarSign, FiUsers, FiStar, FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import Loading from '@/components/shared/Loading';
import toast from 'react-hot-toast';

export default function GuideDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bookings' | 'listings'>('bookings');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (user?.role !== 'GUIDE') {
      router.push('/');
      return;
    }
    fetchData();
  }, [isAuthenticated, user]);

  const fetchData = async () => {
    try {
      const [bookingsRes, listingsRes] = await Promise.all([
        api.get('/bookings/my-bookings'),
        api.get('/listings/my/listings'),
      ]);
      setBookings(bookingsRes.data.data);
      setListings(listingsRes.data.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingAction = async (bookingId: string, status: 'CONFIRMED' | 'CANCELLED') => {
    try {
      await api.patch(`/bookings/${bookingId}`, { status });
      toast.success(`Booking ${status.toLowerCase()}`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update booking');
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

  const pendingBookings = bookings.filter((b) => b.status === 'PENDING');
  const upcomingBookings = bookings.filter(
    (b) => b.status === 'CONFIRMED' && new Date(b.bookingDate) >= new Date()
  );
  const totalEarnings = bookings
    .filter((b) => b.status === 'COMPLETED')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Guide Dashboard</h1>
            <p className="text-gray-600">Manage your tours and bookings</p>
          </div>
          <Link href="/dashboard/guide/create-listing">
            <Button size="lg">
              <FiPlus className="mr-2" />
              Create New Tour
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardBody className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {pendingBookings.length}
              </div>
              <div className="text-gray-600">Pending Requests</div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {upcomingBookings.length}
              </div>
              <div className="text-gray-600">Upcoming Tours</div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {formatCurrency(totalEarnings)}
              </div>
              <div className="text-gray-600">Total Earnings</div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {listings.length}
              </div>
              <div className="text-gray-600">Active Listings</div>
            </CardBody>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
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
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'listings'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            My Tours ({listings.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'bookings' ? (
          <div className="space-y-6">
            {/* Pending Requests */}
            {pendingBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-yellow-600">
                  Pending Requests ({pendingBookings.length})
                </h2>
                <div className="space-y-4">
                  {pendingBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardBody>
                        <div className="flex flex-col md:flex-row gap-6">
                          <img
                            src={booking.listing?.images[0] || '/placeholder.jpg'}
                            alt={booking.listing?.title}
                            className="w-full md:w-48 h-32 object-cover rounded-lg"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-bold">{booking.listing?.title}</h3>
                                <p className="text-gray-600 mt-1">
                                  Requested by: {booking.tourist?.name}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-blue-600">
                                  {formatCurrency(booking.totalAmount)}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {booking.numberOfPeople} people
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 mb-4 text-gray-600">
                              <div className="flex items-center gap-2">
                                <FiCalendar />
                                <span>{formatDate(booking.bookingDate)}</span>
                              </div>
                            </div>

                            <div className="flex gap-3">
                              <Button
                                size="sm"
                                onClick={() => handleBookingAction(booking.id, 'CONFIRMED')}
                              >
                                <FiCheck className="mr-2" />
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleBookingAction(booking.id, 'CANCELLED')}
                              >
                                <FiX className="mr-2" />
                                Decline
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Bookings */}
            <div>
              <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
              {bookings.length === 0 ? (
                <Card>
                  <CardBody className="text-center py-12">
                    <div className="text-6xl mb-4">📅</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings yet</h3>
                    <p className="text-gray-600">
                      Your bookings will appear here once tourists start booking your tours.
                    </p>
                  </CardBody>
                </Card>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id} hover>
                      <CardBody>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <img
                              src={booking.tourist?.profilePic || '/avatar.png'}
                              alt={booking.tourist?.name}
                              className="w-12 h-12 rounded-full"
                            />
                            <div>
                              <h3 className="font-bold">{booking.listing?.title}</h3>
                              <p className="text-sm text-gray-600">
                                {booking.tourist?.name} • {formatDate(booking.bookingDate)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="font-bold">{formatCurrency(booking.totalAmount)}</div>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
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
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Listings Tab */
          <div className="space-y-6">
            {listings.length === 0 ? (
              <Card>
                <CardBody className="text-center py-12">
                  <div className="text-6xl mb-4">🎒</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No tours yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Create your first tour and start connecting with travelers!
                  </p>
                  <Link href="/dashboard/guide/create-listing">
                    <Button>
                      <FiPlus className="mr-2" />
                      Create Your First Tour
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {listings.map((listing) => (
                  <Card key={listing.id} hover>
                    <img
                      src={listing.images[0] || '/placeholder.jpg'}
                      alt={listing.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardBody>
                      <h3 className="text-xl font-bold mb-2">{listing.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {listing.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <FiStar className="text-yellow-500" />
                            <span>{listing.averageRating?.toFixed(1) || 'New'}</span>
                          </div>
                          <span>{listing.reviewCount || 0} reviews</span>
                        </div>
                        <div className="text-xl font-bold text-blue-600">
                          {formatCurrency(listing.tourFee)}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/tours/${listing.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            View
                          </Button>
                        </Link>
                        <Link href={`/dashboard/guide/edit/${listing.id}`} className="flex-1">
                          <Button size="sm" className="w-full">
                            <FiEdit className="mr-2" />
                            Edit
                          </Button>
                        </Link>
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
          </div>
        )}
      </div>
    </div>
  );
}
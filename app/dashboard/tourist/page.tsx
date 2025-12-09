'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Booking } from '@/types';
import { formatDate, formatCurrency } from '@/lib/utils';
import { FiCalendar, FiMapPin, FiUser, FiDollarSign, FiClock, FiStar } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import Loading from '@/components/shared/Loading';
import toast from 'react-hot-toast';
import ReviewModal from '@/components/ui/ReviewModal';

export default function TouristDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (user?.role !== 'TOURIST') {
      router.push('/');
      return;
    }
    fetchBookings();
  }, [isAuthenticated, user]);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings/my-bookings');
      setBookings(response.data.data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingBookings = bookings.filter(
    (b) => new Date(b.bookingDate) >= new Date() && b.status !== 'CANCELLED' && b.status !== 'COMPLETED'
  );

  const pastBookings = bookings.filter(
    (b) => new Date(b.bookingDate) < new Date() || b.status === 'COMPLETED' || b.status === 'CANCELLED'
  );
console.log(bookings)
  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your upcoming and past tours</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
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
                {bookings.filter((b) => b.status === 'COMPLETED').length}
              </div>
              <div className="text-gray-600">Completed</div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {bookings.filter((b) => b.status === 'PENDING').length}
              </div>
              <div className="text-gray-600">Pending</div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {formatCurrency(
                  bookings
                    .filter((b) => b.status === 'COMPLETED')
                    .reduce((sum, b) => sum + b.totalAmount, 0)
                )}
              </div>
              <div className="text-gray-600">Total Spent</div>
            </CardBody>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'upcoming'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Upcoming ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'past'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Past ({pastBookings.length})
          </button>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {(activeTab === 'upcoming' ? upcomingBookings : pastBookings).length === 0 ? (
            <Card>
              <CardBody className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No {activeTab} bookings
                </h3>
                <p className="text-gray-600 mb-6">
                  {activeTab === 'upcoming'
                    ? 'Start exploring and book your next adventure!'
                    : 'Your completed and cancelled bookings will appear here.'}
                </p>
                {activeTab === 'upcoming' && (
                  <Link href="/explore">
                    <Button>Explore Tours</Button>
                  </Link>
                )}
              </CardBody>
            </Card>
          ) : (
            (activeTab === 'upcoming' ? upcomingBookings : pastBookings).map((booking) => (
              <Card key={booking.id} hover>
                <CardBody>
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Tour Image */}
                    <div className="md:w-64 flex-shrink-0">
                      <img
                        src={booking.listing?.images[0] || '/placeholder.jpg'}
                        alt={booking.listing?.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Link
                            href={`/tours/${booking.listingId}`}
                            className="text-xl font-bold text-gray-900 hover:text-blue-600 transition"
                          >
                            {booking.listing?.title}
                          </Link>
                          <div className="flex items-center gap-2 mt-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                booking.status
                              )}`}
                            >
                              {booking.status}
                            </span>
                            {booking.paymentStatus === 'COMPLETED' && (
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                Paid
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {formatCurrency(booking.totalAmount)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.numberOfPeople} {booking.numberOfPeople === 1 ? 'person' : 'people'}
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-3 text-gray-600">
                          <FiCalendar className="text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-500">Date</div>
                            <div className="font-semibold">{formatDate(booking.bookingDate)}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                          <FiMapPin className="text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-500">Location</div>
                            <div className="font-semibold">{booking.listing?.city}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                          <FiUser className="text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-500">Guide</div>
                            <div className="font-semibold">{booking.guide?.name}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                          <FiClock className="text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-500">Duration</div>
                            <div className="font-semibold">{booking.listing?.duration} hours</div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Link href={`/tours/${booking.listingId}`}>
                          <Button variant="outline" size="sm">
                            View Tour
                          </Button>
                        </Link>
                        
                        {booking.status === 'CONFIRMED' && !booking.review && (
                          <Button 
                            size="sm"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setReviewModalOpen(true);
                            }}
                          >
                            <FiStar className="mr-2" />
                            Write Review
                          </Button>
                        )}

                        {booking.status === 'COMPLETED' && booking.review && (
                          <Button variant="outline" size="sm" disabled>
                            <FiStar className="mr-2 text-yellow-500 fill-current" />
                            Reviewed
                          </Button>
                        )}
                        
                        {booking.status === 'PENDING' && (
                          <Button variant="danger" size="sm">
                            Cancel Booking
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Review Modal */}
      {selectedBooking && (
        <ReviewModal
          isOpen={reviewModalOpen}
          onClose={() => {
            setReviewModalOpen(false);
            setSelectedBooking(null);
          }}
          bookingId={selectedBooking.id}
          listingId={selectedBooking.listingId}
          listingTitle={selectedBooking.listing?.title || 'Tour'}
          onReviewSubmitted={() => {
            fetchBookings(); // Refresh bookings
          }}
        />
      )}
    </div>
  );
}
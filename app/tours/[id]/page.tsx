/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/api';
import { Listing, Review } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { FiStar, FiClock, FiMapPin } from 'react-icons/fi';
import { formatCurrency } from '@/lib/utils';
import Loading from '@/components/shared/Loading';

export default function TourDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [listing, setListing] = useState<Listing | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [booking, setBooking] = useState(false);
  const [minDate, setMinDate] = useState('');

  // Set client-only min date
  useEffect(() => {
    setMinDate(new Date().toISOString().split('T')[0]);
  }, []);

  // Fetch listing from API
  useEffect(() => {
    if (!params.id) return;

    const fetchListing = async () => {
      try {
        const response = await api.get(`/listings/${params.id}`);
        setListing(response.data.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Tour not found');
        setListing(null);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.id]);

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to book');
      router.push('/login');
      return;
    }

    if (!bookingDate) {
      toast.error('Please select a date');
      return;
    }

    if (!listing) return;

    try {
      setBooking(true);
      await api.post('/bookings', {
        listingId: listing.id,
        guideId: listing.guideId,
        bookingDate,
        numberOfPeople,
        totalAmount: listing.tourFee * numberOfPeople,
      });
      toast.success('Booking request sent!');
      router.push('/dashboard/tourist');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <Loading />;
  if (!listing) return <div className="text-center mt-20">Tour not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Images */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Image
            src={listing.images[0] || '/placeholder.jpg'}
            alt={listing.title}
            width={700}
            height={400}
            className="w-full h-96 object-cover rounded-xl"
          />
          <div className="grid grid-cols-2 gap-4">
            {listing.images.slice(1, 5).map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`Tour ${idx + 2}`}
                width={350}
                height={200}
                className="w-full h-44 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{listing.title}</h1>

            <div className="flex items-center gap-6 mb-6 text-gray-600">
              <div className="flex items-center gap-2">
                <FiStar className="text-yellow-500" />
                <span>4.8 (23 reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin />
                <span>{listing.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock />
                <span>{listing.duration} hours</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">About this experience</h2>
              <p className="text-gray-700 leading-relaxed">{listing.description}</p>
            </div>

            {listing.itinerary && (
              <div className="bg-white rounded-xl p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
                <pre className="text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">
                  {listing.itinerary}
                </pre>
              </div>
            )}
          </div>

          {/* Booking widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="mb-6">
                <span className="text-3xl font-bold text-blue-600">
                  {formatCurrency(listing.tourFee)}
                </span>
                <span className="text-gray-500"> / person</span>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={minDate}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Number of people</label>
                  <input
                    type="number"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                    min={1}
                    max={listing.maxGroupSize}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span>Total</span>
                  <span className="font-bold">
                    {formatCurrency(listing.tourFee * numberOfPeople)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleBooking}
                className="w-full"
                size="lg"
                isLoading={booking}
              >
                Request to Book
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                You wont be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// app/tours/[id]/page.tsx

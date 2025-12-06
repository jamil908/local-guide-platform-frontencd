// /* eslint-disable @typescript-eslint/no-explicit-any */
// // /* eslint-disable @typescript-eslint/no-explicit-any */

// 'use client';
// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Image from 'next/image';
// import api from '@/lib/api';
// import { Listing, Review } from '@/types';
// import { useAuth } from '@/contexts/AuthContext';
// import toast from 'react-hot-toast';
// import Button from '@/components/ui/Button';
// import { FiStar, FiClock, FiMapPin } from 'react-icons/fi';
// import { formatCurrency } from '@/lib/utils';
// import Loading from '@/components/shared/Loading';

// export default function TourDetailsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { user, isAuthenticated } = useAuth();

//   const [listing, setListing] = useState<Listing | null>(null);
  
//   const [loading, setLoading] = useState(true);
//   const [bookingDate, setBookingDate] = useState('');
//   const [numberOfPeople, setNumberOfPeople] = useState(1);
//   const [booking, setBooking] = useState(false);
//   const [minDate, setMinDate] = useState('');

//   // Set client-only min date
//   useEffect(() => {
//     setMinDate(new Date().toISOString().split('T')[0]);
//   }, []);

//   // Fetch listing from API
//   useEffect(() => {
//     if (!params.id) return;

//     const fetchListing = async () => {
//       try {
//         const response = await api.get(`/listings/${params.id}`);
//         setListing(response.data.data);
//       } catch (error: any) {
//         toast.error(error.response?.data?.message || 'Tour not found');
//         setListing(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListing();
//   }, [params.id]);

//   const handleBooking = async () => {
//     if (!isAuthenticated) {
//       toast.error('Please login to book');
//       router.push('/login');
//       return;
//     }

//     if (!bookingDate) {
//       toast.error('Please select a date');
//       return;
//     }

//     if (!listing) return;

//     try {
//       setBooking(true);
//       await api.post('/bookings', {
//         listingId: listing.id,
//         guideId: listing.guideId,
//         bookingDate,
//         numberOfPeople,
//         totalAmount: listing.tourFee * numberOfPeople,
//       });
//       toast.success('Booking request sent!');
//       router.push('/dashboard/tourist');
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Booking failed');
//     } finally {
//       setBooking(false);
//     }
//   };

//   if (loading) return <Loading />;
//   if (!listing) return <div className="text-center mt-20">Tour not found</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container-custom">
//         {/* Images */}
//         <div className="grid md:grid-cols-2 gap-4 mb-8">
//           <Image
//             src={listing.images[0] || '/placeholder.jpg'}
//             alt={listing.title}
//             width={700}
//             height={400}
//             className="w-full h-96 object-cover rounded-xl"
//           />
//           <div className="grid grid-cols-2 gap-4">
//             {listing.images.slice(1, 5).map((img, idx) => (
//               <Image
//                 key={idx}
//                 src={img}
//                 alt={`Tour ${idx + 2}`}
//                 width={350}
//                 height={200}
//                 className="w-full h-44 object-cover rounded-lg"
//               />
//             ))}
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Main content */}
//           <div className="lg:col-span-2">
//             <h1 className="text-4xl font-bold mb-4">{listing.title}</h1>

//             <div className="flex items-center gap-6 mb-6 text-gray-600">
//               <div className="flex items-center gap-2">
//                 <FiStar className="text-yellow-500" />
//                 <span>4.8 (23 reviews)</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FiMapPin />
//                 <span>{listing.city}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FiClock />
//                 <span>{listing.duration} hours</span>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl p-6 mb-6">
//               <h2 className="text-2xl font-bold mb-4">About this experience</h2>
//               <p className="text-gray-700 leading-relaxed">{listing.description}</p>
//             </div>

//             {listing.itinerary && (
//               <div className="bg-white rounded-xl p-6 mb-6">
//                 <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
//                 <pre className="text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">
//                   {listing.itinerary}
//                 </pre>
//               </div>
//             )}
//           </div>

//           {/* Booking widget */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
//               <div className="mb-6">
//                 <span className="text-3xl font-bold text-blue-600">
//                   {formatCurrency(listing.tourFee)}
//                 </span>
//                 <span className="text-gray-500"> / person</span>
//               </div>

//               <div className="space-y-4 mb-6">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Date</label>
//                   <input
//                     type="date"
//                     value={bookingDate}
//                     onChange={(e) => setBookingDate(e.target.value)}
//                     min={minDate}
//                     className="w-full px-4 py-2 border rounded-lg"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">Number of people</label>
//                   <input
//                     type="number"
//                     value={numberOfPeople}
//                     onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
//                     min={1}
//                     max={listing.maxGroupSize}
//                     className="w-full px-4 py-2 border rounded-lg"
//                   />
//                 </div>
//               </div>

//               <div className="border-t pt-4 mb-6">
//                 <div className="flex justify-between mb-2">
//                   <span>Total</span>
//                   <span className="font-bold">
//                     {formatCurrency(listing.tourFee * numberOfPeople)}
//                   </span>
//                 </div>
//               </div>

//               <Button
//                 onClick={handleBooking}
//                 className="w-full"
//                 size="lg"
//                 isLoading={booking}
//               >
//                 Request to Book
//               </Button>

//               <p className="text-xs text-gray-500 text-center mt-4">
//                 You wont be charged yet
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// // app/tours/[id]/page.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/api';
import { Listing, Review } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button'; // Assuming your Button component supports dark/monochrome styling
import { FiStar, FiClock, FiMapPin } from 'react-icons/fi';
import { formatCurrency } from '@/lib/utils';
import Loading from '@/components/shared/Loading';

// --- Monochromatic Styling Overhaul ---
// The main background is a dark, off-black, and text is white/light gray.

// NOTE: You will likely need to adjust your global styles and the 'Button' component 
// to ensure it renders correctly in a dark theme. I've styled the Button here 
// to be Black with White text for a high-contrast look.

const MonochromaticButton = ({ children, onClick, className, size, isLoading, ...props }: any) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className={`
      ${className} 
      ${size === 'lg' ? 'px-8 py-3 text-lg' : 'px-6 py-2 text-base'}
      bg-black text-white 
      hover:bg-gray-800 
      disabled:bg-gray-700 disabled:text-gray-400
      font-semibold rounded-lg transition duration-200 ease-in-out
      flex items-center justify-center
    `}
    {...props}
  >
    {isLoading ? (
      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    ) : children}
  </button>
);


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
  if (!listing) return <div className="text-center mt-20 text-gray-800">Tour not found</div>;

  return (
    // Updated background to dark gray/off-black
    <div className="min-h-screen bg-gray-900 text-gray-100 py-16">
      <div className="container-custom mx-auto px-4 md:px-8">
        
        {/* Images */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {/* Main Image - Higher Contrast Look */}
          <Image
            src={listing.images[0] || '/placeholder.jpg'}
            alt={listing.title}
            width={1000}
            height={600}
            className="w-full h-96 object-cover rounded-xl shadow-2xl transition duration-300 hover:opacity-90"
          />
          {/* Gallery Images */}
          <div className="grid grid-cols-2 gap-4">
            {listing.images.slice(1, 5).map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`Tour ${idx + 2}`}
                width={500}
                height={300}
                className="w-full h-44 object-cover rounded-lg shadow-lg opacity-90 hover:opacity-100 transition duration-200"
              />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h1 className="text-5xl font-extrabold mb-4 text-white">{listing.title}</h1>

            {/* Tour Info */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-400">
              <div className="flex items-center gap-2">
                <FiStar className="text-yellow-500 text-lg" /> {/* Keep star gold for contrast/rating */}
                <span className="font-medium">4.8 (23 reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin className="text-gray-500 text-lg" />
                <span className="font-medium">{listing.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-gray-500 text-lg" />
                <span className="font-medium">{listing.duration} hours</span>
              </div>
            </div>

            {/* About Section - Dark Card */}
            <div className="bg-gray-800 rounded-xl p-8 mb-8 shadow-xl border border-gray-700">
              <h2 className="text-3xl font-bold mb-5 text-white">About this experience</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{listing.description}</p>
            </div>

            {/* Itinerary Section - Dark Card */}
            {listing.itinerary && (
              <div className="bg-gray-800 rounded-xl p-8 mb-8 shadow-xl border border-gray-700">
                <h2 className="text-3xl font-bold mb-5 text-white">Itinerary</h2>
                <pre className="text-gray-300 leading-relaxed whitespace-pre-wrap font-sans text-lg">
                  {listing.itinerary}
                </pre>
              </div>
            )}
            
            {/* Guide Info (Placeholder for completeness) */}
             <div className="mt-12 pt-6 border-t border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4">Your Guide</h3>
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-lg font-semibold">G</div>
                    <p className="text-gray-300">Guided by **[Guide Name Placeholder]** - <span className='text-gray-400'>Certified Local Expert</span></p>
                </div>
            </div>
          </div>

          {/* Booking widget */}
          <div className="lg:col-span-1">
            {/* Booking Card - High Contrast White/Light Card */}
            <div className="bg-white rounded-xl shadow-2xl p-6 sticky top-24 text-gray-800 border border-gray-200">
              <div className="mb-6 border-b pb-4">
                <span className="text-4xl font-extrabold text-black">
                  {formatCurrency(listing.tourFee)}
                </span>
                <span className="text-gray-600"> / person</span>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Date</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={minDate}
                    // Input style adjusted for light background
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Number of people</label>
                  <input
                    type="number"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                    min={1}
                    max={listing.maxGroupSize}
                    // Input style adjusted for light background
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between mb-2 text-lg">
                  <span className='font-semibold'>Total</span>
                  <span className="font-extrabold text-black">
                    {formatCurrency(listing.tourFee * numberOfPeople)}
                  </span>
                </div>
              </div>

              {/* Use the Monochromatic Button */}
              <MonochromaticButton
                onClick={handleBooking}
                className="w-full"
                size="lg"
                isLoading={booking}
              >
                Request to Book
              </MonochromaticButton>

              <p className="text-xs text-gray-500 text-center mt-4">
                Your card will not be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
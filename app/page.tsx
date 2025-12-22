/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiMap, FiUsers, FiStar, FiHeart, FiCamera, FiCoffee, FiShield, FiAward, FiGlobe } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import FeaturedToursSection from '@/components/shared/Featured';


const AmberButton = ({ children, onClick, className, size, type, ...props }: any) => {
  const baseStyle = "font-bold transition duration-200 ease-in-out";
  const sizeStyle = size === 'lg' ? 'px-8 py-3 text-lg' : 'px-6 py-2 text-base';
  const colorStyle = "bg-amber-500 text-gray-900 hover:bg-amber-400 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50";

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseStyle} ${sizeStyle} ${colorStyle} ${className} rounded-full`}
      {...props}
    >
      {children}
    </button>
  );
};

const DarkOutlineButton = ({ children, onClick, className, size, type, ...props }: any) => {
  const baseStyle = "font-bold transition duration-200 ease-in-out border-2";
  const sizeStyle = size === 'lg' ? 'px-8 py-3 text-lg' : 'px-6 py-2 text-base';
  const colorStyle = "border-gray-600 text-gray-300 hover:bg-gray-800 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50";

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseStyle} ${sizeStyle} ${colorStyle} ${className} rounded-full`}
      {...props}
    >
      {children}
    </button>
  );
};


export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?city=${searchQuery}`);
    } else {
      router.push('/explore');
    }
  };

  return (
     <div className="bg-gray-900 text-gray-100">
      
       <section className="relative bg-black text-white py-32 px-4 overflow-hidden">
         <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-extrabold mb-6 text-amber-400">
              Discover Authentic Experiences
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-300">
              Connect with passionate local experts who bring destinations to life
            </p>
            
             <form onSubmit={handleSearch} className="max-w-2xl mx-auto shadow-amber-500/30 shadow-2xl">
              <div className="flex flex-col sm:flex-row bg-gray-800 rounded-xl overflow-hidden p-2">
                <div className="flex-1 flex items-center px-6 py-3">
                  <FiSearch className="text-amber-500 mr-4" size={24} />
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
                  />
                </div>
                <AmberButton
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto mt-2 sm:mt-0 sm:rounded-r-lg rounded-lg"
                >
                  Search Tours
                </AmberButton>
              </div>
            </form>

             <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-5xl font-extrabold text-amber-400">500+</div>
                <div className="text-gray-400 mt-2">Local Guides</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-extrabold text-amber-400">50+</div>
                <div className="text-gray-400 mt-2">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-extrabold text-amber-400">10k+</div>
                <div className="text-gray-400 mt-2">Happy Travelers</div>
              </div>
            </div>
          </div>
        </div>
      </section>
<section className="py-20 px-4 bg-gray-900">
  <div className="container-custom">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4 text-white">Featured Experiences</h2>
      <p className="text-xl text-gray-400">
        Handpicked tours from our best local guides
      </p>
    </div>
    <FeaturedToursSection />
  </div>
</section>
       <section className="py-20 px-4 bg-gray-950">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">How It Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Getting started is easy. Just three simple steps to your perfect experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="p-8 rounded-xl bg-gray-800 shadow-xl border border-gray-700 text-center group">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-amber-500/30">
                <FiSearch className="text-gray-900" size={36} />
              </div>
              <div className="inline-block bg-amber-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold mb-4">
                Step 1
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Find Your Guide</h3>
              <p className="text-gray-400 leading-relaxed">
                Browse local experts based on your interests, destination, and preferred activities. Read reviews and check their expertise.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-xl bg-gray-800 shadow-xl border border-gray-700 text-center group">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-amber-500/30">
                <FiUsers className="text-gray-900" size={36} />
              </div>
              <div className="inline-block bg-amber-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold mb-4">
                Step 2
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Book Your Experience</h3>
              <p className="text-gray-400 leading-relaxed">
                Choose your date and send a booking request. Your guide will confirm and you'll receive all the details.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-xl bg-gray-800 shadow-xl border border-gray-700 text-center group">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-amber-500/30">
                <FiMap className="text-gray-900" size={36} />
              </div>
              <div className="inline-block bg-amber-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold mb-4">
                Step 3
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Explore Like a Local</h3>
              <p className="text-gray-400 leading-relaxed">
                Meet your guide and discover hidden gems, authentic experiences, and create unforgettable memories.
              </p>
            </div>
          </div>
        </div>
      </section>

       <section className="py-20 px-4 bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Explore by Category</h2>
            <p className="text-xl text-gray-400">
              Find experiences that match your interests
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FiCoffee, name: 'Food & Culinary', accent: 'amber', count: 120 },
              { icon: FiCamera, name: 'Photography', accent: 'gray', count: 85 },
              { icon: FiMap, name: 'Adventure', accent: 'amber', count: 95 },
              { icon: FiStar, name: 'History & Culture', accent: 'gray', count: 110 },
              { icon: FiHeart, name: 'Art & Design', accent: 'amber', count: 70 },
              { icon: FiGlobe, name: 'City Tours', accent: 'gray', count: 150 },
              { icon: FiAward, name: 'Local Experiences', accent: 'amber', count: 90 },
              { icon: FiShield, name: 'Private Tours', accent: 'gray', count: 60 },
            ].map((cat, idx) => (
              <Link
                key={idx}
                href={`/explore?category=${encodeURIComponent(cat.name)}`}
                className="p-6 text-center group bg-gray-800 rounded-xl hover:-translate-y-2 transition-all duration-300 shadow-xl border border-gray-700 hover:border-amber-500"
              >
                <cat.icon
                  className={`mx-auto mb-4 ${cat.accent === 'amber' ? 'text-amber-500' : 'text-gray-400'} group-hover:scale-125 transition-transform duration-300`}
                  size={48}
                />
                <h3 className="font-semibold text-white mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-500">{cat.count} tours</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Featured Destinations (Dark Overlay) */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Top Destinations</h2>
            <p className="text-xl text-gray-400">
              Explore the world's most exciting cities with local experts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                city: 'Paris', 
                country: 'France',
                image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800', 
                guides: 45,
                tours: 128 
              },
              { 
                city: 'Tokyo', 
                country: 'Japan',
                image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800', 
                guides: 38,
                tours: 95 
              },
              { 
                city: 'New York', 
                country: 'USA',
                image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800', 
                guides: 52,
                tours: 156 
              },
            ].map((dest, idx) => (
              <Link
                key={idx}
                href={`/explore?city=${dest.city}`}
                className="relative h-96 rounded-2xl overflow-hidden group shadow-xl border border-gray-700 hover:border-amber-500"
              >
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-4xl font-extrabold mb-2 text-amber-300">{dest.city}</h3>
                  <p className="text-gray-400 mb-4">{dest.country}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-300">
                    <span className="flex items-center gap-2">
                      <FiUsers className="text-amber-500" /> {dest.guides} guides
                    </span>
                    <span className="flex items-center gap-2">
                      <FiMap className="text-amber-500" /> {dest.tours} tours
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Why Choose Us (Dark Background) */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Why Choose LocalGuide?</h2>
            <p className="text-xl text-gray-400">
              We're more than just a booking platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: FiShield, 
                title: 'Verified Guides', 
                desc: 'All guides are thoroughly verified and reviewed by our community',
                color: 'amber'
              },
              { 
                icon: FiHeart, 
                title: 'Personalized Experiences', 
                desc: 'Customized tours tailored to your interests and preferences',
                color: 'amber'
              },
              { 
                icon: FiStar, 
                title: 'Top Rated', 
                desc: 'Highly rated experiences by thousands of travelers worldwide',
                color: 'amber'
              },
              { 
                icon: FiMap, 
                title: 'Local Insights', 
                desc: 'Discover hidden gems and authentic experiences only locals know',
                color: 'amber'
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-4">
                <div className={`w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-600`}>
                  <item.icon className={`text-amber-500`} size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Testimonials (Deep Contrast) */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">What Travelers Say</h2>
            <p className="text-xl text-gray-400">
              Real experiences from real travelers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Sarah Martinez', 
                location: 'California, USA',
                review: 'Absolutely amazing! Our guide Maria showed us places in Paris we never would have found. The food tour was a highlight of our trip!',
                rating: 5,
                avatar: 'https://i.pravatar.cc/150?img=1'
              },
              { 
                name: 'John Chen', 
                location: 'Singapore',
                review: 'Professional, knowledgeable, and fun. The photography walk through Tokyo was incredible. Highly recommend!',
                rating: 5,
                avatar: 'https://i.pravatar.cc/150?img=12'
              },
              { 
                name: 'Emma Wilson', 
                location: 'London, UK',
                review: 'This platform made our trip unforgettable. The local insights were invaluable. We felt like we really experienced the city!',
                rating: 5,
                avatar: 'https://i.pravatar.cc/150?img=5'
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="p-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-amber-500 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.review}"
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-amber-500"
                  />
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CTA - Become a Guide (High Contrast Amber) */}
      <section className="py-20 px-4 bg-black text-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-extrabold mb-6 text-amber-400">Become a Local Guide</h2>
            <p className="text-xl mb-10 text-gray-300">
              Share your passion for your city, meet travelers from around the world, and earn money doing what you love
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?role=guide">
                <AmberButton size="lg" className="w-full sm:w-auto">
                  Start Guiding Today
                </AmberButton>
              </Link>
              <Link href="/explore">
                <DarkOutlineButton size="lg" className="w-full sm:w-auto">
                  Browse Tours
                </DarkOutlineButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
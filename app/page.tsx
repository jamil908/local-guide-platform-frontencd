/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiMap, FiUsers, FiStar, FiHeart, FiCamera, FiCoffee, FiShield, FiAward, FiGlobe } from 'react-icons/fi';
import Button from '@/components/ui/Button';

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
    <div>
      {/* SECTION 1: Hero with Search */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-1 mb-6 animate-fade-in">
              Discover Authentic Experiences
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-100 animate-slide-up">
              Connect with passionate local experts who bring destinations to life
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto animate-slide-up animation-delay-200">
              <div className="flex flex-col sm:flex-row bg-white rounded-full shadow-2xl overflow-hidden">
                <div className="flex-1 flex items-center px-6 py-4">
                  <FiSearch className="text-gray-400 mr-3" size={24} />
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 text-gray-800 focus:outline-none text-lg"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="sm:rounded-l-none rounded-full sm:rounded-r-full m-2 sm:m-0"
                >
                  Search Tours
                </Button>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold">500+</div>
                <div className="text-blue-200 mt-1">Local Guides</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">50+</div>
                <div className="text-blue-200 mt-1">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">10k+</div>
                <div className="text-blue-200 mt-1">Happy Travelers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: How It Works */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started is easy. Just three simple steps to your perfect experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FiSearch className="text-white" size={36} />
              </div>
              <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
                Step 1
              </div>
              <h3 className="text-2xl font-bold mb-3">Find Your Guide</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse local experts based on your interests, destination, and preferred activities. Read reviews and check their expertise.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FiUsers className="text-white" size={36} />
              </div>
              <div className="inline-block bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
                Step 2
              </div>
              <h3 className="text-2xl font-bold mb-3">Book Your Experience</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose your date and send a booking request. Your guide will confirm and you'll receive all the details.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-linear-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FiMap className="text-white" size={36} />
              </div>
              <div className="inline-block bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
                Step 3
              </div>
              <h3 className="text-2xl font-bold mb-3">Explore Like a Local</h3>
              <p className="text-gray-600 leading-relaxed">
                Meet your guide and discover hidden gems, authentic experiences, and create unforgettable memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Popular Categories */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Explore by Category</h2>
            <p className="text-xl text-gray-600">
              Find experiences that match your interests
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FiCoffee, name: 'Food & Culinary', color: 'orange', count: 120 },
              { icon: FiCamera, name: 'Photography', color: 'pink', count: 85 },
              { icon: FiMap, name: 'Adventure', color: 'green', count: 95 },
              { icon: FiStar, name: 'History & Culture', color: 'purple', count: 110 },
              { icon: FiHeart, name: 'Art & Design', color: 'red', count: 70 },
              { icon: FiGlobe, name: 'City Tours', color: 'blue', count: 150 },
              { icon: FiAward, name: 'Local Experiences', color: 'yellow', count: 90 },
              { icon: FiShield, name: 'Private Tours', color: 'indigo', count: 60 },
            ].map((cat, idx) => (
              <Link
                key={idx}
                href={`/explore?category=${encodeURIComponent(cat.name)}`}
                className="card p-6 text-center group hover:-translate-y-2 transition-all duration-300"
              >
                <cat.icon
                  className={`mx-auto mb-4 text-${cat.color}-500 group-hover:scale-125 transition-transform duration-300`}
                  size={48}
                />
                <h3 className="font-semibold text-gray-900 mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-500">{cat.count} tours</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Featured Destinations */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Top Destinations</h2>
            <p className="text-xl text-gray-600">
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
                className="relative h-80 rounded-2xl overflow-hidden group shadow-lg"
              >
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">{dest.city}</h3>
                  <p className="text-blue-200 mb-4">{dest.country}</p>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="flex items-center gap-2">
                      <FiUsers /> {dest.guides} guides
                    </span>
                    <span className="flex items-center gap-2">
                      <FiMap /> {dest.tours} tours
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Why Choose Us */}
      <section className="section-padding bg-blue-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Why Choose LocalGuide?</h2>
            <p className="text-xl text-gray-600">
              We're more than just a booking platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: FiShield, 
                title: 'Verified Guides', 
                desc: 'All guides are thoroughly verified and reviewed by our community',
                color: 'blue'
              },
              { 
                icon: FiHeart, 
                title: 'Personalized Experiences', 
                desc: 'Customized tours tailored to your interests and preferences',
                color: 'red'
              },
              { 
                icon: FiStar, 
                title: 'Top Rated', 
                desc: 'Highly rated experiences by thousands of travelers worldwide',
                color: 'yellow'
              },
              { 
                icon: FiMap, 
                title: 'Local Insights', 
                desc: 'Discover hidden gems and authentic experiences only locals know',
                color: 'green'
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className={`w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`text-${item.color}-600`} size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">What Travelers Say</h2>
            <p className="text-xl text-gray-600">
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
              <div key={idx} className="card p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-500 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.review}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CTA - Become a Guide */}
      <section className="section-padding bg-gradient-to-r from-purple-600 via-blue-600 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-2 mb-6">Become a Local Guide</h2>
            <p className="text-xl mb-8 text-blue-100">
              Share your passion for your city, meet travelers from around the world, and earn money doing what you love
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?role=guide">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Start Guiding Today
                </Button>
              </Link>
              <Link href="/explore">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Browse Tours
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
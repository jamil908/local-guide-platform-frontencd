/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { User, Listing, Review } from '@/types';
import { formatDate, getInitials } from '@/lib/utils';
import { FiEdit, FiMail, FiMapPin, FiStar, FiGlobe } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import Loading from '@/components/shared/Loading';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [params.id]);

  const fetchProfile = async () => {
    try {
      const response = await api.get(`/users/${params.id}`);
      setProfile(response.data.data);

      // If guide, fetch their listings
      if (response.data.data.role === 'GUIDE') {
        try {
          const listingsRes = await api.get(`/listings?guideId=${params.id}`);
          setListings(listingsRes.data.data || []);
        } catch (error) {
          console.error('Error fetching listings:', error);
        }
      }
    } catch (error) {
      toast.error('Failed to load profile');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const isOwnProfile = currentUser?.id === params.id;

  if (loading) return <Loading />;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardBody className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Profile Picture */}
                <div className="flex-shrink-0">
                  {profile.profilePic ? (
                    <img
                      src={profile.profilePic}
                      alt={profile.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-blue-100">
                      {getInitials(profile.name)}
                    </div>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {profile.name}
                      </h1>
                      <div className="flex items-center gap-3 text-gray-600">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            profile.role === 'GUIDE'
                              ? 'bg-blue-100 text-blue-800'
                              : profile.role === 'ADMIN'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {profile.role}
                        </span>
                        {profile.role === 'GUIDE' && profile.dailyRate && (
                          <span className="text-lg font-bold text-blue-600">
                            ${profile.dailyRate}/day
                          </span>
                        )}
                      </div>
                    </div>

                    {isOwnProfile && (
                      <Link href={`/profile/${profile.id}/edit`}>
                        <Button size="sm">
                          <FiEdit className="mr-2" />
                          Edit Profile
                        </Button>
                      </Link>
                    )}
                  </div>

                  {/* Bio */}
                  {profile.bio && (
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {profile.bio}
                    </p>
                  )}

                  {/* Contact & Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiMail className="text-blue-600" />
                      <span>{profile.email}</span>
                    </div>

                    {/* Languages */}
                    {profile.languages && profile.languages.length > 0 && (
                      <div className="flex items-center gap-2">
                        <FiGlobe className="text-blue-600" />
                        <div className="flex flex-wrap gap-2">
                          {profile.languages.map((lang, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Guide Expertise */}
                    {profile.role === 'GUIDE' && profile.expertise && profile.expertise.length > 0 && (
                      <div className="flex items-center gap-2">
                        <FiStar className="text-blue-600" />
                        <div className="flex flex-wrap gap-2">
                          {profile.expertise.map((exp, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700 font-medium"
                            >
                              {exp}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tourist Preferences */}
                    {profile.role === 'TOURIST' && profile.travelPreferences && (
                      <div className="flex items-center gap-2">
                        <FiMapPin className="text-blue-600" />
                        <span className="text-gray-700">
                          Travel Interests: {profile.travelPreferences}
                        </span>
                      </div>
                    )}

                    {/* Member Since */}
                    <p className="text-sm text-gray-500">
                      Member since {formatDate(profile.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Guide's Tours */}
          {profile.role === 'GUIDE' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {isOwnProfile ? 'My Tours' : `${profile.name.split(' ')[0]}'s Tours`}
              </h2>
              
              {listings.length === 0 ? (
                <Card>
                  <CardBody className="text-center py-12">
                    <div className="text-6xl mb-4">🗺️</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      No tours yet
                    </h3>
                    <p className="text-gray-600">
                      {isOwnProfile
                        ? 'Start creating tours to showcase your expertise!'
                        : 'This guide hasn\'t created any tours yet.'}
                    </p>
                  </CardBody>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {listings.map((listing) => (
                    <Link
                      key={listing.id}
                      href={`/tours/${listing.id}`}
                      className="card hover:-translate-y-1 transition-all duration-300"
                    >
                      <img
                        src={listing.images[0] || '/placeholder.jpg'}
                        alt={listing.title}
                        className="w-full h-48 object-cover"
                      />
                      <CardBody>
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">
                          {listing.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {listing.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FiStar className="text-yellow-500" />
                            <span className="font-semibold">
                              {listing.averageRating?.toFixed(1) || 'New'}
                            </span>
                           {(listing.reviewCount ?? 0) > 0 && (
  <span className="text-sm text-gray-500">
    ({listing.reviewCount})
  </span>
)}

                          </div>
                          <span className="text-xl font-bold text-blue-600">
                            ${listing.tourFee}
                          </span>
                        </div>
                      </CardBody>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
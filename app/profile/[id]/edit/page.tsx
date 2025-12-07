/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import SingleImageUpload from '@/components/ui/SingleImageUpload';
import Loading from '@/components/shared/Loading';
import { getErrorMessage } from '@/lib/utils';

export default function ProfileEditPage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    profilePic: '',
    languages: [] as string[],
    expertise: [] as string[],
    dailyRate: '',
    travelPreferences: '',
  });
  const [languageInput, setLanguageInput] = useState('');
  const [expertiseInput, setExpertiseInput] = useState('');

  useEffect(() => {
    if (currentUser?.id !== params.id) {
      toast.error('Unauthorized');
      router.push('/');
      return;
    }
    fetchProfile();
  }, [params.id, currentUser]);

  const fetchProfile = async () => {
    try {
      const response = await api.get(`/users/${params.id}`);
      const profile = response.data.data;
      
      setFormData({
        name: profile.name || '',
        bio: profile.bio || '',
        profilePic: profile.profilePic || '',
        languages: profile.languages || [],
        expertise: profile.expertise || [],
        dailyRate: profile.dailyRate?.toString() || '',
        travelPreferences: profile.travelPreferences || '',
      });
    } catch (error) {
      toast.error('Failed to load profile');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfilePicUpload = (url: string) => {
    setFormData({ ...formData, profilePic: url });
  };

  const addLanguage = () => {
    if (languageInput.trim() && !formData.languages.includes(languageInput.trim())) {
      setFormData({
        ...formData,
        languages: [...formData.languages, languageInput.trim()],
      });
      setLanguageInput('');
    }
  };

  const removeLanguage = (lang: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((l) => l !== lang),
    });
  };

  const addExpertise = () => {
    if (expertiseInput.trim() && !formData.expertise.includes(expertiseInput.trim())) {
      setFormData({
        ...formData,
        expertise: [...formData.expertise, expertiseInput.trim()],
      });
      setExpertiseInput('');
    }
  };

  const removeExpertise = (exp: string) => {
    setFormData({
      ...formData,
      expertise: formData.expertise.filter((e) => e !== exp),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updateData: any = {
        name: formData.name,
        bio: formData.bio,
        profilePic: formData.profilePic,
        languages: formData.languages,
      };

      if (currentUser?.role === 'GUIDE') {
        updateData.expertise = formData.expertise;
        updateData.dailyRate = formData.dailyRate ? parseFloat(formData.dailyRate) : null;
      }

      if (currentUser?.role === 'TOURIST') {
        updateData.travelPreferences = formData.travelPreferences;
      }

      await api.patch(`/users/${params.id}`, updateData);
      toast.success('Profile updated successfully!');
      router.push(`/profile/${params.id}`);
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <CardHeader>
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <p className="text-gray-600 mt-2">
              Update your profile information
            </p>
          </CardHeader>

          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture */}
              <SingleImageUpload
                onUploadComplete={handleProfilePicUpload}
                existingImage={formData.profilePic}
                label="Profile Picture"
              />

              {/* Basic Info */}
              <div>
                <h2 className="text-xl font-bold mb-4">Basic Information</h2>
                
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div>
                <h2 className="text-xl font-bold mb-4">Languages</h2>
                
                <div className="flex gap-2 mb-3">
                  <Input
                    value={languageInput}
                    onChange={(e) => setLanguageInput(e.target.value)}
                    placeholder="e.g., English, Spanish, French"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addLanguage();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={addLanguage}
                    variant="outline"
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.languages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                    >
                      {lang}
                      <button
                        type="button"
                        onClick={() => removeLanguage(lang)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Guide-Specific Fields */}
              {currentUser?.role === 'GUIDE' && (
                <>
                  {/* Expertise */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Expertise</h2>
                    
                    <div className="flex gap-2 mb-3">
                      <Input
                        value={expertiseInput}
                        onChange={(e) => setExpertiseInput(e.target.value)}
                        placeholder="e.g., Food Tours, History, Photography"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addExpertise();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={addExpertise}
                        variant="outline"
                      >
                        Add
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {formData.expertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center gap-2"
                        >
                          {exp}
                          <button
                            type="button"
                            onClick={() => removeExpertise(exp)}
                            className="text-purple-600 hover:text-purple-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Daily Rate */}
                  <Input
                    label="Daily Rate ($)"
                    name="dailyRate"
                    type="number"
                    value={formData.dailyRate}
                    onChange={handleChange}
                    placeholder="150"
                  />
                </>
              )}

              {/* Tourist-Specific Fields */}
              {currentUser?.role === 'TOURIST' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Travel Preferences
                  </label>
                  <textarea
                    name="travelPreferences"
                    value={formData.travelPreferences}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Adventure, Food, Culture, Photography"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.back()}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={saving}
                  className="flex-1"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
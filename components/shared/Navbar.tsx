'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">🗺️ LocalGuide</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/explore" className="text-gray-700 hover:text-blue-600 transition">
              Explore Tours
            </Link>
            
            {!user ? (
              <>
                <Link href="/auth/register?role=guide" className="text-gray-700 hover:text-blue-600 transition">
                  Become a Guide
                </Link>
                <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 transition">
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                {user.role === 'TOURIST' && (
                  <Link href="/dashboard/tourist" className="text-gray-700 hover:text-blue-600 transition">
                    My Bookings
                  </Link>
                )}
                {user.role === 'GUIDE' && (
                  <Link href="/dashboard/guide" className="text-gray-700 hover:text-blue-600 transition">
                    Dashboard
                  </Link>
                )}
                {user.role === 'ADMIN' && (
                  <Link href="/dashboard/admin" className="text-gray-700 hover:text-blue-600 transition">
                    Admin Panel
                  </Link>
                )}
                <Link href={`/profile/${user.id}`} className="flex items-center text-gray-700 hover:text-blue-600 transition">
                  <FiUser className="mr-2" /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-600 hover:text-red-700 transition"
                >
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/explore" 
                className="text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Explore Tours
              </Link>
              {!user ? (
                <>
                  <Link 
                    href="/auth/register?role=guide" 
                    className="text-gray-700 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Become a Guide
                  </Link>
                  <Link 
                    href="/auth/login" 
                    className="text-gray-700 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/auth/register" 
                    className="text-blue-600 font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  {user.role === 'TOURIST' && (
                    <Link 
                      href="/dashboard/tourist" 
                      className="text-gray-700 hover:text-blue-600"
                      onClick={() => setIsOpen(false)}
                    >
                      My Bookings
                    </Link>
                  )}
                  {user.role === 'GUIDE' && (
                    <Link 
                      href="/dashboard/guide" 
                      className="text-gray-700 hover:text-blue-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  {user.role === 'ADMIN' && (
                    <Link 
                      href="/dashboard/admin" 
                      className="text-gray-700 hover:text-blue-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link 
                    href={`/profile/${user.id}`} 
                    className="text-gray-700 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="text-left text-red-600">
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
// /* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input'; // Assuming Input component is functional and themeable
import { getErrorMessage } from '@/lib/utils';
import { FiUser, FiMail, FiLock, FiCheckCircle } from 'react-icons/fi'; // Icons for better design

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const roleParam = searchParams.get('role');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: roleParam === 'guide' ? 'GUIDE' : 'TOURIST',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  // ... (Validation and Handlers remain the same) ...
  const validate = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await api.post('/auth/register', registerData);
      
      login(response.data.data.token);
      toast.success('Registration successful! Welcome!');
      
      // Redirect based on role
      if (formData.role === 'GUIDE') {
        router.push('/dashboard/guide');
      } else {
        router.push('/explore');
      }
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };
  // ... (End of Handlers) ...

  return (
    // --- DESIGN CHANGE 1: Use absolute positioning for background image and set overlay ---
    <div className="min-h-screen relative flex items-center justify-center bg-gray-900">
      
      {/* Background Image Layer (You MUST replace this placeholder image path) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30" 
        style={{ backgroundImage: "url('/background-image.jpg')" }} // <-- REPLACE THIS IMAGE PATH
      />
      {/* Dark Overlay to make form readable */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content Container */}
      <div className="max-w-md w-full relative z-10">
        <div 
          className={
            // --- DESIGN CHANGE 2: Dark card styling with Amber shadow ---
            "bg-gray-900 rounded-2xl p-8 border border-amber-800 shadow-2xl transition-all duration-500 " +
            "hover:shadow-amber-500/50 hover:shadow-2xl"
          }
        >
          {/* Header */}
          <div className="text-center mb-8">
            <FiCheckCircle className="mx-auto h-12 w-12 text-amber-500 mb-3" />
            <h2 className="text-3xl font-extrabold text-gray-50">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-medium text-amber-500 hover:text-amber-400 transition"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Input fields updated to use dark theme/amber accents */}
            <Input
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="John Doe"
              icon={FiUser} // Using Icon for better design
              required
              className="dark" // Add class/prop to signal dark styling to Input component
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="john@example.com"
              icon={FiMail}
              required
              className="dark"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
              icon={FiLock}
              required
              className="dark"
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="••••••••"
              icon={FiLock}
              required
              className="dark"
            />

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Register as
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                // --- DESIGN CHANGE 3: Dark/Amber select style ---
                className="w-full px-4 py-2.5 border border-gray-700 rounded-lg focus:outline-none bg-gray-800 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="TOURIST" className="bg-gray-800">Tourist - Discover amazing experiences</option>
                <option value="GUIDE" className="bg-gray-800">Guide - Share your local expertise</option>
              </select>
            </div>

            <Button
              type="submit"
              variant="primary" // Assuming primary maps to a solid color
              size="lg"
              className="w-full bg-amber-600 hover:bg-amber-500 text-gray-900 font-bold" // Amber button styling
              isLoading={loading}
            >
              Create Account
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-gray-400">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-amber-500 hover:text-amber-400">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-amber-500 hover:text-amber-400">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// NOTE: You must ensure your 'Input' component accepts the 'dark' prop or 
// the new Tailwind classes and applies the correct dark theme styling 
// (e.g., bg-gray-800, border-gray-700, focus:ring-amber-500).



// // app/auth/register/page.tsx
// import { Suspense } from 'react';
// import Loading from '@/components/shared/Loading'; // Import your Loading component
// import RegisterForm from './RegisterForm'; 

// export default function RegisterPage() {
//   return (
//     // Wrap the component using client-only hooks in a Suspense boundary
//     // The fallback is what is shown during the initial server render
//     <Suspense 
//       fallback={
//         <Loading color="border-amber-500" className="bg-gray-900 min-h-screen" />
//       }
//     >
//       <RegisterForm></RegisterForm>
//     </Suspense>
//   );
// }
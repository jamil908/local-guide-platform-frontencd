// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import api from '@/lib/api';
// import { useAuth } from '@/contexts/AuthContext';
// import toast from 'react-hot-toast';
// import Button from '@/components/ui/Button';
// import Input from '@/components/ui/Input';
// import { getErrorMessage } from '@/lib/utils';

// export default function LoginPage() {
//   const router = useRouter();
//   const { login } = useAuth();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<any>({});

//   const validate = () => {
//     const newErrors: any = {};

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validate()) return;

//     setLoading(true);

//     try {
//       const response = await api.post('/auth/login', formData);
      
//       login(response.data.data.token);
//       toast.success('Login successful!');
      
//       const userRole = response.data.data.user.role;
      
//       // Redirect based on role
//       if (userRole === 'ADMIN') {
//         router.push('/dashboard/admin');
//       } else if (userRole === 'GUIDE') {
//         router.push('/dashboard/guide');
//       } else {
//         router.push('/explore');
//       }
//     } catch (error: any) {
//       toast.error(getErrorMessage(error));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (errors[e.target.name]) {
//       setErrors({ ...errors, [e.target.name]: '' });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full">
//         <div className="bg-white rounded-2xl shadow-2xl p-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="text-5xl mb-4">🗺️</div>
//             <h2 className="text-3xl font-extrabold text-gray-900">
//               Welcome back
//             </h2>
//             <p className="mt-2 text-sm text-gray-600">
//               Do not have an account?{' '}
//               <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition">
//                 Sign up
//               </Link>
//             </p>
//           </div>

//           {/* Demo Credentials */}
//           <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//             <p className="text-sm font-semibold text-blue-900 mb-2">Demo Accounts:</p>
//             <div className="text-xs text-blue-800 space-y-1">
//               <p>Tourist: tourist@test.com / password123</p>
//               <p>Guide: guide@test.com / password123</p>
//               <p>Admin: admin@localguide.com / admin123</p>
//             </div>
//           </div>

//           {/* Form */}
//           <form className="space-y-5" onSubmit={handleSubmit}>
//             <Input
//               label="Email Address"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               error={errors.email}
//               placeholder="john@example.com"
//               required
//             />

//             <Input
//               label="Password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               error={errors.password}
//               placeholder="••••••••"
//               required
//             />

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
//                   Forgot password?
//                 </Link>
//               </div>
//             </div>

//             <Button
//               type="submit"
//               variant="primary"
//               size="lg"
//               className="w-full"
//               isLoading={loading}
//             >
//               Sign in
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


// pages/auth/LoginPage.tsx (Redesigned with Black, Amber, and Background Image)
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { getErrorMessage } from '@/lib/utils';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'; // Icons for better design

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  // ... (Validation and Handlers remain the same) ...
  const validate = () => {
    const newErrors: any = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      
      login(response.data.data.token);
      toast.success('Login successful!');
      
      const userRole = response.data.data.user.role;
      
      // Redirect based on role
      if (userRole === 'ADMIN') {
        router.push('/dashboard/admin');
      } else if (userRole === 'GUIDE') {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };
  // ... (End of Handlers) ...

  return (
    // --- DESIGN CHANGE 1: Use absolute positioning for background image and set overlay ---
    <div className="min-h-screen relative flex items-center justify-center bg-gray-900">
      
      {/* Background Image Layer (Use the same background as RegisterPage) */}
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
            <FiLogIn className="mx-auto h-12 w-12 text-amber-500 mb-3" />
            <h2 className="text-3xl font-extrabold text-gray-50">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Do not have an account?{' '}
              <Link 
                href="/register" 
                className="font-medium text-amber-500 hover:text-amber-400 transition"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Credentials - Updated to match dark theme */}
          <div className="mb-6 p-4 bg-amber-900/40 rounded-lg border border-amber-800/80">
            <p className="text-sm font-semibold text-amber-300 mb-2">Demo Accounts:</p>
            <div className="text-xs text-amber-100 space-y-1">
              <p>Tourist: <span className="font-mono">tourist@test.com</span> / <span className="font-mono">password123</span></p>
              <p>Guide: <span className="font-mono">guide@test.com</span> / <span className="font-mono">password123</span></p>
              <p>Admin: <span className="font-mono">localguide@admin.com</span> / <span className="font-mono">addmin123</span></p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="john@example.com"
              icon={FiMail} // Using Icon (assuming updated Input supports it)
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
              icon={FiLock} // Using Icon
              required
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* Checkbox styling update */}
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-700 bg-gray-800 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link 
                  href="/forgot-password" 
                  className="font-medium text-amber-500 hover:text-amber-400"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              // Amber button styling
              className="w-full bg-amber-600 hover:bg-amber-500 text-gray-900 font-bold" 
              isLoading={loading}
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
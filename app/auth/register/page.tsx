// /* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Suspense } from 'react';
import Loading from '@/components/shared/Loading'; // Import your Loading component
import RegisterForm from './RegisterForm'; 

export default function RegisterPage() {
  return (
    // Wrap the component using client-only hooks in a Suspense boundary
    // The fallback is what is shown during the initial server render
    <Suspense 
      fallback={
        <Loading color="border-amber-500" className="bg-gray-900 min-h-screen" />
      }
    >
      <RegisterForm></RegisterForm>
    </Suspense>
  );
}
'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card, { CardBody } from '@/components/ui/Card';
import { FiXCircle } from 'react-icons/fi';

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full">
        <CardBody className="text-center py-12">
          {/* Failed Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiXCircle className="text-red-600" size={48} />
          </div>

          {/* Failed Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Failed
          </h1>
          <p className="text-gray-600 mb-8">
            Unfortunately, your payment could not be processed. Please try again or contact support if the problem persists.
          </p>

          {/* Possible Reasons */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left">
            <h3 className="font-semibold text-sm text-gray-900 mb-2">
              Common reasons:
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Insufficient funds</li>
              <li>• Card declined by bank</li>
              <li>• Incorrect card details</li>
              <li>• Payment timeout</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href={`/tours/${bookingId}`} className="block">
              <Button className="w-full">
                Try Again
              </Button>
            </Link>
            <Link href="/dashboard/tourist" className="block">
              <Button variant="outline" className="w-full">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/contact" className="block">
              <Button variant="secondary" className="w-full">
                Contact Support
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}



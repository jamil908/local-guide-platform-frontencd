/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { FiX, FiStar } from 'react-icons/fi';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Button from './Button';
import { getErrorMessage } from '@/lib/utils';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  listingId: string;
  listingTitle: string;
  onReviewSubmitted: () => void;
}

export default function ReviewModal({
  isOpen,
  onClose,
  bookingId,
  listingId,
  listingTitle,
  onReviewSubmitted,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (comment.trim().length < 10) {
      toast.error('Review must be at least 10 characters');
      return;
    }

    setSubmitting(true);

    try {
      await api.post('/reviews', {
        listingId,
        bookingId,
        rating,
        comment: comment.trim(),
      });

      toast.success('Review submitted successfully!');
      onReviewSubmitted();
      onClose();
      
      // Reset form
      setRating(0);
      setComment('');
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitting) return;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Write a Review</h2>
            <p className="text-gray-600 text-sm mt-1">{listingTitle}</p>
          </div>
          <button
            onClick={handleClose}
            disabled={submitting}
            className="p-2 hover:bg-gray-100 rounded-full transition disabled:opacity-50"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Your Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <FiStar
                    size={40}
                    className={
                      star <= (hoverRating || rating)
                        ? 'text-yellow-500 fill-current'
                        : 'text-gray-300'
                    }
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-3 text-lg font-semibold text-gray-700">
                  {rating === 1 && '😞 Poor'}
                  {rating === 2 && '😕 Fair'}
                  {rating === 3 && '😊 Good'}
                  {rating === 4 && '😄 Very Good'}
                  {rating === 5 && '🤩 Excellent'}
                </span>
              )}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review <span className="text-red-500">*</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Share details of your experience with this tour. What did you like? What could be improved?"
              required
              minLength={10}
              maxLength={1000}
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-500">
                Minimum 10 characters
              </p>
              <p className="text-xs text-gray-500">
                {comment.length}/1000
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-sm text-blue-900 mb-2">
              💡 Review Tips:
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Be specific about what you liked or didn't like</li>
              <li>• Mention the guide's knowledge and friendliness</li>
              <li>• Describe the tour highlights</li>
              <li>• Be honest but respectful</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={submitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={submitting}
              className="flex-1"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
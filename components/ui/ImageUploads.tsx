/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useState, useRef } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Button from './Button';
import { LoadingSpinner } from '../shared/Loading';

interface ImageUploadProps {
  onUploadComplete: (urls: string[]) => void;
  maxImages?: number;
  existingImages?: string[];
}

export default function ImageUpload({
  onUploadComplete,
  maxImages = 5,
  existingImages = [],
}: ImageUploadProps) {
  const [images, setImages] = useState<string[]>(existingImages);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>(existingImages);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed max
    if (images.length + files.length > maxImages) {
      toast.error(`You can only upload up to ${maxImages} images`);
      return;
    }

    // Validate file types and sizes
    const validFiles: File[] = [];
    const maxSize = 5 * 1024 * 1024; // 5MB

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        return;
      }
      if (file.size > maxSize) {
        toast.error(`${file.name} is too large (max 5MB)`);
        return;
      }
      validFiles.push(file);
    });

    if (validFiles.length === 0) return;

    // Create local previews
    const newPreviews = await Promise.all(
      validFiles.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      })
    );

    setPreviews([...previews, ...newPreviews]);

    // Upload to server
    await uploadImages(validFiles);
  };

  const uploadImages = async (files: File[]) => {
    setUploading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images', file);
      });

      const response = await api.post('/upload/multiple', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const uploadedUrls = response.data.data.urls;
      const newImages = [...images, ...uploadedUrls];
      setImages(newImages);
      onUploadComplete(newImages);
      toast.success('Images uploaded successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Upload failed');
      // Remove failed previews
      setPreviews(previews.slice(0, images.length));
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
    onUploadComplete(newImages);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tour Images <span className="text-red-500">*</span>
        <span className="text-gray-500 text-xs ml-2">
          (Upload up to {maxImages} images, max 5MB each)
        </span>
      </label>

      {/* Preview Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {previews.map((preview, index) => (
          <div
            key={index}
            className="relative group aspect-video rounded-lg overflow-hidden border-2 border-gray-200"
          >
            <img
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Delete button */}
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FiX size={16} />
            </button>

            {/* Uploading overlay */}
            {uploading && index >= images.length && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <LoadingSpinner size="sm" />
              </div>
            )}
          </div>
        ))}

        {/* Upload button */}
        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="aspect-video rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 flex flex-col items-center justify-center text-gray-500 hover:text-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <FiUpload size={32} className="mb-2" />
                <span className="text-sm font-medium">Upload Images</span>
                <span className="text-xs">JPEG, PNG, GIF, WEBP</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Info text */}
      {images.length === 0 && (
        <p className="text-sm text-red-500">At least one image is required</p>
      )}
      {images.length > 0 && (
        <p className="text-sm text-gray-500">
          {images.length} of {maxImages} images uploaded
        </p>
      )}
    </div>
  );
}
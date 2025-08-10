'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
      <div className="text-center px-6 py-12">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-red-600 mb-4">500</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Đã xảy ra lỗi
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Rất tiếc, đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium mr-4"
          >
            Thử lại
          </button>
          
          <Link 
            href="/"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            Về trang chủ
          </Link>
          
          <div className="text-sm text-gray-500 mt-4">
            <p>Hoặc truy cập các trang chính:</p>
            <div className="flex justify-center space-x-4 mt-2">
              <Link href="/lifestyle" className="text-green-600 hover:underline">
                Lifestyle
              </Link>
              <Link href="/location" className="text-green-600 hover:underline">
                Vị trí
              </Link>
              <Link href="/storyline" className="text-green-600 hover:underline">
                Câu chuyện
              </Link>
              <Link href="/news" className="text-green-600 hover:underline">
                Tin tức
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
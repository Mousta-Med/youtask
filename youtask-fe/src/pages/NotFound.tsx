import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ExclamationTriangleIcon,
  HomeIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Go back to previous page, or home if no history
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-8 text-center">
          {/* 404 Icon */}
          <div className="relative mb-6">
            <ExclamationTriangleIcon className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600" />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              !
            </div>
          </div>

          {/* 404 Text */}
          <div className="mb-6">
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90 mb-3">
              Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Sorry, we couldn't find the page you're looking for. The page may
              have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoBack}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg transition px-4 py-3 text-sm bg-blue-500 text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Go Back
            </button>

            <Link
              to="/"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg transition px-4 py-3 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <HomeIcon className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              If you believe this is an error, please contact support or try
              refreshing the page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

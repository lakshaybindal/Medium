import React from "react";

export default function BlogSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-pulse">
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 w-24 rounded"></div>
        <div className="h-8 bg-gray-300 dark:bg-gray-700 w-20 rounded-lg"></div>
      </div>

      <div className="mb-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 w-32 rounded"></div>
      </div>

      <div className="space-y-6">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="space-y-3 border-b pb-6">
            <div className="h-4 bg-gray-200 dark:bg-gray-500 w-1/4 rounded"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-500 w-2/4 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-500 w-3/5 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-500 w-1/5 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

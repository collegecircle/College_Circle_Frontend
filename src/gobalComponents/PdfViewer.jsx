import React, { useState } from "react";
import { X, Download } from "lucide-react";

export default function PdfViewer({ pdfUrl, onClose }) {
  console.log(pdfUrl);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6
                    bg-gray bg-opacity-30 backdrop-blur-md"
    >
      <div
        className="bg-gray-800 rounded-lg w-full max-w-7xl h-[95vh] md:h-[90vh] lg:h-[85vh] 
                      flex flex-col shadow-2xl border border-[#fdc700]/30"
      >
        <div className="py-3 px-4 flex items-center justify-between border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
          <h3 className="text-base font-medium text-[#fdc700]">
            College Circle
          </h3>
          <div className="flex items-center space-x-2">
            <button
              className="text-gray-300 hover:text-[#fdc700] hover:bg-gray-700 p-1.5 rounded-md"
              onClick={() => window.open(pdfUrl, "_blank")}
              title="Open in new tab"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600 p-1.5 rounded-md"
              title="Close viewer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        {/* PDF Content */}
        <div className="flex-1 bg-white overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="flex flex-col items-center">
                <svg
                  className="animate-spin h-10 w-10 text-[#fdc700] mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z"
                  ></path>
                </svg>
                <span className="text-gray-600">Loading document...</span>
              </div>
            </div>
          )}

          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            className="w-full h-full"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}

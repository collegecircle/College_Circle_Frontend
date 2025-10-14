// import React, { useState } from "react";
// import { X, Download } from "lucide-react";

// export default function PdfViewer({ pdfUrl, onClose }) {
//   console.log(pdfUrl);

//   const [isLoading, setIsLoading] = useState(true);

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6
//                     bg-gray bg-opacity-30 backdrop-blur-md"
//     >
//       <div
//         className="bg-gray-800 rounded-lg w-full max-w-7xl h-[95vh] md:h-[90vh] lg:h-[85vh] 
//                       flex flex-col shadow-2xl border border-[#fdc700]/30"
//       >
//         <div className="py-3 px-4 flex items-center justify-between border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
//           <h3 className="text-base font-medium text-[#fdc700]">
//             College Circle
//           </h3>
//           <div className="flex items-center space-x-2">
//             <button
//               className="text-gray-300 hover:text-[#fdc700] hover:bg-gray-700 p-1.5 rounded-md"
//               onClick={() => window.open(pdfUrl, "_blank")}
//               title="Open in new tab"
//             >
//               <Download className="h-5 w-5" />
//             </button>
//             <button
//               onClick={onClose}
//               className="bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600 p-1.5 rounded-md"
//               title="Close viewer"
//             >
//               <X className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//         {/* PDF Content */}
//         <div className="flex-1 bg-white overflow-hidden relative">
//           {isLoading && (
//             <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//               <div className="flex flex-col items-center">
//                 <svg
//                   className="animate-spin h-10 w-10 text-[#fdc700] mb-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z"
//                   ></path>
//                 </svg>
//                 <span className="text-gray-600">Loading document...</span>
//               </div>
//             </div>
//           )}

//           <iframe
//             src={pdfUrl}
//             title="PDF Viewer"
//             className="w-full h-full"
//             onLoad={() => setIsLoading(false)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useState } from "react";
// import { X, Download } from "lucide-react";

// // Utility: Extract Google Drive File ID
// function getGoogleDriveFileId(url) {
//   const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
//   return match ? match[1] : null;
// }

// export default function PdfViewer({ pdfUrl, onClose }) {
//   const [isLoading, setIsLoading] = useState(true);

//   const fileId = getGoogleDriveFileId(pdfUrl);
//   const isGoogleDrive = Boolean(fileId);

//   const iframeUrl = isGoogleDrive
//     ? `https://drive.google.com/file/d/${fileId}/preview`
//     : pdfUrl;

//   const downloadUrl = isGoogleDrive
//     ? `https://drive.google.com/uc?export=download&id=${fileId}`
//     : pdfUrl;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6
//                  bg-gray bg-opacity-30 backdrop-blur-md"
//     >
//       <div
//         className="bg-gray-800 rounded-lg w-full max-w-7xl h-[95vh] md:h-[90vh] lg:h-[85vh] 
//                    flex flex-col shadow-2xl border border-[#fdc700]/30"
//       >
//         <div className="py-3 px-4 flex items-center justify-between border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
//           <h3 className="text-base font-medium text-[#fdc700]">
//             College Circle
//           </h3>
//           <div className="flex items-center space-x-2">
//             <button
//               className="text-gray-300 hover:text-[#fdc700] hover:bg-gray-700 p-1.5 rounded-md"
//               onClick={() => window.open(downloadUrl, "_blank")}
//               title="Download PDF"
//             >
//               <Download className="h-5 w-5" />
//             </button>
//             <button
//               onClick={onClose}
//               className="bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600 p-1.5 rounded-md"
//               title="Close viewer"
//             >
//               <X className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* PDF Viewer */}
//         <div className="flex-1 bg-white overflow-hidden relative">
//           {isLoading && (
//             <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//               <div className="flex flex-col items-center">
//                 <svg
//                   className="animate-spin h-10 w-10 text-[#fdc700] mb-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z"
//                   ></path>
//                 </svg>
//                 <span className="text-gray-600">Loading document...</span>
//               </div>
//             </div>
//           )}

//           <iframe
//             src={iframeUrl}
//             title="PDF Viewer"
//             className="w-full h-full"
//             onLoad={() => setIsLoading(false)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import { X, Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

// Utility: Extract Google Drive File ID
function getGoogleDriveFileId(url) {
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export default function PdfViewer({ pdfUrl, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [pdfDoc, setPdfDoc] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const fileId = getGoogleDriveFileId(pdfUrl);
  const isGoogleDrive = Boolean(fileId);

  const downloadUrl = isGoogleDrive
    ? `https://drive.google.com/uc?export=download&id=${fileId}`
    : pdfUrl;

  const directUrl = isGoogleDrive
    ? `https://drive.google.com/uc?id=${fileId}&export=download`
    : pdfUrl;

  useEffect(() => {
    loadPdfJs();
  }, []);

  useEffect(() => {
    if (window.pdfjsLib && directUrl) {
      loadPdf();
    }
  }, [directUrl]);

  useEffect(() => {
    if (pdfDoc && currentPage) {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage, scale]);

  const loadPdfJs = () => {
    if (window.pdfjsLib) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      if (directUrl) loadPdf();
    };
    script.onerror = () => {
      setError('Failed to load PDF library');
      setIsLoading(false);
    };
    document.head.appendChild(script);
  };

  const loadPdf = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const loadingTask = window.pdfjsLib.getDocument({
        url: directUrl,
        withCredentials: false,
        isEvalSupported: false,
      });

      const pdf = await loadingTask.promise;
      setPdfDoc(pdf);
      setNumPages(pdf.numPages);
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading PDF:', err);
      setError('Unable to load PDF. The file may be restricted or unavailable.');
      setIsLoading(false);
    }
  };

  const renderPage = async (pageNum) => {
    if (!pdfDoc || !canvasRef.current) return;

    try {
      const page = await pdfDoc.getPage(pageNum);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      const container = containerRef.current;
      const containerWidth = container?.clientWidth || window.innerWidth;

      const viewport = page.getViewport({ scale: 1.0 });
      const displayScale = (containerWidth * 0.95) / viewport.width;
      const scaledViewport = page.getViewport({ scale: displayScale * scale });

      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;

      const renderContext = {
        canvasContext: context,
        viewport: scaledViewport,
      };

      await page.render(renderContext).promise;
    } catch (err) {
      console.error('Error rendering page:', err);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-gray-900 bg-opacity-30 backdrop-blur-md">
      <div className="bg-gray-800 rounded-lg w-full max-w-7xl h-[95vh] md:h-[90vh] lg:h-[85vh] flex flex-col shadow-2xl border border-[#fdc700]/30">
        {/* Header */}
        <div className="py-3 px-4 flex items-center justify-between border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
          <h3 className="text-base font-medium text-[#fdc700]">
            College Circle
          </h3>
          <div className="flex items-center space-x-2">
            <button
              className="text-gray-300 hover:text-[#fdc700] hover:bg-gray-700 p-1.5 rounded-md transition-colors"
              onClick={() => window.open(downloadUrl, "_blank")}
              title="Download PDF"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600 p-1.5 rounded-md transition-colors"
              title="Close viewer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Controls */}
        {!isLoading && !error && pdfDoc && (
          <div className="py-2 px-4 flex items-center justify-between border-b border-gray-700 bg-gray-800">
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
                className="p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300"
                title="Previous page"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm text-gray-300 px-2">
                {currentPage} / {numPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage >= numPages}
                className="p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300"
                title="Next page"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
                className="p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300"
                title="Zoom out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <span className="text-sm text-gray-300 px-2">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={scale >= 3.0}
                className="p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300"
                title="Zoom in"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* PDF Viewer */}
        <div
          ref={containerRef}
          className="flex-1 bg-gray-900 overflow-auto relative"
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
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
                <span className="text-gray-300">Loading PDF...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="flex flex-col items-center max-w-md p-6 text-center">
                <div className="bg-red-900/30 rounded-full p-3 mb-4">
                  <X className="h-8 w-8 text-red-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-200 mb-2">
                  Unable to Load PDF
                </h4>
                <p className="text-gray-400 mb-6">{error}</p>
                <button
                  onClick={() => window.open(downloadUrl, "_blank")}
                  className="flex items-center gap-2 bg-[#fdc700] hover:bg-[#e5b700] text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
              </div>
            </div>
          )}

          {!isLoading && !error && pdfDoc && (
            <div className="flex items-start justify-center p-4">
              <canvas
                ref={canvasRef}
                className="shadow-2xl max-w-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
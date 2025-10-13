import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PDFViewer from "../gobalComponents/PdfViewer";
const BASE_URL = import.meta.env.VITE_API_URL;
import getUserFromStorage from "../components/helpers/helper";
import axios from "axios";

import { Download, Users, Calendar, BookOpen, Eye } from "lucide-react";

const AuthorizedMaterialViewer = () => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const openPdfViewer = (url) => {
    setSelectedPdfUrl(url);
    setShowPdfViewer(true);
  };

  const [material, setMaterial] = useState(null);

  const user = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();

  const loggedInUser = user || getUserFromStorage();
  const { materialId } = useParams();

  const handleEnroll = async () => {
    try {
      setLoading(true);
      setError(null);

      const orderRes = await axios.post(
        `${BASE_URL}/course-materials/get-material-access`,
        {
          materialId: materialId,
          studentId: user?.id,
          email: user?.email,
          name: user?.name,
        }
      );

      if (
        orderRes.data?.message ==
        "This course material is free, no payment required"
      ) {
        setMaterial(orderRes.data.data);
        setLoading(false);
        return;
      }
      if (
        orderRes.data?.message ==
        "you have already registered for this course material"
      ) {
        setMaterial(orderRes.data.data);
        setLoading(false);
        return;
      }

      const {
        key,
        order_id,
        paymentId,
        amount,
        currency,
        prefill,
        theme,
        name,
      } = orderRes.data.data;

      const options = {
        key,
        amount,
        currency,
        name: name,
        description: "study material  Payment",
        order_id,
        prefill,
        theme,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${BASE_URL}/course-materials/veriify-payment-material-sucess`,
              {
                paymentId,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            alert(verifyRes.data.message || "Payment Successful!");
            if (verifyRes.data.success) {
              window.location.reload();
            }
          } catch (err) {
            setError(err.response?.data?.message);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            navigate("/study-materials");
            window.location.reload();
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message);
      console.error(err);
      //   alert(err.response?.data?.message || "Something went wrong!");
    }
  };
  useEffect(() => {
    if (loggedInUser === undefined) return;
    // Only redirect if user is not logged in AND not already on login page
    if (!loggedInUser && window.location.pathname !== "/userlogin") {
      navigate("/userlogin", { state: { from: window.location.pathname } });
    } else if (loggedInUser) {
      handleEnroll();
    }
  }, [materialId, loggedInUser, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center p-6 bg-gray-900 rounded-lg border border-gray-800 max-w-md">
          <div className="bg-red-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-red-500 mb-2">Error</h2>
          <p className="mb-4 text-gray-300">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setError(null);
                handleEnroll();
              }}
              className="px-4 py-2 bg-[#fdc700] text-black rounded-md hover:bg-[#fdc700]/90 transition-colors font-medium"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/study-materials")}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
            >
              Back to Materials
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {material ? (
        <div className="min-h-screen bg-gradient-to-br from-black via-black to-black to-slate-900 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {material.title}
              </h1>
              <p className="text-white">{material.brief}</p>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Course Card */}
              <div className="lg:col-span-2">
                <div className="bg-[#262626] rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow">
                  {/* Thumbnail */}
                  <div className="relative h-64 md:h-80 overflow-hidden bg-slate-700">
                    <img
                      src={material.thumbnileImgUrl || "/assets/cclogo.PNG"}
                      alt={material.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-yellow-500 text-slate-900 px-4 py-2 rounded-lg font-semibold text-sm">
                      {material.price === 0 ? "FREE" : `₹${material.price}`}
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 capitalize">
                      {material.title}
                    </h2>
                    <p className="text-slate-400 mb-6">{material.brief}</p>

                    {/* Meta Info */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 pb-8 border-b bg-[#262626]">
                      <div className="flex items-center gap-2 text-slate-300">
                        <BookOpen size={18} className="text-yellow-500" />
                        <span className="text-sm">
                          {material.modules.length} Modules
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Users size={18} className="text-yellow-500" />
                        <span className="text-sm">
                          {material.registeredMembers.length} Members
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Calendar size={18} className="text-yellow-500" />
                        <span className="text-sm">
                          {formatDate(material.postedOn)}
                        </span>
                      </div>
                    </div>

                    {/* Modules */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">
                        Course Modules
                      </h3>
                      <div className="space-y-3">
                        {material.modules.map((module, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-700 hover:bg-slate-600 transition-colors p-4 rounded-lg flex items-center justify-between group"
                          >
                            <span className="font-medium text-white capitalize flex-1">
                              {module.title}
                            </span>
                            <button
                              onClick={() => openPdfViewer(module.documentLink)}
                              rel="noopener noreferrer"
                              className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 p-2 rounded-lg transition-colors group-hover:scale-110"
                            >
                              <Eye size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Course ID Card */}
                <div className="bg-[#262626] p-6 rounded-xl">
                  <h4 className="text-slate-400 text-sm font-semibold mb-2">
                    COURSE ID
                  </h4>
                  <p className="text-white font-mono text-lg break-all">
                    {material.courseMaterialId}
                  </p>
                </div>

                {/* Stats Card */}
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-xl text-slate-900">
                  <h4 className="font-semibold text-lg mb-4">Quick Stats</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm opacity-90">Total Modules</p>
                      <p className="text-2xl font-bold">
                        {material.modules.length}
                      </p>
                    </div>
                    {/* <div>
                      <p className="text-sm opacity-90">Registered Members</p>
                      <p className="text-2xl font-bold">
                        {material.registeredMembers.length}
                      </p>
                    </div> */}
                    {/* <div>
                      <p className="text-sm opacity-90">Status</p>
                      <p className="text-lg font-semibold">Active</p>
                    </div> */}
                  </div>
                </div>

                {/* Dates Card */}
                <div className="bg-[#262626] p-6 rounded-xl">
                  <h4 className="text-white font-semibold mb-4">Timeline</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-slate-400">Posted On</p>
                      <p className="text-white font-medium">
                        {formatDate(material.postedOn)}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400">Last Updated</p>
                      <p className="text-white font-medium">
                        {formatDate(material.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showPdfViewer && selectedPdfUrl && (
              <PDFViewer
                pdfUrl={selectedPdfUrl}
                onClose={() => setShowPdfViewer(false)}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center p-6 bg-gray-900 rounded-lg border border-gray-800">
            <h2 className="text-xl font-bold text-gray-300 mb-2">
              No study material found
            </h2>
            <p className="mb-4 text-gray-400">
              Unable to load study Materials information.
            </p>
            <button
              onClick={() => navigate("/study-materials")}
              className="text-[#fdc700] hover:underline"
            >
              Back to Materials
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorizedMaterialViewer;

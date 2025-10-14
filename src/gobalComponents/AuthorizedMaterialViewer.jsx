import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PDFViewer from "../gobalComponents/PdfViewer";
import getUserFromStorage from "../components/helpers/helper";
import axios from "axios";
import {
  Download,
  Users,
  Calendar,
  BookOpen,
  Eye,
  ArrowRight,
} from "lucide-react";
import { div } from "motion/react-client";

const BASE_URL = import.meta.env.VITE_API_URL;

const AuthorizedMaterialViewer = () => {
  const { materialId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.user);
  const loggedInUser = user || getUserFromStorage();

  const [material, setMaterial] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [showPdfViewer, setShowPdfViewer] = useState(false);

  const openPdfViewer = (url) => {
    setSelectedPdfUrl(url);
    setShowPdfViewer(true);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp?._seconds * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/userlogin", { state: { from: window.location.pathname } });
    }
  }, [loggedInUser, navigate]);

  const fetchMaterial = async () => {
    if (!loggedInUser) return;
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${BASE_URL}/course-materials/course-material-verify-access/${materialId}`,
        { studentId: loggedInUser.id }
      );

      const data = res.data.data;
      setMaterial(data);
      setHasAccess(data.isEnrolled);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch material");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterial();
  }, [materialId, loggedInUser]);

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
        fetchMaterial();
        return;
      }
      if (
        orderRes.data?.message ==
        "you have already registered for this course material"
      ) {
        fetchMaterial();
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

            if (verifyRes?.data.success == 1) {
              setLoading(true);
              await fetchMaterial();
              setLoading(false);
            }
          } catch (err) {
            setError(err.response?.data?.message);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message);
      console.error(err);
    }
  };

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
          <h2 className="text-xl font-bold text-red-500 mb-2">Error</h2>
          <p className="mb-4 text-gray-300">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleEnroll}
              className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-colors font-medium"
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

  if (!material) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Material not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-slate-900 p-4 md:p-8">
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
                      {hasAccess
                        ? material?.modules?.length
                        : material?.countOfModules}
                      Modules
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Users size={18} className="text-yellow-500" />
                    <span className="text-sm">
                      {material?.registeredMembers?.length || 0} Members
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
                  <div className="flex justify-between  items-center">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Course Modules
                    </h3>
                    {!hasAccess && (
                      <div className="bg-yellow-500 text-slate-900 px-4 py-2  font-semibold text-sm flex gap-2 justify-center items-center rounded-full">
                        <button onClick={() => handleEnroll()}>
                          Enroll now{" "}
                        </button>

                        {/* <ArrowRight size={20} /> */}
                        <ArrowRight size={20} />
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    {hasAccess && (
                      <>
                        {material.modules.map((module, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-800 hover:bg-gray-700 transition-colors p-4 md:p-5 rounded-lg flex items-center justify-between shadow-sm"
                          >
                            <div className="flex items-center gap-4">
                              {/* Module Number */}
                              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-600 text-white font-medium">
                                {idx + 1}
                              </div>

                              {/* Module Title */}
                              <span className="text-white font-medium text-base md:text-lg capitalize">
                                {module.title}
                              </span>
                            </div>

                            {/* View Button */}
                            <button
                              onClick={() => openPdfViewer(module.documentLink)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 p-2 md:p-3 rounded-lg transition-transform transform hover:scale-105"
                              title="View Document"
                            >
                              <Eye size={20} />
                            </button>
                          </div>
                        ))}
                      </>
                    )}
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
                {material.id}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-xl text-slate-900">
              <h4 className="font-semibold text-lg mb-4">Quick Stats</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm opacity-90">
                    Total Modules :{" "}
                    {hasAccess
                      ? material?.modules?.length
                      : material?.countOfModules}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
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
  );
};

export default AuthorizedMaterialViewer;

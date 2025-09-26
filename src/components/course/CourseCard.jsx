import { useState } from "react";
import { ArrowRight, Users, Calendar, Crown } from "lucide-react";
import PDFViewer from "./PDFViewer";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_URL;
const CourseCard = ({ material, onOpenPDF }) => {
  const [showPDF, setShowPDF] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.user);
  const handleClick = async () => {
    try {
      if (material.price === 0) {
        onOpenPDF && onOpenPDF();
        return;
      }

      const orderRes = await axios.post(
        `${BASE_URL}/course-materials/get-material-access`,
        {
          materialId: material.id,
          studentId: user?.id,
          email: user?.email,
          name: user?.name,
        }
      );

      if (
        orderRes.data?.message ==
        "you have already registered for this course material"
      ) {
        alert("You have already registered for this course material.");
        navigate("/dashboard", {
          state: { tab: "materials" },
        });
        return;
      }

      const { key, order_id, paymentId, amount, currency, prefill, theme } =
        orderRes.data.data;

      const options = {
        key,
        amount,
        currency,
        name: material.title,
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
              navigate("/dashboard", {
                state: { tab: "materials" },
              });
            }
          } catch (err) {
            console.error(err);
            alert(
              err.response?.data?.message ||
                "Payment verification failed. Contact support."
            );
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 group hover:shadow-xl hover:shadow-black/10 transition-all duration-500 cursor-pointer border border-black/5 hover:border-yellow-400/30 relative overflow-hidden w-full">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-500"></div>

      {/* Badge */}
      <div className="absolute top-4 right-4 z-10">
        {material.price > 0 ? (
          <div className="bg-black text-white px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center space-x-1">
            <Crown className="w-3 h-3" />
            <span>PREMIUM</span>
          </div>
        ) : (
          <div className="bg-green-600 text-white px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            FREE
          </div>
        )}
      </div>

      {/* Thumbnail */}
      <div className="w-full h-40 rounded-lg overflow-hidden mb-4 shadow-md">
        <img
          src={material.thumbnileImgUrl || "/assets/cclogo.PNG"}
          alt={material.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Title & Provider */}
      <div className="mb-3">
        <h3 className="text-lg font-bold text-black mb-1 leading-snug">
          {material.title}
        </h3>
        <p className="text-black/60 text-xs font-medium">
          {material.provider ?? "college circle"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div
          className={`relative p-3 rounded-xl text-center ${
            material.price === 0
              ? "bg-gradient-to-b from-green-50 to-white border border-green-200"
              : "bg-gradient-to-b from-blue-50 to-white border border-blue-200"
          }`}
        >
          <Users
            className={`w-5 h-5 mx-auto mb-1 ${
              material.price === 0 ? "text-green-600" : "text-blue-600"
            }`}
          />
          <div className="text-sm font-bold text-gray-900">
            {material.price === 0 ? "Easy Access" : material.registeredCount}
          </div>
          <div className="text-xs text-gray-500 font-medium">
            {material.price === 0 ? "Already Enrolled" : "Students Enrolled"}
          </div>
        </div>

        <div className="p-3 bg-gradient-to-b from-yellow-50 to-white border border-yellow-200 rounded-xl text-center">
          <Calendar className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
          <div className="text-sm font-semibold text-gray-900">
            {material?.postedOn
              ? new Date(material.postedOn._seconds * 1000).toLocaleDateString(
                  "en-IN",
                  { day: "2-digit", month: "short", year: "numeric" }
                )
              : "—"}
          </div>
          <div className="text-xs text-gray-500 font-medium">Posted On</div>
        </div>
      </div>

      {/* Price Section */}
      <div className="bg-gradient-to-r from-black to-black/90 rounded-lg p-4 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/70">Study material Price</span>
          <span className="text-xl font-bold text-yellow-400">
            {material.price === 0 ? "FREE" : `₹${material.price}`}
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleClick}
        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-2.5 rounded-lg font-bold text-sm hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:-translate-y-0.5"
      >
        <span>{material.price === 0 ? "Start Learning" : "Get Access"}</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* PDF Modal */}
      {showPDF && (
        <PDFViewer
          file={material.documentLink || "/path/to/your-file.pdf"}
          onClose={() => setShowPDF(false)}
        />
      )}
    </div>
  );
};

export default CourseCard;

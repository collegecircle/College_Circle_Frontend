import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User, Phone, MapPin, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_URL;
const ContactForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone is required"),
    city: Yup.string().required("City is required"),
    type: Yup.string()
      .notOneOf(["none"], "Please select a type")
      .required("Type is required"),
    message: Yup.string()
      .max(200, "Message cannot exceed 200 characters")
      .required("Message is required"),
  });

  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                animation: "spin 1s linear infinite",
                borderRadius: "50%",
                height: "8rem",
                width: "8rem",
                borderBottom: "2px solid #facc15",
                marginBottom: "1rem",
              }}
            ></div>
            <img
              src="/assets/cclogo.PNG"
              alt="Logo"
              style={{
                position: "absolute",
                height: "5rem",
                width: "5rem",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 overflow-hidden relative">
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="white"
                stroke="BLACK"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-40 h-40 md:w-56 md:h-56 bg-yellow-50 rounded-full -mr-16 -mb-16"></div>
      <div className="absolute top-0 left-0 w-28 h-28 md:w-36 md:h-36 bg-yellow-50 rounded-full -ml-8 -mt-8"></div>

      <div className="relative z-10 flex flex-col lg:flex-row">
        <div
          className="lg:w-1/2 bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 lg:p-16 flex flex-col justify-center 
        "
        >
          <h3 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Let’s <span className="text-yellow-400">Collaborate!</span>
          </h3>
          <p className="text-lg text-gray-300 mb-8">
            Time to start the conversation. Tell us a bit about you.
          </p>
        </div>

        <div className="lg:w-1/2 p-6 md:p-12 bg-white shadow-lg">
          <Formik
            initialValues={{
              name: "",
              phone: "",
              city: "",
              type: "none",
              message: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                setLoading(true);
                const response = await axios.post(
                  `${API_BASE_URL}/collaboration/contact`,
                  values
                );

                if (response?.data.status_code == 200) {
                  setLoading(false);
                  alert("Form submitted successfully!");
                  resetForm();
                } else {
                  setLoading(false);
                  alert(response?.data.message || "Something went wrong!");
                }
              } catch (err) {
                setLoading(false);
                alert(response?.data.message || "Something went wrong!");
              }
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form className="space-y-6">
                {[
                  {
                    name: "name",
                    type: "text",
                    icon: (
                      <User className="absolute left-2 top-5 text-gray-400 w-5 h-5" />
                    ),
                  },
                  {
                    name: "phone",
                    type: "tel",
                    icon: (
                      <Phone className="absolute left-2 top-5 text-gray-400 w-5 h-5" />
                    ),
                  },
                  {
                    name: "city",
                    type: "text",
                    icon: (
                      <MapPin className="absolute left-2 top-5 text-gray-400 w-5 h-5" />
                    ),
                  },
                ].map((field) => (
                  <div className="relative" key={field.name}>
                    {field.icon}
                    <Field
                      type={field.type}
                      name={field.name}
                      placeholder={
                        field.name.charAt(0).toUpperCase() + field.name.slice(1)
                      }
                      className="w-full pl-10 border-b-2 border-gray-300 bg-transparent py-3 text-lg text-gray-800 focus:border-yellow-500 focus:outline-none transition"
                    />
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                ))}

                {/* Dropdown */}
                <div className="relative">
                  <Field
                    as="select"
                    name="type"
                    className="w-full border-b-2 border-gray-300 bg-transparent py-3 text-lg text-gray-800 focus:border-yellow-500 focus:outline-none cursor-pointer"
                  >
                    <option value="none" disabled>
                      The Reason I'd like to connect :
                    </option>
                    <option value="As Collage">As College</option>
                    <option value="As Brand">As Brand</option>
                    <option value="As Company">As Company</option>
                    <option value="As recruiter">As Recruiter</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Textarea */}
                <div className="relative">
                  <MessageSquare className="absolute left-2 top-5 text-gray-400 w-5 h-5" />
                  <Field
                    as="textarea"
                    name="message"
                    rows="4"
                    maxLength="200"
                    placeholder="Brief about your requirement"
                    onChange={handleChange}
                    value={values.message}
                    className="w-full pl-10 border-b-2 border-gray-300 bg-transparent py-3 text-lg text-gray-800 focus:border-yellow-500 focus:outline-none resize-none transition"
                  />
                  <div className="text-sm text-gray-400 mt-1 text-right">
                    {values.message.length}/500
                  </div>
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-4 px-8 rounded-full text-lg tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </motion.button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

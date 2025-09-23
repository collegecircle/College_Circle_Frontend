import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createCourseMaterial } from "../../course/courseSlice"; // adjust path

// Validation Schema
const CourseMaterialSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  thumbnileImgUrl: Yup.string()
    .url("Must be a valid URL")
    .required("thumbnile image link is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price cannot be negative"), // allows 0
  brief: Yup.string()
    .max(200, "Brief must be at most 200 characters")
    .required("Brief is required"),
  documentLink: Yup.string()
    .url("Must be a valid URL")
    .required("Document link is required"),
});

const CourseMaterialForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    title: "",
    price: 0,
    brief: "",
    documentLink: "",
    thumbnileImgUrl: "",
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const newMaterial = await dispatch(createCourseMaterial(values)).unwrap();
      alert("✅ Course material created successfully!");
      resetForm();
      window.location.reload();
    } catch (err) {
      console.error("Error creating course material:", err);
      alert("❌ Failed to create course material");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-xl overflow-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create Course Material
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={CourseMaterialSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="flex flex-col">
              <label className="font-medium">Title</label>
              <Field
                name="title"
                type="text"
                className="border rounded-lg p-2 w-full"
                placeholder="Enter course title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Price */}
            <div className="flex flex-col">
              <label className="font-medium">Price</label>
              <Field
                name="price"
                type="number"
                className="border rounded-lg p-2 w-full"
                placeholder="Enter price"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Brief */}
            <div className="flex flex-col md:col-span-2">
              <label className="font-medium">Brief (max 200 chars)</label>
              <Field
                name="brief"
                as="textarea"
                rows="2"
                className="border rounded-lg p-2 w-full"
                placeholder="Enter a short brief"
              />
              <ErrorMessage
                name="brief"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="font-medium">Thumbnile image Link</label>
              <Field
                name="thumbnileImgUrl"
                type="url"
                className="border rounded-lg p-2 w-full"
                placeholder="https://example.com/course.pdf"
              />
              <ErrorMessage
                name="thumbnileImgUrl"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Document Link */}
            <div className="flex flex-col md:col-span-2">
              <label className="font-medium">Document Link</label>
              <Field
                name="documentLink"
                type="url"
                className="border rounded-lg p-2 w-full"
                placeholder="https://example.com/course.pdf"
              />
              <ErrorMessage
                name="documentLink"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Submit button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                {isSubmitting ? "Submitting..." : "Create Course Material"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CourseMaterialForm;

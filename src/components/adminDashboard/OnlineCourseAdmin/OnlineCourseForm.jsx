import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createOnlineCourse } from "../../OnlineCourseUser/onlineCourseSlice";

// Validation Schema
const OnlineCourseSchema = Yup.object().shape({
  name: Yup.string().required("Course name is required"),
  thumbnailImgUrl: Yup.string()
    .url("Must be a valid URL")
    .required("Course thumbnail is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .min(0, "Price cannot be negative")
    .required("Price is required"),
  modules: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required("Module title is required"),
        videoId: Yup.string().required("YouTube video ID is required"),
        brief: Yup.string()
          .max(200, "Brief must be at most 200 characters")
          .required("Brief is required"),
        documentLink: Yup.string().url("Must be a valid URL").nullable(),
        thumbnailImgUrl: Yup.string()
          .url("Must be a valid URL")
          .required("Module thumbnail is required"),
      })
    )
    .min(1, "At least one module is required"),
});

const OnlineCourseForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    price: 0,
    thumbnailImgUrl: "",
    modules: [
      {
        title: "",
        videoId: "",
        brief: "",
        documentLink: "",
        thumbnailImgUrl: "",
      },
    ],
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const data = await dispatch(createOnlineCourse(values)).unwrap();

      if (data.status_code == 200) {
        alert("✅ Course created successfully!");
        resetForm();
      } else {
        alert("❌ Failed to create course");
      }
    } catch (err) {
      console.error("Error creating course:", err);
      alert("❌ Failed to create course");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow-xl rounded-xl overflow-auto max-h-[85vh]">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create Online Course
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={OnlineCourseSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form className="grid grid-cols-1 gap-4">
            {/* Course Name & Price in a row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Course Name</label>
                <Field
                  name="name"
                  type="text"
                  className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter course name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Price</label>
                <Field
                  name="price"
                  type="number"
                  className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter price"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Course Thumbnail */}
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">
                Course Thumbnail URL
              </label>
              <Field
                name="thumbnailImgUrl"
                type="url"
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
                placeholder="https://example.com/course-thumbnail.jpg"
              />
              <ErrorMessage
                name="thumbnailImgUrl"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Modules */}
            <FieldArray name="modules">
              {({ push, remove }) => (
                <div>
                  <h3 className="font-semibold mt-4 mb-2 text-gray-800 text-lg">
                    Modules
                  </h3>
                  <div className="space-y-4 max-h-[50vh] overflow-auto pr-2">
                    {values.modules.map((module, index) => (
                      <div
                        key={index}
                        className="border p-4 mb-2 rounded-lg bg-gray-50 relative shadow-sm hover:shadow-md transition"
                      >
                        {values.modules.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute top-2 right-2 text-red-600 font-bold text-lg hover:text-red-800"
                          >
                            ✕
                          </button>
                        )}

                        <h4 className="font-bold text-gray-700 mb-2">
                          Module {index + 1}
                        </h4>

                        {/* Title & Video ID in a row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                          <div className="flex flex-col">
                            <label className="font-medium text-gray-600">
                              Module Title
                            </label>
                            <Field
                              name={`modules.${index}.title`}
                              type="text"
                              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
                              placeholder="Module title"
                            />
                            <ErrorMessage
                              name={`modules.${index}.title`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <div className="flex flex-col">
                            <label className="font-medium text-gray-600">
                              YouTube Video ID
                            </label>
                            <Field
                              name={`modules.${index}.videoId`}
                              type="text"
                              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
                              placeholder="YouTube video ID"
                            />
                            <ErrorMessage
                              name={`modules.${index}.videoId`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>

                        {/* Brief & Document Link in a row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                          <div className="flex flex-col">
                            <label className="font-medium text-gray-600">
                              Brief (max 200 chars)
                            </label>
                            <Field
                              name={`modules.${index}.brief`}
                              as="textarea"
                              rows="2"
                              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 resize-none"
                              placeholder="Module brief"
                            />
                            <ErrorMessage
                              name={`modules.${index}.brief`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <div className="flex flex-col">
                            <label className="font-medium text-gray-600">
                              Document Link (optional)
                            </label>
                            <Field
                              name={`modules.${index}.documentLink`}
                              type="url"
                              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
                              placeholder="https://example.com/doc.pdf"
                            />
                            <ErrorMessage
                              name={`modules.${index}.documentLink`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>

                        {/* Thumbnail full width */}
                        <Field
                          name={`modules.${index}.thumbnailImgUrl`}
                          type="url"
                          placeholder="https://example.com/module-thumbnail.jpg"
                          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 mb-2"
                        />
                        <ErrorMessage
                          name={`modules.${index}.thumbnailImgUrl`}
                          component="div"
                          className="text-red-500 text-sm mb-2"
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      push({
                        title: "",
                        videoId: "",
                        brief: "",
                        documentLink: "",
                        thumbnailImgUrl: "",
                      })
                    }
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition mt-2 w-full sm:w-auto"
                  >
                    + Add Module
                  </button>
                </div>
              )}
            </FieldArray>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition mt-4"
            >
              {isSubmitting ? "Submitting..." : "Create Course"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OnlineCourseForm;

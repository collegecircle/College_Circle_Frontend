import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateOnlineCourse } from "../../OnlineCourseUser/onlineCourseSlice";

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

const OnlineEditCourseForm = ({ material, onClose, onUpdate }) => {
  const dispatch = useDispatch();

  const initialValues = {
    name: material.name || "",
    price: material.price || 0,
    thumbnailImgUrl: material.thumbnailImgUrl || "",
    modules: material.modules || [
      {
        title: "",
        videoId: "",
        brief: "",
        documentLink: "",
        thumbnailImgUrl: "",
      },
    ],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(
        updateOnlineCourse({ id: material.id, courseData: values })
      ).unwrap();
      alert("✅ Course updated successfully!");
      onUpdate();
      onClose();
    } catch (err) {
      console.error("Error updating course:", err);
      alert("❌ Failed to update course");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={OnlineCourseSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting }) => (
        <Form className="grid grid-cols-1 gap-4 max-h-[80vh] overflow-auto p-2 sm:p-4">
          {/* Two fields in a row: Name & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Course Name</label>
              <Field
                name="name"
                type="text"
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
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
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Thumbnail URL</label>
            <Field
              name="thumbnailImgUrl"
              type="url"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
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
                      className="border p-4 rounded-lg bg-gray-50 relative shadow-sm hover:shadow-md transition"
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

                      {/* Two fields per row in module: Title & Video ID */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                        <div>
                          <Field
                            name={`modules.${index}.title`}
                            placeholder="Module title"
                            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
                          />
                          <ErrorMessage
                            name={`modules.${index}.title`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <Field
                            name={`modules.${index}.videoId`}
                            placeholder="YouTube Video ID"
                            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
                          />
                          <ErrorMessage
                            name={`modules.${index}.videoId`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      </div>

                      {/* Brief & Document Link in two columns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                        <div>
                          <Field
                            as="textarea"
                            rows="2"
                            name={`modules.${index}.brief`}
                            placeholder="Brief (max 200 chars)"
                            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 resize-none"
                          />
                          <ErrorMessage
                            name={`modules.${index}.brief`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <Field
                            name={`modules.${index}.documentLink`}
                            placeholder="Document link (optional)"
                            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
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
                        placeholder="Module thumbnail URL"
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
            {isSubmitting ? "Updating..." : "Update Course"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default OnlineEditCourseForm;

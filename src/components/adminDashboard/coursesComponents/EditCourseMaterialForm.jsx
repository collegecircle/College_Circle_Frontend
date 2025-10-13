// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { updateCourseMaterial } from "../../course/courseSlice"; // adjust path

// // Validation Schema
// const CourseMaterialSchema = Yup.object().shape({
//   title: Yup.string().required("Title is required"),
//   thumbnileImgUrl: Yup.string()
//     .url("Must be a valid URL")
//     .required("thumbnile image link is required"),
//   price: Yup.number()
//     .typeError("Price must be a number")
//     .required("Price is required")
//     .min(0, "Price cannot be negative"),
//   brief: Yup.string()
//     .max(200, "Brief must be at most 200 characters")
//     .required("Brief is required"),
//   documentLink: Yup.string()
//     .url("Must be a valid URL")
//     .required("Document link is required"),
// });

// const EditCourseMaterialForm = ({ material, onClose, onUpdate }) => {
//   const dispatch = useDispatch();

//   const initialValues = {
//     title: material.title || "",
//     price: material.price || 0,
//     brief: material.brief || "",
//     documentLink: material.documentLink || "",
//     thumbnileImgUrl: material.thumbnileImgUrl || "",
//   };

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const updatedMaterial = await dispatch(
//         updateCourseMaterial({ id: material.id, materialData: values })
//       ).unwrap();

//       alert("✅ Course material updated successfully!");
//       onUpdate(updatedMaterial);
//       onClose();
//       window.location.reload();
//     } catch (err) {
//       console.error("Error updating course material:", err);
//       alert("❌ Failed to update course material");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-xl overflow-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Edit Course Material
//       </h2>

//       <Formik
//         initialValues={initialValues}
//         validationSchema={CourseMaterialSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Title */}
//             <div className="flex flex-col">
//               <label className="font-medium">Title</label>
//               <Field
//                 name="title"
//                 type="text"
//                 className="border rounded-lg p-2 w-full"
//               />
//               <ErrorMessage
//                 name="title"
//                 component="div"
//                 className="text-red-500 text-sm"
//               />
//             </div>

//             {/* Price */}
//             <div className="flex flex-col">
//               <label className="font-medium">Price</label>
//               <Field
//                 name="price"
//                 type="number"
//                 className="border rounded-lg p-2 w-full"
//               />
//               <ErrorMessage
//                 name="price"
//                 component="div"
//                 className="text-red-500 text-sm"
//               />
//             </div>

//             {/* Brief */}
//             <div className="flex flex-col md:col-span-2">
//               <label className="font-medium">Brief (max 200 chars)</label>
//               <Field
//                 name="brief"
//                 as="textarea"
//                 rows="2"
//                 className="border rounded-lg p-2 w-full"
//               />
//               <ErrorMessage
//                 name="brief"
//                 component="div"
//                 className="text-red-500 text-sm"
//               />
//             </div>
//             <div className="flex flex-col md:col-span-2">
//               <label className="font-medium">Thumbnile image Link</label>
//               <Field
//                 name="thumbnileImgUrl"
//                 type="url"
//                 className="border rounded-lg p-2 w-full"
//                 placeholder="https://example.com/course.pdf"
//               />
//               <ErrorMessage
//                 name="thumbnileImgUrl"
//                 component="div"
//                 className="text-red-500 text-sm"
//               />
//             </div>

//             {/* Document Link */}
//             <div className="flex flex-col md:col-span-2">
//               <label className="font-medium">Document Link</label>
//               <Field
//                 name="documentLink"
//                 type="url"
//                 className="border rounded-lg p-2 w-full"
//               />
//               <ErrorMessage
//                 name="documentLink"
//                 component="div"
//                 className="text-red-500 text-sm"
//               />
//             </div>

//             {/* Buttons */}
//             <div className="md:col-span-2 flex gap-4">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
//               >
//                 {isSubmitting ? "Updating..." : "Update"}
//               </button>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default EditCourseMaterialForm;

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateCourseMaterial } from "../../course/courseSlice"; // adjust path

// ✅ Validation Schema
const CourseMaterialSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  thumbnileImgUrl: Yup.string().url("Must be a valid URL"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price cannot be negative"),
  brief: Yup.string()
    .max(200, "Brief must be at most 200 characters")
    .required("Brief is required"),
  modules: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required("Module title required"),
        documentLink: Yup.string()
          .url("Must be a valid URL")
          .required("Document link required"),
      })
    )
    .min(1, "At least one module is required"),
});

const EditCourseMaterialForm = ({ material, onClose, onUpdate }) => {
  const dispatch = useDispatch();

  const initialValues = {
    title: material.title || "",
    price: material.price || 0,
    brief: material.brief || "",
    thumbnileImgUrl: material.thumbnileImgUrl || "",
    modules: material.modules?.length
      ? material.modules
      : [{ title: "", documentLink: "" }],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const updatedMaterial = await dispatch(
        updateCourseMaterial({ id: material.id, materialData: values })
      ).unwrap();

      alert("✅ Course material updated successfully!");
      onUpdate(updatedMaterial);
      onClose();
      // window.location.reload();
    } catch (err) {
      console.error("Error updating course material:", err);
      alert("❌ Failed to update course material");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-xl overflow-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Edit Course Material
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={CourseMaterialSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="flex flex-col">
              <label className="font-medium">Title</label>
              <Field
                name="title"
                type="text"
                className="border rounded-lg p-2 w-full"
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
              />
              <ErrorMessage
                name="brief"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Thumbnail Image */}
            <div className="flex flex-col md:col-span-2">
              <label className="font-medium">Thumbnail Image Link</label>
              <Field
                name="thumbnileImgUrl"
                type="url"
                className="border rounded-lg p-2 w-full"
              />
              <ErrorMessage
                name="thumbnileImgUrl"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Modules (Dynamic Fields) */}
            <div className="flex flex-col md:col-span-2">
              <label className="font-medium">Modules</label>
              <FieldArray name="modules">
                {({ push, remove }) => (
                  <div className="flex flex-col gap-3">
                    {values.modules.map((module, index) => (
                      <div
                        key={index}
                        className="flex flex-col md:flex-row gap-3 border p-3 rounded-lg"
                      >
                        <div className="flex-1">
                          <Field
                            name={`modules[${index}].title`}
                            type="text"
                            className="border rounded-lg p-2 w-full"
                            placeholder="Module title"
                          />
                          <ErrorMessage
                            name={`modules[${index}].title`}
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="flex-1">
                          <Field
                            name={`modules[${index}].documentLink`}
                            type="url"
                            className="border rounded-lg p-2 w-full"
                            placeholder="https://example.com/module.pdf"
                          />
                          <ErrorMessage
                            name={`modules[${index}].documentLink`}
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500 font-bold px-2"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ title: "", documentLink: "" })}
                      className="bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-700 self-start"
                    >
                      + Add Module
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="md:col-span-2 flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCourseMaterialForm;

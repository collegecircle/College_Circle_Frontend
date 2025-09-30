import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Plus, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateAnnouncement } from "../../userannouncements/announcementSlice";

const AnnouncementSchema = Yup.object().shape({
  title: Yup.string().trim().required("Title is required"),
  description: Yup.string().trim().required("Description is required"),
  imageUrl: Yup.string().url("Must be a valid URL").nullable(),
  priority: Yup.string()
    .oneOf(["low", "medium", "high"], "Invalid priority")
    .required("Priority is required"),
  bullets: Yup.array()
    .of(Yup.string().trim().required("Bullet cannot be empty"))
    .min(0),
  isActive: Yup.boolean(),
  announcementDate: Yup.date()
    .typeError("Invalid date format")
    .required("Announcement date is required"),
});

const EditAnnouncementForm = ({ announcementData, onSuccess }) => {
  const dispatch = useDispatch();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: announcementData?.title || "",
        description: announcementData?.description || "",
        imageUrl: announcementData?.imageUrl || "",
        priority: announcementData?.priority || "medium",
        bullets: announcementData?.bullets?.length
          ? announcementData.bullets
          : [""],
        isActive: announcementData?.isActive || false,
        announcementDate: announcementData?.announcementDate?._seconds
          ? new Date(announcementData.announcementDate._seconds * 1000)
              .toISOString()
              .split("T")[0]
          : "",
      }}
      validationSchema={AnnouncementSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const res = await dispatch(
            updateAnnouncement({
              id: announcementData.announcementId,
              values: values, // correct key
            })
          );

          if (res?.status_code === 200) {
            alert(res?.message || "Announcement updated successfully");
            onSuccess?.(); // optional callback to close modal or refresh list
          }
        } catch (err) {
          alert(err?.message || "Failed to update announcement");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form className="space-y-4 p-4 max-w-3xl mx-auto border rounded-md shadow">
          {/* Two-column row: Title & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Title</label>
              <Field
                name="title"
                className="w-full border p-2 rounded"
                placeholder="Enter title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium">Priority</label>
              <Field
                as="select"
                name="priority"
                className="w-full border p-2 rounded"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Field>
              <ErrorMessage
                name="priority"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Description</label>
            <Field
              as="textarea"
              name="description"
              className="w-full border p-2 rounded"
              placeholder="Enter description"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Two-column row: Image URL & Announcement Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Image URL</label>
              <Field
                name="imageUrl"
                className="w-full border p-2 rounded"
                placeholder="https://example.com/image.jpg"
              />
              <ErrorMessage
                name="imageUrl"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium">Announcement Date</label>
              <Field
                type="date"
                name="announcementDate"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="announcementDate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          {/* Bullets */}
          <div>
            <label className="block font-medium">Bullets</label>
            {values.bullets.map((bullet, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Field
                  name={`bullets[${index}]`}
                  className="w-full border p-2 rounded"
                  placeholder={`Bullet ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setFieldValue(
                      "bullets",
                      values.bullets.filter((_, i) => i !== index)
                    )
                  }
                  className="bg-red-300 text-white px-2 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setFieldValue("bullets", [...values.bullets, ""])}
              className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1 mt-2"
            >
              <Plus className="w-5 h-5" /> Add Bullet
            </button>
            <ErrorMessage
              name="bullets"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Active Checkbox */}
          <div>
            <label className="flex items-center gap-2">
              <Field type="checkbox" name="isActive" />
              Active
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-yellow-600 text-white px-4 py-2 rounded"
          >
            {isSubmitting ? "Updating..." : "Update Announcement"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditAnnouncementForm;

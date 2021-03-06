import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createCommentAction } from "../../redux/slices/comment/CommentSlices";

// validate post form
const validate = (values) => {
    const errors = {};
  
    if (!values.description) {
      errors.description = "Description is required";
  
    return errors;
  };
}

const AddComments = ({ postId }) => {
    const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      description: "",
    },
    onSubmit: (values, actions) => {
      const data = {
        postId,
        description: values?.description,
      };
      dispatch(createCommentAction(data)).then(() => {
        actions.setSubmitting(false);
        actions.resetForm({
          description: ''
        })
      });;
    },
    validate
  });
  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="mt-1 flex max-w-sm m-auto"
      >
        <input
          onBlur={formik.handleBlur}
          value={formik.values.description}
          onChange={formik.handleChange}
          type="text"
          name="description"
          id="text"
          className="shadow-sm focus:ring-indigo-500  mr-2 focus:border-indigo-500 block w-full p-2 border-1 sm:text-sm border-gray-300 rounded-md"
          placeholder="Add New comment"
        />

        <button
          type="submit"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
      <div className="text-red-400 mb-2 mt-2">
        {formik.touched.description && formik.errors.description}
      </div>
    </div>
  );
};

export default AddComments;
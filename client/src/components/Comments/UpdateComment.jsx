import React, {useEffect} from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCommentDetailsAction, updateCommentAction } from "../../redux/slices/comment/CommentSlices";
import { useNavigate } from "react-router-dom";

// validate post form
const validate = (values) => {
  const errors = {};

  if (!values.description) {
    errors.description = "Description is required";

    return errors;
  }
};

const UpdateComment = () => {
    const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

    // fetch the comment details
    useEffect(() => {
        dispatch(fetchCommentDetailsAction(id))
    }, [dispatch, id])

    const comment = useSelector(state => state?.comment);
    const {commentDetails, isUpdated} = comment;

    const post = useSelector(state => state?.post);
    const {postDetails} = post;
    

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: commentDetails?.description,
    },
    onSubmit: (values) => {
      const data = {
        id,
        description: values?.description,
      };
      dispatch(updateCommentAction(data));
    },
    validate,
  });

  if(isUpdated){
    return navigate(`/posts/${postDetails?._id}`, {replace: true});
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="flex flex-col items-center justify-center">
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
            className="shadow-sm focus:ring-indigo-500  mr-2 focus:border-indigo-500 block w-full p-2 border-2 outline-none sm:text-sm border-gray-300 rounded-md"
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
    </div>
  );
};

export default UpdateComment;

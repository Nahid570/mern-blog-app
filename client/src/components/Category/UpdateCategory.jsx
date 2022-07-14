import { BookOpenIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteCategoryAction,
  fetchCategoryDetailsAction,
  updateCategoryAction,
} from "../../redux/slices/category/categorySlices";
import {useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

// validate category field
const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = "Category name is required";
  }

  return errors;
};

const UpdateCategory = () => {
    const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();

  // get details about category
  useEffect(() => {
    dispatch(fetchCategoryDetailsAction(id));
  }, [id, dispatch]);

  const state = useSelector((state) => state?.category);
  const { loading, categoryDetails } = state;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryDetails?.title,
    },
    validate,
    onSubmit: (values) => {
      dispatch(updateCategoryAction({ title: values.title, id }));
      navigate("/category-list", {replace: true});
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <BookOpenIcon className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update Category
          </h2>
        </div>
        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              {/* Title */}
              <input
                type="text"
                autoComplete="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                placeholder="New Category"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                onBlur={formik.handleBlur}
              />
              <div className="text-red-400 mb-2">
                {formik.touched.title && formik.errors.title && (
                  <p>{formik.errors.title}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}
              {loading ? (
                <button
                  disabled
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusCircleIcon
                      className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Please wait...
                </button>
              ) : (
                <>
                    <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusCircleIcon
                      className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Update Category
                </button>
                <button
                onClick={() => {
                    dispatch(deleteCategoryAction(id))
                    navigate('/category-list', {replace: true})
                }}
                  type="submit"
                  className="group mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusCircleIcon
                      className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Delete Category
                </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;

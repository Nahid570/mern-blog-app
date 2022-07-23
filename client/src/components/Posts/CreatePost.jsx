import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../redux/slices/posts/PostSlices";
import CategoryDropdown from "../Category/CategoryDropdown";
import Dropzone from "react-dropzone";
import {useNavigate} from 'react-router-dom'

// validate post form
const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = "Title is required";
  }

  if (!values.description) {
    errors.description = "Description is required";
  }

  if (!values.category) {
    errors.category = "Category is required";
  }

  return errors;
};

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkCreatedPost = useSelector(state => state?.post);
  const {postCreated} = checkCreatedPost;
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      image: "",
    },
    validate,
    onSubmit: (values) => {
      dispatch(createPostAction(values));
      navigate("/posts", {replace: true})
    },
  });
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
          Create Post
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          <p className="font-medium text-green-600 hover:text-indigo-500">
            Share your ideas to the world. Your post must be free from profanity
          </p>
        </p>
        <p className="text-red-600 text-2xl text-center">{postCreated?.message}</p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <div className="mt-1">
                {/* Title */}
                <input
                  id="title"
                  name="title"
                  type="title"
                  autoComplete="title"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
              </div>
              {/* Err msg */}
              <div className="text-red-500">
                {formik.touched.title && formik.errors.title ? (
                  <p>{formik.errors.title}</p>
                ) : null}
              </div>
            </div>
            {/* Category input goes here */}
            <CategoryDropdown
              name="category"
              value={formik.values.category?.label}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              errors={formik.errors.category}
              touched={formik.touched.category}
            />
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              {/* Description */}
              <textarea
                rows="5"
                cols="10"
                className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                type="text"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              ></textarea>
              {/* Err msg */}
              <div className="text-red-500">
                {formik.touched.description && formik.errors.description ? (
                  <p>{formik.errors.description}</p>
                ) : null}
              </div>
              <Dropzone
                onDrop={(acceptedFiles) =>
                  formik.setFieldValue("image", acceptedFiles[0])
                }
                accept={"image/jpeg, image/png, image/jpg"}
                name="image"
                onBlur={formik.handleBlur}
                value = {formik.values.image}
              >
                {({ getRootProps, getInputProps }) => {
                  return (<div className="mt-6">
                    <div
                      {...getRootProps({
                        className: "dropzone",
                        onDrop: (event) => event.stopPropagation(),
                      })}
                      className="h-40 border-2 cursor-pointer flex items-center justify-center"
                    >
                      <input {...getInputProps()} />
                      <p className="text-gray-400">Drag 'n' drop image here, or click to select image</p>
                    </div>
                  </div>)
                }}
              </Dropzone>
            </div>
            <div>
              {/* Submit btn */}
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

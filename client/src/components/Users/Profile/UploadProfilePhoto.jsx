import { UploadIcon } from "@heroicons/react/outline";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userProfilePhotoAction } from "../../../redux/slices/users/UsersSlices";
import { useNavigate } from "react-router-dom";


// validate post form
const validate = (values) => {
    const errors = {};
  
    if (!values.image) {
      errors.image = "Image is required";
    }
  
    return errors;
  };

export default function UploadProfilePhoto() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

  //formik
  const formik = useFormik({
    initialValues: {
      image: "",
    },
    onSubmit: values => {
      dispatch(userProfilePhotoAction(values));
    },
    validate
  });

  const user = useSelector(state => state?.users);
  const {isProfileUpdated, userAuth } = user;
  console.log(userAuth);
  if(isProfileUpdated){
    return navigate(`/profile/${userAuth?._id}`, {replace: true})
  }


  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
          Upload profile photo
        </h2>
        {/* Displya err here */}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            {/* Image container here thus Dropzone */}
            
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

            <div className="text-red-500">
              {formik.touched.image && formik.errors.image}
            </div>
            <p className="text-sm text-gray-500">
              Only PNG, JPEG, JPG image are accepted
            </p>

            <div>
              <button
                type="submit"
                className="inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <UploadIcon
                  className="-ml-1 mr-2 h-5  text-gray-400"
                  aria-hidden="true"
                />
                <span>Upload Photo</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
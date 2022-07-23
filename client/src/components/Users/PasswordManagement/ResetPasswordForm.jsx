import { useFormik } from "formik";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { generateUsersPasswordTokenAction } from "../../../redux/slices/users/UsersSlices";


const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  }

  return errors;
};

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  //formik
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: values => {
      //dispath the action
      dispatch(generateUsersPasswordTokenAction(values?.email))
    },
  });

  // get data from the store
  const user = useSelector(state => state?.users);
  const {passToken, loading, appErr, serverErr} = user;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Your Password Now!
          </h2>
          {
            (appErr || serverErr) ? (<p className="mt-2 text-center text-sm text-red-600">
              {appErr}, {serverErr}
            </p>) : passToken && (<p className="mt-2 text-center text-sm text-green-600">
              A reset password link sent to your email, Change your password within 10 minute.
            </p>)
          }
        </div>
        {/* Err msg */}
        
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Enter Your Email Address
              </label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {/* Err msg */}
              <div className="text-red-400 mb-2">
                {formik.touched.email && formik.errors.email}
              </div>
            </div>
          </div>

          <div>
          {
            loading ? <button
            disabled
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500"
                aria-hidden="true"
              />
            </span>
            Please wait...
          </button> : <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Reset Password
              </button>
          }
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;

import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendMailAction } from "../../../redux/slices/email/emailSlice";



// validate user input in formik form
const validate = values => {
    const errors = {}

    if(!values.recipientEmail){
        errors.recipientEmail = 'Recipient Email is required'
    }

    if(!values.subject){
        errors.subject = 'Subject is required'
    }

    if(!values.message){
        errors.message = 'Message is required'
    }

    return errors;
}

const SendEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector(state => state?.sendingMail);
    const {isMailSent} = data;
  
  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      recipientEmail: location?.state?.email,
      subject: "",
      message: "",
    },
    validate,
    onSubmit: values => {
      dispatch(sendMailAction(values))
    }
  });

  if(isMailSent){
    return navigate(`/profile/${location?.state?.id}`, {replace: true})
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
          Send Mesage
          {/* Email title */}
          <span className="text-green-300"></span>
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          {/* Display err here */}
        </p>
        <p className="mt-2 text-center text-sm text-gray-600">
          {/* {emailSent && <div>Sent</div>} */}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Recipient Email
              </label>
              {/* Email message */}
              <div className="mt-1">
                <input
                  name='recipientEmail'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.recipientEmail}
                  disabled
                  type="email"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border bg-gray-200 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* Err msg */}
              <div className="text-red-500">
                {formik.touched.recipientEmail && formik.errors.recipientEmail}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <div className="mt-1">
                {/* Subject */}
                <input
                   name='subject'
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
                   value={formik.values.subject}
                  type="text"
                  autoComplete="subject"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* err msg */}
              <div className="text-red-500">
                {formik.touched.subject && formik.errors.subject}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              {/* email message */}
              <textarea
                 name='message'
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.message}
                rows="5"
                cols="10"
                className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                type="text"
              ></textarea>
              {/* err here */}
              <div className="text-red-500">
                {formik.touched.message && formik.errors.message}
              </div>
            </div>
            {/* Submit btn */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
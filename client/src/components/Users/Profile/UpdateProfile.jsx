import React, {useEffect} from "react";
import { useFormik } from "formik";
import {useDispatch, useSelector} from 'react-redux';
import { userProfileAction, userProfileUpdateAction } from "../../../redux/slices/users/UsersSlices";
import {useNavigate} from 'react-router-dom'

// validate user input in formik form
const validate = values => {
    const errors = {}

    if(!values.firstName){
        errors.firstName = 'First name is required'
    }else if(values.firstName.length < 3 || values.firstName.length > 15){
        errors.firstName = 'Must be in between 2-15 char'
    }

    if(!values.lastName){
        errors.lastName = 'Last name is required'
    }else if(values.lastName.length < 3 || values.lastName.length > 15){
        errors.lastName = 'Must be in between 3-15 char'
    }

    if(!values.email){
        errors.email = 'Email is required'
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = 'Invalid email address'
    }

    if(!values.bio){
        errors.bio = 'Bio is required'
    }

    return errors;
}

const UpdateProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state?.users);
    const {_id} = user?.userAuth;
    
    useEffect(() => {
        dispatch(userProfileAction(_id));
    }, [dispatch, _id]);

    const {userProfile, loading, isProfileUpdated} = useSelector(state => state?.users)

    // formik
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: userProfile?.firstName,
            lastName: userProfile?.lastName,
            email: userProfile?.email,
            bio: userProfile?.bio
        },
        validate,
        onSubmit: values => {
           dispatch(userProfileUpdateAction(values))
        }
    })

    // redirect user if profile is updated
    if(isProfileUpdated){
        return navigate(`/profile/${_id}`, {replace: true})
    }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
          Want to update your profile?
        </h3>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <div className="mt-1">
                {/* First name */}
                <input
                  name='firstName'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  type="text"
                  autoComplete="firstName"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="text-red-500">
                {formik.touched.firstName && formik.errors.firstName}
              </div>
            </div>
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <div className="mt-1">
                {/* Last Name */}
                <input
                  name='lastName'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  type="text"
                  autoComplete="lastName"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* Err msg */}
              <div className="text-red-500">
                {formik.touched.lastName && formik.errors.lastName}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                {/* Email */}
                <input
                  name='email'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  type="email"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* err msg */}
              <div className="text-red-500">
                {formik.touched.email && formik.errors.email}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <textarea
                name='bio'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bio}
                rows="5"
                cols="10"
                className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                type="text"
              ></textarea>
              {/* Err msg */}
              <div className="text-red-500">
                {formik.touched.bio && formik.errors.bio}
              </div>
            </div>
            <div>
              {/* submit btn */}
              {
                loading ? <button disabled
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-grey-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Please wait
              </button> : <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update
              </button>
              }
              
            </div>
          </form>

          <div className="mt-4 mb-3">
            <div className="relative">
              <div className="flex flex-col justify-center items-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
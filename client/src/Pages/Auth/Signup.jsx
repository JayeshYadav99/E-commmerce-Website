import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../Components/Layout/Layout';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  phoneno: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone number is required'),
  Address: Yup.string().required('Address is required'),
  SecurityAnswer: Yup.string().required('Security answer is required'),
  captcha: Yup.string().required('Please complete the captcha'),
});

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const Navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phoneno: '',
      Address: '',
      SecurityAnswer: '',
      captcha: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Include captcha value in the request
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...values, captcha: captchaValue }),
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
          toast.success('Registered Successfully');
          Navigate('/login');
        } else {
          toast.error(`${data.message}`);
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred during registration');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const inputFields = [
    [
      { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
    ],
    [
      { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
      { name: 'phoneno', label: 'Phone Number', type: 'tel', placeholder: '1234567890' },
    ],
    [
      { name: 'Address', label: 'Address', type: 'text', placeholder: '123 Main St, City, Country' },
      { name: 'SecurityAnswer', label: 'Security Answer', type: 'text', placeholder: 'Your secret code' },
    ],
  ];

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    formik.setFieldValue('captcha', value);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <div>
            <div className="flex justify-center">
              <svg className="h-16 w-16 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your information to get started
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            {inputFields.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {row.map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    <div className="mt-1">
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        {...formik.getFieldProps(field.name)}
                        className={`appearance-none block w-full px-3 py-2 border ${
                          formik.touched[field.name] && formik.errors[field.name] ? 'border-red-300' : 'border-gray-300'
                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                      {formik.touched[field.name] && formik.errors[field.name] && (
                        <p className="mt-2 text-sm text-red-600" id={`${field.name}-error`}>
                          {formik.errors[field.name]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={handleCaptchaChange}
              />
            </div>
            {formik.touched.captcha && formik.errors.captcha && (
              <p className="mt-2 text-sm text-red-600 text-center" id="captcha-error">
                {formik.errors.captcha}
              </p>
            )}
            <div>
              <button
                type="submit"
                disabled={isLoading || !captchaValue}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="mt-2 text-sm text-center">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;


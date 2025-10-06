import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Toaster from '../../components/Toaster/Toaster';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { API_URL } from '../../utility/constants';

function AddCampaign() {
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    const showToast = (message, type) => {
        setToast({ message, type });
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
        }),
        onSubmit: async (values) => {
            const data = {
                title: values.title,
                description: values.description,
            };

            await sendDataToBackend(data);
            formik.resetForm();
        },
    });

    const sendDataToBackend = async (data) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/campaign/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include',
            });
            const result = await response.json();
            if (response.ok) {
                showToast('Campaign created successfully.', 'success');
                setTimeout(() => {
                    navigate('/campaign');
                }, 3000);
            } else {
                showToast('Failed to create the campaign. Please try again.', 'error');
            }
        } catch (error) {
            console.log('Error creating campaign:', error);
            showToast('Failed to create the campaign. Please try again.', 'error');
        }
    };

    return (
        <>
            {toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <Breadcrumb pageName="Add New Campaign" />
            <div className="dark:bg-boxdark-2 dark:text-bodydark flex items-center justify-center">
                <div className="w-full max-w-lg px-6">
                    <div className="rounded-md border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark">
                        <div className="p-6 sm:p-8">
                            <form onSubmit={formik.handleSubmit}>
                                {/* Title Field */}
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter the campaign title"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-10 text-black outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                        {...formik.getFieldProps('title')}
                                    />
                                    {formik.touched.title && formik.errors.title && (
                                        <p className="mt-1 text-sm text-red-500">{formik.errors.title}</p>
                                    )}
                                </div>

                                {/* Description Field */}
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter the campaign description"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-10 text-black outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                        {...formik.getFieldProps('description')}
                                    />
                                    {formik.touched.description && formik.errors.description && (
                                        <p className="mt-1 text-sm text-red-500">{formik.errors.description}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/campaign')}
                                        className="text-red-500 bg-white hover:text-red-600 hover:bg-red-100 focus:ring-2 focus:ring-red-200 active:bg-red-200 rounded-lg px-5 py-2.5 border dark:bg-zinc-800 dark:border-red-500 dark:hover:bg-red-500/10"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-200 active:bg-blue-700 rounded-lg px-5 py-2.5"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCampaign;

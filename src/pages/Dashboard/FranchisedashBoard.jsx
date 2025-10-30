    import React from "react";
    import { useNavigate } from "react-router-dom";

    const FranchiseDashboard = () => {
    const navigate = useNavigate();

    const handleCreatePartner = () => {
        // Navigate to the registration page
        navigate("/signup"); // <-- change to your actual route path
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
       
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Franchise Dashboard
        </h1>

      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white shadow rounded-2xl p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Total Channel Partners
            </h2>
            <p className="text-2xl font-bold text-blue-600">12</p>
            </div>

            <div className="bg-white shadow rounded-2xl p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Active Partners
            </h2>
            <p className="text-2xl font-bold text-green-600">9</p>
            </div>

            <div className="bg-white shadow rounded-2xl p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Pending Requests
            </h2>
            <p className="text-2xl font-bold text-yellow-500">3</p>
            </div>
        </div>

      
        <div className="bg-white shadow rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
                Channel Partner Management
            </h2>
            <button
                onClick={handleCreatePartner}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all"
            >
                + Create Channel Partner
            </button>
            </div>

            <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                <tr className="bg-gray-100 text-left text-gray-700">
                    <th className="p-3">#</th>
                    <th className="p-3">Partner Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Status</th>
                </tr>
                </thead>
                <tbody>
                <tr className="border-b">
                    <td className="p-3">1</td>
                    <td className="p-3">John Doe</td>
                    <td className="p-3">john@example.com</td>
                    <td className="p-3 text-green-600 font-medium">Active</td>
                </tr>
                <tr className="border-b">
                    <td className="p-3">2</td>
                    <td className="p-3">Riya Sharma</td>
                    <td className="p-3">riya@example.com</td>
                    <td className="p-3 text-yellow-600 font-medium">Pending</td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
    };

    export default FranchiseDashboard;

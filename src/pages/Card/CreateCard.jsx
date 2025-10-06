import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CreateCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingCard = location.state?.card || null; 

  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    company: "",
    email: "",
    phone: "",
    design: "default",
    image: null,
  });

  useEffect(() => {
    if (editingCard) {
      setFormData(editingCard);
    }
  }, [editingCard]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCard) {
      navigate("/preview", { state: { ...formData, isEditing: true } });
    } else {
      navigate("/preview", { state: formData });
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">
        {editingCard ? "Edit Business Card" : "Create Business Card"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Full Name" required
          className="w-full p-2 border border-slate-300 rounded"
          value={formData.name} onChange={handleChange} />

        <input type="text" name="jobTitle" placeholder="Job Title" required
          className="w-full p-2 border border-slate-300 rounded"
          value={formData.jobTitle} onChange={handleChange} />

        <input type="text" name="company" placeholder="Company Name"
          className="w-full p-2 border border-slate-300 rounded"
          value={formData.company} onChange={handleChange} />

        <input type="email" name="email" placeholder="Email Address" required
          className="w-full p-2 border border-slate-300 rounded"
          value={formData.email} onChange={handleChange} />

        <input type="text" name="phone" placeholder="Phone Number" required
          className="w-full p-2 border border-slate-300 rounded"
          value={formData.phone} onChange={handleChange} />

        
        <label className="block font-semibold text-slate-700">Upload Profile Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border border-slate-300 rounded" />

       
        <div>
          <label className="block font-semibold text-slate-700">Choose a Design:</label>
          <div className="flex gap-4 mt-2">
            <label className="flex flex-col items-center cursor-pointer">
              <input type="radio" name="design" value="default" checked={formData.design === "default"} onChange={handleChange} />
              <div className=" mt-2 w-15 h-10 bg-gradient-to-r from-orange-300 to-blue-400 border border-slate-300 rounded-lg  text-white flex items-center justify-center text-sm">Default</div>
            </label>

            <label className="flex flex-col items-center cursor-pointer">
              <input type="radio" name="design" value="modern" checked={formData.design === "modern"} onChange={handleChange} />
              <div className="mt-2  w-15 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm">Modern</div>
            </label>

            <label className="flex flex-col items-center cursor-pointer">
              <input type="radio" name="design" value="dark" checked={formData.design === "dark"} onChange={handleChange} />
              <div className="mt-2  w-15 h-10 bg-gradient-to-r from-slate-900 to-purple-800 text-white rounded-lg flex items-center justify-center text-sm">Dark</div>
            </label>

            <label className="flex flex-col items-center cursor-pointer">
              <input type="radio" name="design" value="light" checked={formData.design === "light"} onChange={handleChange} />
              <div className=" mt-2 w-15 h-10  text-white bg-gradient-to-r from-blue-500  to-sky-300 rounded-lg flex items-center justify-center text-sm">Light</div>
            </label>
          </div>
        </div>

        <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded shadow-md">
          {editingCard ? "Update & Preview" : "Save & Preview"}
        </button>
      </form>
    </div>
  );
};

export default CreateCard;

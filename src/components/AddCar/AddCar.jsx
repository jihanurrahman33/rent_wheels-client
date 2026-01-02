import React, { use, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import {
  FaCar,
  FaFileAlt,
  FaDollarSign,
  FaMapMarkerAlt,
  FaImage,
  FaLayerGroup,
} from "react-icons/fa";
import CarCard from "../CarCard/CarCard";

const AddCar = () => {
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Controlled State for Live Preview
  const [formData, setFormData] = useState({
    carName: "",
    description: "",
    carType: "Luxury", // Default to a valid type
    rentPrice: "",
    location: "",
    carImgUrl: "",
    carStatus: "available",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = (data) => {
    const e = {};
    if (!data.carName.trim()) e.carName = "Car name is required";
    if (!data.description.trim()) e.description = "Description is required";
    if (!data.carType) e.carType = "Please choose a car type";
    if (!data.rentPrice || isNaN(Number(data.rentPrice)))
      e.rentPrice = "Valid price is required";
    if (!data.location.trim()) e.location = "Location is required";
    if (!data.carImgUrl.trim()) e.carImgUrl = "Image URL is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        title: "Not signed in",
        text: "Please login to add a car",
        icon: "warning",
      });
      return;
    }

    const validation = validate(formData);
    setErrors(validation);
    if (Object.keys(validation).length) return;

    setLoading(true);
    const carPayload = {
      ...formData,
      providerName: user.displayName || "Anonymous",
      providerEmail: user.email || "no-email",
      rating: 5.0, // Default for new cars or 0
    };

    try {
      const res = await fetch("https://rent-wheels-nine.vercel.app/add-car", {
        method: "POST",
        headers: {
          authorization: `Bearer ${user.accessToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(carPayload),
      });
      const data = await res.json();
      if (data.insertedId) {
        Swal.fire({
            title: "Success",
            text: "Your car has been listed successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
            customClass: {
              popup: "bg-base-100 text-base-content border border-base-content/10",
              title: "text-base-content",
            }
          });
        // Reset form
        setFormData({
            carName: "",
            description: "",
            carType: "Luxury",
            rentPrice: "",
            location: "",
            carImgUrl: "",
            carStatus: "available",
        });
      } else {
        throw new Error(data?.error || "Failed to add car");
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message || "Could not add car",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Construct a preview object that matches CarCard's expected props
  const previewCar = {
    ...formData,
    _id: "preview",
    rating: 5.0,
    rentPrice: formData.rentPrice || "0",
    carName: formData.carName || "Your Car Name",
    location: formData.location || "Location",
  };

  return (
    <div className="min-h-screen bg-base-100 py-20 lg:py-28 relative overflow-hidden transition-colors duration-500">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-base-200 border border-base-content/10 text-base-content/70 text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
                Protocol: Onboarding
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-base-content mb-4">
                List Your <span className="text-primary">Vehicle</span>
            </h1>
            <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
                Join our exclusive fleet. Fill out the details below to showcase your car to thousands of premium drivers.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">
          
          {/* Left Panel: Live Preview */}
          <div className="lg:col-span-5 order-2 lg:order-1 sticky top-32">
            <div className="bg-base-200/50 border border-base-content/10 rounded-3xl p-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-base-content/40 mb-6 flex items-center gap-2">
                    <FaImage /> Live Card Preview
                </h3>
                {/* The Actual Car Card Component */}
                <div className="pointer-events-none select-none transform scale-100 origin-top">
                    <CarCard car={previewCar}>
                         <button className="w-full py-3.5 rounded-xl font-bold bg-base-300 text-base-content/50 cursor-not-allowed">
                            Preview Button
                         </button>
                    </CarCard>
                </div>
                <p className="text-center text-xs text-base-content/40 mt-6">
                    This is how your car will appear in the fleet inventory.
                </p>
            </div>
          </div>

          {/* Right Panel: Form */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="glass-card bg-base-100/60 backdrop-blur-xl border border-base-content/10 shadow-2xl rounded-3xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Section 1: Basic Info */}
                <div className="space-y-6">
                    <h4 className="text-lg font-bold text-base-content border-b border-base-content/10 pb-2">
                        Vehicle Details
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-6">
                        <div className="form-control">
                            <label className="label text-xs font-bold uppercase text-base-content/60 mb-1">Car Model Name</label>
                            <div className="relative group">
                                <FaCar className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-primary transition-colors" />
                                <input
                                    name="carName"
                                    value={formData.carName}
                                    onChange={handleChange}
                                    className={`input w-full pl-11 bg-base-200/50 border-base-content/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl transition-all text-base-content placeholder:text-base-content/40 ${errors.carName ? "input-error" : ""}`}
                                    placeholder="e.g. Porsche 911 Carrera"
                                />
                            </div>
                            {errors.carName && <span className="text-error text-xs mt-1">{errors.carName}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label text-xs font-bold uppercase text-base-content/60 mb-1">Image URL</label>
                            <div className="relative group">
                                <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-primary transition-colors" />
                                <input
                                    name="carImgUrl"
                                    value={formData.carImgUrl}
                                    onChange={handleChange}
                                    className={`input w-full pl-11 bg-base-200/50 border-base-content/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl transition-all text-base-content placeholder:text-base-content/40 ${errors.carImgUrl ? "input-error" : ""}`}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                            {errors.carImgUrl && <span className="text-error text-xs mt-1">{errors.carImgUrl}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label text-xs font-bold uppercase text-base-content/60 mb-1">Category</label>
                            <div className="relative group">
                                <FaLayerGroup className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-primary transition-colors" />
                                <select
                                    name="carType"
                                    value={formData.carType}
                                    onChange={handleChange}
                                    className="select w-full pl-11 bg-base-200/50 border-base-content/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl transition-all text-base-content"
                                >
                                    <option value="Luxury">Luxury</option>
                                    <option value="Sedan">Sedan</option>
                                    <option value="SUV">SUV</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Electric">Electric</option>
                                    <option value="Coupe">Coupe</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label text-xs font-bold uppercase text-base-content/60 mb-1">Daily Rate (৳)</label>
                            <div className="relative group">
                                <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-primary transition-colors" />
                                <input
                                    name="rentPrice"
                                    value={formData.rentPrice}
                                    onChange={handleChange}
                                    className={`input w-full pl-11 bg-base-200/50 border-base-content/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl transition-all text-base-content placeholder:text-base-content/40 ${errors.rentPrice ? "input-error" : ""}`}
                                    placeholder="e.g. 5000"
                                />
                            </div>
                            {errors.rentPrice && <span className="text-error text-xs mt-1">{errors.rentPrice}</span>}
                        </div>
                    </div>
                </div>

                {/* Section 2: Details */}
                <div className="space-y-6">
                    <h4 className="text-lg font-bold text-base-content border-b border-base-content/10 pb-2">
                        Location & Description
                    </h4>

                    <div className="form-control">
                        <label className="label text-xs font-bold uppercase text-base-content/60 mb-1">Pickup Location</label>
                        <div className="relative group">
                            <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-primary transition-colors" />
                            <input
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className={`input w-full pl-11 bg-base-200/50 border-base-content/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl transition-all text-base-content placeholder:text-base-content/40 ${errors.location ? "input-error" : ""}`}
                                placeholder="e.g. Gulshan 2, Dhaka"
                            />
                        </div>
                        {errors.location && <span className="text-error text-xs mt-1">{errors.location}</span>}
                    </div>

                    <div className="form-control">
                        <label className="label text-xs font-bold uppercase text-base-content/60 mb-1">Description</label>
                        <div className="relative group">
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className={`textarea w-full bg-base-200/50 border-base-content/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl transition-all text-base-content placeholder:text-base-content/40 ${errors.description ? "textarea-error" : ""}`}
                                placeholder="Describe the key features, condition, and any special requirements..."
                            ></textarea>
                            <FaFileAlt className="absolute right-4 top-4 text-base-content/40" />
                        </div>
                        {errors.description && <span className="text-error text-xs mt-1">{errors.description}</span>}
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary flex-1 h-14 text-lg font-bold shadow-xl shadow-primary/30 text-white rounded-xl hover:scale-[1.02] transition-transform"
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      "Publish Listing"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                        setFormData({
                            carName: "",
                            description: "",
                            carType: "Luxury",
                            rentPrice: "",
                            location: "",
                            carImgUrl: "",
                            carStatus: "available",
                        });
                        setErrors({});
                    }}
                    className="btn btn-ghost h-14 px-8 text-base-content/60 hover:bg-base-200 rounded-xl border border-transparent hover:border-base-content/10"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddCar;

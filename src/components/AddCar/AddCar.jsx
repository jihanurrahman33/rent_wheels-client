import React, { use, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

const AddCar = () => {
  const { user } = use(AuthContext);
  const selectRef = useRef();
  const [loading, setLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState("");
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const e = {};
    if (!data.carName) e.carName = "Car name is required";
    if (!data.description) e.description = "Description is required";
    if (!data.carType) e.carType = "Please choose a car type";
    if (!data.rentPrice || isNaN(Number(data.rentPrice)))
      e.rentPrice = "Valid price is required";
    if (!data.location) e.location = "Location is required";
    if (!data.carImgUrl) e.carImgUrl = "Image URL is required";
    return e;
  };

  const handleImageChange = (e) => {
    const value = e.target.value;
    setImgPreview(value);
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

    const carName = e.target.carName.value.trim();
    const description = e.target.description.value.trim();
    const rentPrice = e.target.rentPrice.value.trim();
    const carImgUrl = e.target.carImgUrl.value.trim();
    const providerName = user.displayName || "";
    const providerEmail = user.email || "";
    const carType = selectRef.current.value;
    const location = e.target.location.value.trim();
    const carStatus = "available";

    const newCar = {
      carName,
      description,
      carType,
      rentPrice,
      location,
      carImgUrl,
      providerEmail,
      providerName,
      carStatus,
    };

    const validation = validate(newCar);
    setErrors(validation);
    if (Object.keys(validation).length) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/add-car", {
        method: "POST",
        headers: {
          authorization: `Bearer ${user.accessToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(newCar),
      });
      const data = await res.json();
      if (data.insertedId) {
        Swal.fire({
          title: "Car added",
          text: "Your car is now listed",
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
        });
        e.target.reset();
        setImgPreview("");
        selectRef.current.value = "";
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-gradient-to-r from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          <div className="flex flex-col items-center justify-center px-4 py-6 bg-gray-100 dark:bg-gray-900 rounded-xl">
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                List your car
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                Add accurate details and a good-quality image to attract
                renters.
              </p>
              <div className="w-full rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="h-56 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  {imgPreview ? (
                    <img
                      src={imgPreview}
                      alt="preview"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="text-center px-6">
                      <p className="text-gray-500 dark:text-gray-400">
                        Image preview
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Paste a full image URL on the form to preview
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Provider
                </div>
                <div className="ml-auto text-sm text-gray-800 dark:text-gray-100">
                  {user?.displayName || user?.email}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-4 py-2">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Car Name
                </label>
                <input
                  name="carName"
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 bg-white dark:bg-gray-800 text-sm focus:ring-2 ${
                    errors.carName
                      ? "border-red-500 ring-red-100"
                      : "border-gray-200 ring-blue-50"
                  }`}
                  placeholder="e.g. Toyota Corolla"
                />
                {errors.carName && (
                  <p className="text-xs text-red-500 mt-1">{errors.carName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 bg-white dark:bg-gray-800 text-sm focus:ring-2 ${
                    errors.description
                      ? "border-red-500 ring-red-100"
                      : "border-gray-200 ring-blue-50"
                  }`}
                  placeholder="Short description"
                ></textarea>
                {errors.description && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Car Type
                  </label>
                  <select
                    ref={selectRef}
                    defaultValue=""
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 bg-white dark:bg-gray-800 text-sm ${
                      errors.carType ? "border-red-500" : "border-gray-200"
                    }`}
                  >
                    <option value="" disabled>
                      Pick a car type
                    </option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="LUXURY">LUXURY</option>
                    <option value="Electric">Electric</option>
                  </select>
                  {errors.carType && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.carType}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Rent Price (৳ / day)
                  </label>
                  <input
                    name="rentPrice"
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 bg-white dark:bg-gray-800 text-sm ${
                      errors.rentPrice ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="e.g. 2500"
                  />
                  {errors.rentPrice && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.rentPrice}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Location
                  </label>
                  <input
                    name="location"
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 bg-white dark:bg-gray-800 text-sm ${
                      errors.location ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="City or area"
                  />
                  {errors.location && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Image URL
                  </label>
                  <input
                    name="carImgUrl"
                    onChange={handleImageChange}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 bg-white dark:bg-gray-800 text-sm ${
                      errors.carImgUrl ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="https://example.com/car.jpg"
                  />
                  {errors.carImgUrl && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.carImgUrl}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 text-sm shadow-md disabled:opacity-60"
                >
                  {loading ? "Adding..." : "Add Car"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    document.querySelector("form").reset();
                    setImgPreview("");
                    setErrors({});
                    selectRef.current.value = "";
                  }}
                  className="text-sm px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                >
                  Reset
                </button>
              </div>

              <div className="pt-3 text-xs text-gray-500 dark:text-gray-400">
                By listing a car you agree to provide an accurate description
                and valid images. Keep your contact details up to date.
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCar;

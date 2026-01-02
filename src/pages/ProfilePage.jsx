import React, { use, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getAuth, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { FaUser, FaCamera, FaSave, FaEnvelope } from "react-icons/fa";

const ProfilePage = () => {
  const { user, setUser } = use(AuthContext);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photoURL,
      });

      // Update local state to reflect changes immediately
      const updatedUser = { ...user, displayName, photoURL };
      setUser(updatedUser); // Assuming setUser is available from AuthContext

      Swal.fire({
        title: "Profile Updated",
        text: "Your profile details have been saved successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        customClass: {
            popup: "bg-base-100 text-base-content border border-base-content/10",
            title: "text-base-content"
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        customClass: {
            popup: "bg-base-100 text-base-content border border-base-content/10",
            title: "text-base-content"
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-20 lg:py-28 relative overflow-hidden transition-colors duration-500">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-base-content mb-4">
                My <span className="text-primary">Profile</span>
            </h1>
            <p className="text-lg text-base-content/60">
                Manage your account details and public persona.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column: Profile Card */}
            <div className="lg:col-span-1">
                <div className="glass-card bg-base-100/60 backdrop-blur-xl border border-base-content/10 shadow-xl rounded-3xl p-8 text-center sticky top-32">
                    <div className="relative w-32 h-32 mx-auto mb-6">
                        <div className="w-full h-full rounded-full p-1 border-2 border-dashed border-primary/30">
                            <img 
                                src={photoURL || "https://placehold.co/100x100"} 
                                alt="Profile" 
                                className="w-full h-full rounded-full object-cover shadow-lg"
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg">
                            <FaCamera className="text-xs" />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-base-content mb-1">{displayName || "Anonymous User"}</h2>
                    <p className="text-xs text-base-content/60">{user?.email}</p>
                    
                    <div className="mt-6 pt-6 border-t border-base-content/10 grid grid-cols-2 gap-4">
                        <div className="text-center">
                            <span className="block text-2xl font-bold text-primary">0</span>
                            <span className="text-xs text-base-content/50 uppercase tracking-wider font-bold">Bookings</span>
                        </div>
                        <div className="text-center">
                             <span className="block text-2xl font-bold text-primary">0</span>
                            <span className="text-xs text-base-content/50 uppercase tracking-wider font-bold">Listings</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Edit Form */}
            <div className="lg:col-span-2">
                <div className="glass-card bg-base-100/60 backdrop-blur-xl border border-base-content/10 shadow-xl rounded-3xl p-8 md:p-12">
                    <h3 className="text-lg font-bold text-base-content mb-6 flex items-center gap-2">
                        <FaUser className="text-primary" /> Edit Details
                    </h3>
                    
                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="form-control">
                            <label className="label text-xs font-bold uppercase text-base-content/60 mb-1">Full Name</label>
                            <div className="relative group">
                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="input w-full pl-11 bg-base-200/50 border-base-content/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl transition-all text-base-content"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label text-xs font-bold uppercase text-base-content/60 mb-1">Photo URL</label>
                            <div className="relative group">
                                <FaCamera className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    className="input w-full pl-11 bg-base-200/50 border-base-content/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl transition-all text-base-content"
                                    placeholder="https://example.com/photo.jpg"
                                />
                            </div>
                        </div>

                        {/* Read Only Email */}
                        <div className="form-control">
                             <label className="label text-xs font-bold uppercase text-base-content/60 mb-1">Email Address</label>
                             <div className="relative">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    readOnly
                                    className="input w-full pl-11 bg-base-200/20 border-base-content/5 text-base-content/50 rounded-xl cursor-not-allowed"
                                />
                             </div>
                             <label className="label">
                                <span className="label-text-alt text-base-content/40">Email cannot be changed.</span>
                             </label>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary w-full h-14 text-lg font-bold shadow-xl shadow-primary/30 text-white rounded-xl hover:scale-[1.02] transition-transform"
                            >
                                {loading ? <span className="loading loading-spinner"></span> : "Save Changes"}
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

export default ProfilePage;

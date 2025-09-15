"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import { login, restoreSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const role = useAuthStore((state) => state.role);

  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  // Optional: restore session or any auth effect
  useEffect(() => {
    restoreSession();
    // restoreSession or auth check here if needed
  }, [role, router]);

  // Role config for buttons
  const roleConfigs = [
    {
      key: "farmer",
      label: "Farmer Login",
      icon: "🌱",
      bgColor: "bg-emerald-500 hover:bg-emerald-600",
    },
    {
      key: "collector",
      label: "Middleman Login",
      icon: "🤝",
      bgColor: "bg-teal-500 hover:bg-teal-600",
    },
    {
      key: "manufacturer",
      label: "Manufacturer Login",
      icon: "🏭",
      bgColor: "bg-blue-500 hover:bg-blue-600",
    },
  ];

  // Select a role button handler
  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
  };

  // Form input change handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
 const handleLogin = (r) => {
    login(r); // update role in auth store
    router.push(`/${r}`);
  };
  // Form submit (Sign In)
  const handleSignIn = (e) => {
    e.preventDefault();

    if (!selectedRole) {
      alert("Please select a role first.");
      return;
    }

    if (!formData.fullName || !formData.email || !formData.password) {
      alert("Please fill all the required fields.");
      return;
    }

    // Simulate async login (replace with real auth)
    setTimeout(() => {
      handleLogin(selectedRole);
      console.log("Signing in as:", selectedRole, formData);
      // router.push(`/${selectedRole}`); // Navigate to role page
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 px-4 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            <span className="text-gray-900">Connect the</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Herbal Supply
            </span>
            <br />
            <span className="text-gray-900">Chain</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-md leading-relaxed">
            Bridging farmers, middlemen, and manufacturers in the herbal industry
            with our comprehensive platform
          </p>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Choose Your Role</h2>
            <div className="space-y-3">
              {roleConfigs.map((config) => (
                <button
                  key={config.key}
                  onClick={() => handleRoleSelect(config.key)}
                  className={`w-full ${config.bgColor} text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-md hover:shadow-lg transform hover:scale-[1.03] hover:-translate-y-0.5 ${
                    selectedRole === config.key ? "ring-4 ring-emerald-400" : ""
                  }`}
                  type="button"
                >
                  <span className="text-xl">{config.icon}</span>
                  <span className="text-base">{config.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 max-w-xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600 text-base">Sign in to your HERBIFY account</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all duration-200 text-base"
                disabled={!selectedRole}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all duration-200 text-base"
                disabled={!selectedRole}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all duration-200 text-base"
                disabled={!selectedRole}
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
                  disabled={!selectedRole}
                />
                <span className="ml-2 text-gray-700 font-medium">Remember me</span>
              </label>
              <a
                href="#"
                className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2.5 rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg ${
                !selectedRole ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!selectedRole}
            >
              Sign In
            </button>
          </form>

          <div className="bg-yellow-200 rounded-xl p-6 mt-6 max-w-xl mx-auto border border-yellow-300 shadow-inner">
            <p className="text-center text-gray-800 text-base font-semibold">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// src/pages/Account.tsx
import { useAuth } from "../context/AuthContext";
import Shop from "../pages/Shop"; // import the existing Shop component

const Account = () => {
  const { user } = useAuth();

  if (!user)
    return <p className="text-center mt-10 text-red-500">Please login first</p>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      {/* Profile Card */}
      <div className="bg-white shadow rounded-lg p-6 flex gap-6 items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
          {user.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-400">Member since 2026</p>
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-semibold mb-3">My Orders</h3>
          <p className="text-gray-500">No purchases yet.</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-semibold mb-3">My Courses</h3>
          <p className="text-gray-500">No courses enrolled yet.</p>
        </div>
      </div>

      {/* Shop Section */}
      <Shop /> {/* 🔹 This renders the Shop page exactly as is */}
    </div>
  );
};

export default Account;

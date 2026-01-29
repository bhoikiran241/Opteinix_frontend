// src/routes/AdminRoute.tsx
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading } = useAuth();

  // ⏳ wait until auth is restored from localStorage
  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  // 🔐 not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ⛔ logged in but not admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ admin allowed
  return <>{children}</>;
}

import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userAtom } from "../atoms/user.atom";
import { Loading } from "../layouts/Loading";

export const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const user = useAtomValue(userAtom);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(false);
  }, [user]);

  if (loading) return <Loading />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/account" replace />;
  }

  return <Outlet />;
};
import React, { Children } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const Protected = () => {
  const { loading, user } = useAuth();
  const navigate = Navigate();

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protected;

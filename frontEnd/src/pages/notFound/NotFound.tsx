import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl">Page Not Found</p>
        <Link to="/" className="text-blue-500 underline">
          Go back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

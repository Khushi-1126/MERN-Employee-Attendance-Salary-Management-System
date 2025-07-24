import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { email } = JSON.parse(storedUser);

      //  to fetch data from backend
      axios
        .get(`http://localhost:8080/api/auth/profile/${email}`)
        .then((res) => {
          setUser(res.data); // Real DB user data
        })
        .catch((err) => {
          console.error("Failed to fetch profile", err);
        });
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
   
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center tracking-wide">
          My Profile
        </h2>
        <div className="space-y-4 text-lg text-gray-800">
          <p>
            <span className="font-semibold text-blue-600">Name:</span>{' '}
            <span className="text-black font-bold">{user.name}</span>
          </p>
          <p>
            <span className="font-semibold text-blue-600">Email:</span>{' '}
            <span className="text-black font-medium">{user.email}</span>
          </p>
          <p>
            <span className="font-semibold text-blue-600">Role:</span>{' '}
            <span className="text-black font-medium">{user.role}</span>
          </p>
          {user.employeeType && (
            <p>
              <span className="font-semibold text-blue-600">Employee Type:</span>{' '}
              <span className="text-black font-medium">{user.employeeType}</span>
            </p>
          )}
        </div>
      </div>
    </div>

  );
};

export default Profile;

import { PrincipleInfoInterface } from "@/interfaces/Principle/Register/requestInterface";
import React, { useState } from "react";

const PrincipleRegisterPage = () => {
  const [principleInfo, setPrincipleInfo] = useState<PrincipleInfoInterface>({
    fullName: "",
    email: "",
    contactNumber: 0,
    password: "",
    _id: "", // safe for frontend
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPrincipleInfo((prev) => ({
      ...prev,
      [name]: name === "contactNumber" ? Number(value) : value,
    }));
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form>
        <input
          type="text"
          name="fullName"
          placeholder="Enter your name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />

        <input
          type="number"
          name="contactNumber"
          placeholder="Enter number"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default PrincipleRegisterPage;

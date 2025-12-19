import { StudenterRegisterInterface } from "@/interfaces/Student/Student";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";

const StudentRegisterPage = () => {
  const [data, setData] = useState<StudenterRegisterInterface>({
    aadharNumber: 0,
    address: "",
    contactNumber: 0,
    diseCode: 0,
    email: "",
    fatherName: "",
    fullName: "",
    motherName: "",
    panNumber: "",
    password: "",
    profilePicture: "",
    ssmId: 0,
  });
  const router = useRouter()
  const [error, setError] = useState<string>("")
  const [isLoding, setIsLoading] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    try {
        
    } catch  {
        setError("Failed to register student!")
    }finally{
        setIsLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-md">
      <input required
        name="fullName"
        placeholder="Full Name"
        value={data.fullName}
        onChange={handleChange}
      />
      <input required
        name="fatherName"
        placeholder="Father Name"
        value={data.fatherName}
        onChange={handleChange}
      />
      <input required
        name="motherName"
        placeholder="Mother Name"
        value={data.motherName}
        onChange={handleChange}
      />
      <input required
        name="email"
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
      />
      <input required
        name="password"
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
      />
      <input required
        name="address"
        placeholder="Address"
        value={data.address}
        onChange={handleChange}
      />

      <input required
        name="aadharNumber"
        type="number"
        placeholder="Aadhar Number"
        value={data.aadharNumber}
        onChange={handleChange}
      />
      <input required
        name="contactNumber"
        type="number"
        placeholder="Contact Number"
        value={data.contactNumber}
        onChange={handleChange}
      />
      <input required
        name="diseCode"
        type="number"
        placeholder="DISE Code"
        value={data.diseCode}
        onChange={handleChange}
      />
      <input required
        name="ssmId"
        type="number"
        placeholder="SSM ID"
        value={data.ssmId}
        onChange={handleChange}
      />

      <input required
        name="panNumber"
        placeholder="PAN Number"
        value={data.panNumber}
        onChange={handleChange}
      />
      <input required
        name="profilePicture"
        placeholder="Profile Picture URL"
        value={data.profilePicture}
        onChange={handleChange}
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default StudentRegisterPage;

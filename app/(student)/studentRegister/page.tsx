"use client";

import { StudentInterface } from "@/interfaces/Student/StudentInterface";
import { convertToBase64 } from "@/services/Image/ConvertToBase64";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

const StudentRegister = () => {
    const [imageLink, setImage] = useState<string>("")
  const [studentInfo, setStudentInfo] = useState<StudentInterface>({
    fullName: "",
    diseCode: 0,
    currentClass: "",
    contactNumber: 0,
    fatherName: "",
    motherName: "",
    adharCardNumber: 0,
    ssmId: 0,
    address: "",
    profilePicture: "",
    password: "",
    // schoolId: optional (can add later)
  });

  // LKG → UKG → Class 1 → Class 12
  const classes = [
    "LKG",
    "UKG",
    ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`),
  ];

  // Generic input handler
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Numeric fields must be converted
    const numericFields = [
      "diseCode",
      "contactNumber",
      "adharCardNumber",
      "ssmId",
    ];

    setStudentInfo((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

    const handleImageChange = async (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0]

        const link = await convertToBase64(file as File);

        if(link){
            setImage(link as string)
            setStudentInfo(prev=> ({
                ...prev,
                profilePicture:link
            }))
        }

    }
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Student Registration</h2>

      <form className="flex flex-col gap-3">
        {/* Full Name */}
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Enter full name"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />

        {/* DISE Code */}
        <label htmlFor="diseCode">School DISE Code</label>
        <input
          id="diseCode"
          name="diseCode"
          type="number"
          placeholder="Enter DISE code"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />

        {/* Class Selection */}
        <label htmlFor="currentClass">Current Class</label>
        <select
          id="currentClass"
          name="currentClass"
          onChange={handleInputChange}
          className="border p-2 rounded"
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        {/* Contact Number */}
        <label htmlFor="contactNumber">Contact Number</label>
        <input
          id="contactNumber"
          name="contactNumber"
          type="number"
          placeholder="Enter contact number"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />

        {/* Father Name */}
        <label htmlFor="fatherName">Father Name</label>
        <input
          id="fatherName"
          name="fatherName"
          type="text"
          placeholder="Enter father name"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />

        {/* Mother Name */}
        <label htmlFor="motherName">Mother Name</label>
        <input
          id="motherName"
          name="motherName"
          type="text"
          placeholder="Enter mother name"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />

        {/* Aadhar Number */}
        <label htmlFor="adharCardNumber">Aadhar Card Number</label>
        <input
          id="adharCardNumber"
          name="adharCardNumber"
          type="number"
          placeholder="Enter Aadhar Number"
          onChange={handleInputChange}
          className="border p-2 rounded"
          minLength={12}
          maxLength={12}
        />

        {/* SSM ID */}
        <label htmlFor="ssmId">SSM ID</label>
        <input
          id="ssmId"
          name="ssmId"
          type="number"
          placeholder="Enter SSM ID"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />

        {/* Address */}
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          name="address"
          placeholder="Enter address"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />

        {/* Profile Picture URL */}
        <label htmlFor="profilePicture">Profile Picture URL</label>
        <input
          id="profilePicture"
          name="profilePicture"
          type="file"
          onChange={handleImageChange}
          className="border p-2 rounded"
        />

        {/* Password */}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Create password"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
      </form>

      {/* LIVE PREVIEW FOR DEBUGGING */}
      { imageLink && <Image src={imageLink} width={50} height={50} alt="Profile phone"/>}
      <div className="mt-5  p-3 rounded">
        <h3 className="font-semibold mb-1">Live Student Data:</h3>
        <pre className="text-sm">{JSON.stringify(studentInfo, null, 2)}</pre>
      </div>
    </div>
  );
};

export default StudentRegister;

"use client";

import { getSchoolInfoResponse } from "@/interfaces/School/getSchoolInfo";
import { StudentInterface } from "@/interfaces/Student/StudentInterface";
import { convertToBase64 } from "@/services/Image/ConvertToBase64";
import { getSchoolInfoByDiseCode } from "@/services/School/getSchoolBydiseCode";
import { registerStudent } from "@/services/Student/registerStudent";
import mongoose from "mongoose";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const StudentRegister = () => {
    const router = useRouter()
    const [imageLink, setImage] = useState<string>("")
    const [isLoading , setIsLoading] = useState<boolean>(false)
    const [isImageLoading, setImageLoading] = useState<boolean>(false)
    const [error, setError ] = useState<string>("")
    const [schoolError, setSchoolError] = useState<string>("")
    const [schoolInfo, setSchoolInfo] = useState<getSchoolInfoResponse>({
        success:false,
        school:{
            _id:"",
            schoolName:""
        }
    })
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
        setImageLoading(true)
        try {
          const file = e.target.files?.[0];

          const link = await convertToBase64(file as File);

          if (link) {
            setImage(link as string);
            setStudentInfo((prev) => ({
              ...prev,
              profilePicture: link,
            }));
          }
        } catch (error) {
            console.log(error)
        }finally{
            setImageLoading(false)
        }

    }
useEffect(() => {
  if (String(studentInfo.diseCode).length < 5) return;

  const timer = setTimeout(() => {
    (async () => {
      const response = await getSchoolInfoByDiseCode(studentInfo.diseCode);

      if (response.error) {
        setSchoolError(response.error);
        return;
      }

      if (response.success) {

        setStudentInfo((prev) => ({
          ...prev,
          schoolId: response.school?._id as mongoose.Types.ObjectId,
        }));

        setSchoolInfo(response);
      }
    })();
  }, 700); // debounce delay (recommended 500–800ms)

  // Cleanup → cancel previous timer when DISE code changes
  return () => clearTimeout(timer);
}, [studentInfo.diseCode]);

const handleSubmit = async (e:FormEvent<HTMLFormElement>) :Promise<void>=>{
    e.preventDefault()
    setIsLoading(true)
    try {
        const response = await registerStudent({
fullName:studentInfo.fullName,
address:studentInfo.address,
adharCardNumber:studentInfo.adharCardNumber,
contactNumber:studentInfo.contactNumber,
currentClass:studentInfo.currentClass,
diseCode:studentInfo.diseCode,
fatherName:studentInfo.fatherName,
motherName:studentInfo.motherName,
password:studentInfo.password,
profilePicture:studentInfo.profilePicture,
ssmId:studentInfo.ssmId,
schoolId:studentInfo.schoolId
        })

        if(response.error){
            setError(response.error)
        }else if(response.success){
            localStorage.setItem("smaToken" , response.token as string)
router.replace("/studentDashBoard")
        }else{
            setError("Somethign wen wrong!")
        }
    } catch (error) {
        console.log(error)
    }finally{
        setIsLoading(false)
    }
}
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Student Registration</h2>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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
        //   disabled={schoolInfo.success}
        />
        {schoolInfo.success && <div className="text-green-400">{schoolInfo.school?.schoolName}</div>}
        {schoolError && <div>{schoolError}</div>}
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
        disabled={isImageLoading}
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
        <button type="submit" disabled={isLoading}>
          {isLoading?"Registering...":"Register"}
        </button>
      </form>

      {/* LIVE PREVIEW FOR DEBUGGING */}
      {imageLink && (
        <Image src={imageLink} width={50} height={50} alt="Profile phone" />
      )}
      {error && (
        <div>{error}</div>
      )}
      <div className="mt-5  p-3 rounded">
        <h3 className="font-semibold mb-1">Live Student Data:</h3>
        <pre className="text-sm">{JSON.stringify(studentInfo, null, 2)}</pre>
      </div>
    </div>
  );
};

export default StudentRegister;

"use client";

import { getSchoolInfoResponse } from "@/interfaces/School/getSchoolInfo";
import { StudentInterface } from "@/interfaces/Student/StudentInterface";
import { convertToBase64 } from "@/services/Image/ConvertToBase64";
import { getSchoolInfoByDiseCode } from "@/services/School/getSchoolBydiseCode";
import { registerStudent } from "@/services/Student/registerStudent";
import mongoose from "mongoose";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  ChangeEvent,
  FormEvent,
  Suspense,
  useEffect,
  useState,
} from "react";

const StudentRegister = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [imageLink, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isImageLoading, setImageLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [schoolError, setSchoolError] = useState<string>("");

  const [schoolInfo, setSchoolInfo] = useState<getSchoolInfoResponse>({
    success: false,
    school: {
      _id: "",
      schoolName: "",
    },
  });

  const [studentInfo, setStudentInfo] = useState<StudentInterface>({
    fullName: "",
    diseCode: 0,
    currentClass: 0,
    contactNumber: 0,
    fatherName: "",
    motherName: "",
    adharCardNumber: 0,
    ssmId: 0,
    address: "",
    profilePicture: "",
    password: "",
  });

  // ---------------------------------------------
  // STEP 1: Load default values from Search Params
  // ---------------------------------------------
  useEffect(() => {
    const dise = searchParams.get("diseCode");
    const cls = searchParams.get("currentClass");

    setStudentInfo((prev) => ({
      ...prev,
      diseCode: dise ? Number(dise) : prev.diseCode,
      currentClass: cls ? Number(cls) : prev.currentClass,
    }));
  }, []);

  // Class options
  const classes = [
    "LKG",
    "UKG",
    ...Array.from({ length: 12 }, (_, i) => i + 1),
  ];

  // Generic handler
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const numericFields = [
      "diseCode",
      "contactNumber",
      "adharCardNumber",
      "ssmId",
      "currentClass",
    ];

    setStudentInfo((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  // IMAGE UPLOAD
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageLoading(true);
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
    } finally {
      setImageLoading(false);
    }
  };

  // Fetch school by DISE code (debounced)
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
    }, 700);

    return () => clearTimeout(timer);
  }, [studentInfo.diseCode]);

  // SUBMIT FORM
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await registerStudent({
        fullName: studentInfo.fullName,
        address: studentInfo.address,
        adharCardNumber: studentInfo.adharCardNumber,
        contactNumber: studentInfo.contactNumber,
        currentClass: studentInfo.currentClass,
        diseCode: studentInfo.diseCode,
        fatherName: studentInfo.fatherName,
        motherName: studentInfo.motherName,
        password: studentInfo.password,
        profilePicture: studentInfo.profilePicture,
        ssmId: studentInfo.ssmId,
        schoolId: studentInfo.schoolId,
      });

      if (response.error) {
        setError(response.error);
      } else if (response.success) {
        localStorage.setItem("smaToken", response.token as string);
        router.replace("/studentDashBoard");
      } else {
        setError("Something went wrong!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Student Registration</h2>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        {/* Full Name */}
        <label>Full Name</label>
        <input
          name="fullName"
          type="text"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />

        {/* DISE Code */}
        <label>School DISE Code</label>
        <input
          name="diseCode"
          type="number"
          onChange={handleInputChange}
          defaultValue={studentInfo.diseCode || ""}
          className="border p-2 rounded"
        />

        {schoolInfo.success && (
          <div className="text-green-500">{schoolInfo.school?.schoolName}</div>
        )}
        {schoolError && <div className="text-red-500">{schoolError}</div>}

        {/* Class */}
        <label>Current Class</label>
        <select
          name="currentClass"
          onChange={handleInputChange}
          defaultValue={studentInfo.currentClass || ""}
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
        <label>Contact Number</label>
        <input
          name="contactNumber"
          type="number"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />

        {/* Father Name */}
        <label>Father Name</label>
        <input
          name="fatherName"
          type="text"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />

        {/* Mother Name */}
        <label>Mother Name</label>
        <input
          name="motherName"
          type="text"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />

        {/* Aadhar */}
        <label>Aadhar Card Number</label>
        <input
          name="adharCardNumber"
          type="number"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />

        {/* SSM ID */}
        <label>SSM ID</label>
        <input
          name="ssmId"
          type="number"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />

        {/* Address */}
        <label>Address</label>
        <textarea
          name="address"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />

        {/* Profile Picture */}
        <label>Profile Picture</label>
        <input
          type="file"
          name="profilePicture"
          disabled={isImageLoading}
          onChange={handleImageChange}
          className="border p-2 rounded"
        />

        {/* Password */}
        <label>Password</label>
        <input
          name="password"
          type="password"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="p-2 bg-blue-600 text-white rounded"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* PREVIEW */}
      {imageLink && (
        <Image src={imageLink} width={50} height={50} alt="Profile" />
      )}

      {error && <div className="text-red-500 mt-2">{error}</div>}

      <div className="mt-5 p-3 rounded bg-gray-100">
        <h3 className="font-semibold mb-1">Live Student Data:</h3>
        <pre className="text-sm">{JSON.stringify(studentInfo, null, 2)}</pre>
      </div>
    </div>
  );
};

const StudentRegisterPage = () => {
  return (
    <Suspense>
      <StudentRegister />
    </Suspense>
  );
};

export default StudentRegisterPage;

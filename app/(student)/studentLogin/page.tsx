"use client";

import { StudentLoginInterface } from "@/interfaces/Student/Student";
import { StudentApi } from "@/services/Student/student";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const StudentLogin = () => {
  const [studentData, setStudentData] = useState<StudentLoginInterface>({
    email: "",
    password: "",
    ssmId: 0,
  });
  const studentServices = new StudentApi();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------- LOGIN ID HANDLER ----------------
  const handleLoginIdChange = (value: string) => {
    if (value.includes("@")) {
      setStudentData((prev) => ({
        ...prev,
        email: value,
        ssmId: 0,
      }));
    } else {
      setStudentData((prev) => ({
        ...prev,
        ssmId: Number(value),
        email: "",
      }));
    }
  };

  // ---------------- INPUT HANDLER ----------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "loginId") {
      handleLoginIdChange(value);
      return;
    }

    setStudentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await studentServices.loginStudent(studentData);

      if (response.success) {
        router.replace("/studentDashboard");
      } else {
        setError(response.error || "Invalid credentials");
      }
    } catch (err) {
      setError((err as Error).message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full pt-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="loginId">Email or SSM ID</label>
        <input
          type="text"
          name="loginId"
          id="loginId"
          required
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={handleChange}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default StudentLogin;

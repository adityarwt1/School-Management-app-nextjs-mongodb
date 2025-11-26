"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  fullName: z.string(),
  mobileNumber: z.string(),
  diseCode: z.string(),
  schoolName: z.string(),
  pincode: z.string(),
  classFrm: z.string(),
  classTo: z.string(),
  stateName: z.string(),
  districtName: z.string(),
  blockName: z.string(),
  email: z.string(),
  address: z.string(),
  schCatDesc: z.string(),
  schLocRuralUrban: z.string(),
});

type FormValues = z.infer<typeof formSchema>; // 👈 Generated type

// ---------------- VALIDATION SCHEMA ----------------


export default function Principle() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      diseCode: "",
      schoolName: "",
      pincode: "",
      classFrm: "",
      classTo: "",
      stateName: "",
      districtName: "",
      blockName: "",
      email: "",
      address: "",
      schCatDesc: "",
      schLocRuralUrban: "",
    },
  });

  const onSubmit = (values :FormValues) => {
    console.log("FINAL FORM VALUES:", values);
  };

  return (
    <div className="flex flex-col w-full p-4 gap-5">
      <div className="w-full border-b pb-1 uppercase font-bold text-xl dark:border-white/20">
        Principal & School Information
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8 w-full"
        >
          {/* ---------------- PRINCIPAL INFO ---------------- */}
          <div>
            <div className="font-bold text-xl uppercase border-b pb-1 mb-4 dark:border-white/20">
              Principal Info
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex. Aditya Rawat" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mobile Number */}
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="9876543210"
                        {...field}
                        maxLength={10}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* ---------------- SCHOOL INFO ---------------- */}
          <div>
            <div className="font-bold text-xl uppercase border-b pb-1 mb-4 dark:border-white/20">
              School Info
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* DISE Code */}
              <FormField
                control={form.control}
                name="diseCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UDISE Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="11-digit code"
                        maxLength={11}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* School Name */}
              <FormField
                control={form.control}
                name="schoolName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex. Govt HSS Barwani" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pincode */}
              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pincode</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="6-digit pincode"
                        maxLength={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Class From */}
              <FormField
                control={form.control}
                name="classFrm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class From</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (num) => (
                              <SelectItem key={num} value={String(num)}>
                                {num}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Class To */}
              <FormField
                control={form.control}
                name="classTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class To</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (num) => (
                              <SelectItem key={num} value={String(num)}>
                                {num}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* State Name */}
              <FormField
                control={form.control}
                name="stateName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex. Madhya Pradesh" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* District Name */}
              <FormField
                control={form.control}
                name="districtName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex. Barwani" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Block */}
              <FormField
                control={form.control}
                name="blockName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Block Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex. Rajpur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2 lg:col-span-3">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Street, Ward No., Village..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="schCatDesc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary</SelectItem>
                          <SelectItem value="secondary">Secondary</SelectItem>
                          <SelectItem value="higher">
                            Higher Secondary
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Urban / Rural */}
              <FormField
                control={form.control}
                name="schLocRuralUrban"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Urban / Rural" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urban">Urban</SelectItem>
                          <SelectItem value="rural">Rural</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <Button type="submit" className="w-full sm:w-44 self-center">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

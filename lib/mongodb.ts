import mongoose from "mongoose";

export const mongoconnect = async (): Promise<boolean> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "SchoolManagamentApp",
    });
    return true;
  } catch (error) {
    console.log((error as Error).message);
    return false;
  }
};

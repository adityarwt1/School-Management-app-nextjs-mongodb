import mongoose, { Document, Schema } from "mongoose";

interface SchoolInterface extends Document {
  udiseSchCode: string;
  schoolName: string;
  schoolId: number;
  pincode: number;
  schCategoryId: number;
  schType: number;
  schMgmtId: number;
  schMgmtDesc: string;
  classFrm: number;
  classTo: number;
  schoolStatus: number;
  schoolStatusName: string;
  stateName: string;
  districtName: string;
  blockName: string;
  clusterName: string;
  villageName: string;
  email: string | null;
  address: string;
  schCatDesc: string;
  schLocRuralUrban: number;
  schLocDesc: string;
  schTypeDesc: string;
  schMgmtParentId: number;
  schMgmNationalDesc: string | null;
  schCategoryType: string;
  schMgmtType: string;
  schBroadMgmtId: number;
  yearId: number;
  yearDesc: string;
  lgdUrbanLocalBodyId: string;
  lgdUrbanLocalBodyName: string;
  lgdWardId: string;
  lgdWardName: string;
  lgdVillageId: string | null;
  lgdVillName: string | null;
  lgdPanchayatId: string | null;
  lgdVillPanchayatName: string | null;
  lgdBlockId: string;
  lgdBlockName: string | null;
  lastModifiedTime: Date;
  sessionYear: string | null;
  schMgmtDescSt: string;
  latitude: number;
  longitude: number;
  keyFlag: string | null;
  pmShriYn: number;
}

const SchoolSchema: Schema<SchoolInterface> = new Schema(
  {
    udiseSchCode: { type: String, required: true },
    schoolName: { type: String, required: true },
    schoolId: { type: Number, required: true },
    pincode: { type: Number },

    schCategoryId: { type: Number },
    schType: { type: Number },
    schMgmtId: { type: Number },
    schMgmtDesc: { type: String },

    classFrm: { type: Number },
    classTo: { type: Number },

    schoolStatus: { type: Number },
    schoolStatusName: { type: String },

    stateName: { type: String },
    districtName: { type: String },
    blockName: { type: String },
    clusterName: { type: String },
    villageName: { type: String },

    email: { type: String, default: null },
    address: { type: String },

    schCatDesc: { type: String },
    schLocRuralUrban: { type: Number },
    schLocDesc: { type: String },

    schTypeDesc: { type: String },

    schMgmtParentId: { type: Number },
    schMgmNationalDesc: { type: String, default: null },

    schCategoryType: { type: String },
    schMgmtType: { type: String },
    schBroadMgmtId: { type: Number },

    yearId: { type: Number },
    yearDesc: { type: String },

    lgdUrbanLocalBodyId: { type: String },
    lgdUrbanLocalBodyName: { type: String },

    lgdWardId: { type: String },
    lgdWardName: { type: String },

    lgdVillageId: { type: String, default: null },
    lgdVillName: { type: String, default: null },

    lgdPanchayatId: { type: String, default: null },
    lgdVillPanchayatName: { type: String, default: null },

    lgdBlockId: { type: String },
    lgdBlockName: { type: String, default: null },

    lastModifiedTime: { type: Date },
    sessionYear: { type: String, default: null },

    schMgmtDescSt: { type: String },

    latitude: { type: Number },
    longitude: { type: Number },

    keyFlag: { type: String, default: null },

    pmShriYn: { type: Number },
  },
  { timestamps: true }
);

const School =
  mongoose.models.School ||
  mongoose.model<SchoolInterface>("School", SchoolSchema);

export default School;

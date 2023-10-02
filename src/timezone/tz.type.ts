import { DisplayFormat } from "timezone-soft";

export type TConvertTz = {
  value: string;
  abbr: string;
  offset: number;
  text: string;
};

export type TCompareConvert = TConvertTz & {
  utc: TConvertTz[];
};

export type ExtendSoft = DisplayFormat & {
  name?: string;
  long?: string;
  standard: {
    abbr: string;
    offset: number;
  };
};

export type ILabelStyle = "original" | "altName" | "abbrev";

export type ITimezoneOption = {
  value: string;
  abbr: string;
  offset: number;
  text: string;
  altName: string;
} | null;

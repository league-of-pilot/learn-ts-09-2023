import { DisplayFormat } from "timezone-soft";

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

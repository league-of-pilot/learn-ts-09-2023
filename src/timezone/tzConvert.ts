export type TConvertTz = {
  value: string;
  abbr: string;
  offset: number;
  text: string;
};

export type TCompareConvert = TConvertTz & {
  utc: TConvertTz[];
};

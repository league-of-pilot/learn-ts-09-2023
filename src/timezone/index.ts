import spacetime from "spacetime";
import soft from "timezone-soft";
import { ExtendSoft, ILabelStyle, ITimezoneOption } from "./tz.type";
import {
  compareName,
  convertJsonData,
  genFileName,
  quickSave,
  saveFile,
} from "./tz.utils";
import { tzOrigin } from "./tzOrigin.const";
import { allTimezones } from "./tzSelect.const";
// import path from "path";

export const convertTz = () => {
  const result = [] as any;
  let error = 0;
  let objFilter = {} as any;

  for (let i = 0; i < tzOrigin.length; i++) {
    let pushValue;
    const tz = tzOrigin[i];
    // for (let tz of tzOrigin) {
    const searchText = tz.text.split(") ")[1];
    const timeSoft = soft(searchText)[0] as ExtendSoft;

    if (!timeSoft) {
      // console.log("🚀 undefined", tz);
      tz.value = tz.value;
      error++;
      pushValue = tz;
    } else {
      const {
        name: timeSoftName,
        long: text,
        standard: { abbr, offset },
      } = timeSoft;

      if (!timeSoftName || !text || !abbr) {
        console.log("🚀 timeSoft - ", i, timeSoft);
        console.log("🚀 tz - ", i, tz);
      }

      const isUsedOrigin = compareName(tz.value, timeSoftName);
      const finalValue = isUsedOrigin ? tz.value : timeSoftName;

      const objConvert = {
        value: finalValue,
        abbr,
        offset: offset ?? 0,
        text: text ?? "✨ name",
        utc: tz.utc,
      };
      pushValue = objConvert;
    }

    result.push(pushValue);

    const abbr = pushValue.abbr;
    if (!objFilter[abbr]) {
      objFilter[abbr] = 1;
    } else {
      objFilter[abbr]++;
    }
  }

  const filterDup = Object.entries(objFilter).filter(([key, value]) => {
    const num = value as number;
    return num > 1;
  });

  console.log("🚀 index L109-filterDup", filterDup);
  console.log("🚀 index L74-error", error);
  quickSave(result);
};

// https://github.dev/ndom91/react-timezone-select
export const genTzSelect = (labelStyle: ILabelStyle = "original") => {
  const displayValue = "UTC";
  const maxAbbrLength = 4;

  const options = Object.entries(allTimezones)
    .map((zone) => {
      try {
        const now = spacetime.now(zone[0]);
        const tz = now.timezone();
        const tzStrings = soft(zone[0]);

        let label = "";

        const standardAbbr = tzStrings?.[0]?.standard?.abbr ?? "";
        const dstAbbr = tzStrings?.[0]?.daylight?.abbr ?? standardAbbr;

        let abbr = now.isDST() ? dstAbbr : standardAbbr;

        const standardAltName = tzStrings?.[0]?.standard?.name ?? "";
        const dstAltName = tzStrings?.[0]?.daylight?.name ?? standardAltName;

        let altName = now.isDST() ? dstAltName : standardAltName;

        const min = tz.current.offset * 60;
        const hr =
          `${(min / 60) ^ 0}:` + (min % 60 === 0 ? "00" : Math.abs(min % 60));
        const prefix = `(${displayValue}${hr.includes("-") ? hr : `+${hr}`}) ${
          zone[1]
        }`;

        switch (labelStyle) {
          case "original":
            label = prefix;
            break;
          case "altName":
            label = `${prefix} ${altName ? `(${altName})` : ""}`;
            break;
          case "abbrev":
            label = `${prefix} (${abbr.substring(0, maxAbbrLength)})`;
            break;
          default:
            label = `${prefix}`;
        }

        return {
          value: tz.name,
          abbr: abbr,
          offset: tz.current.offset,
          text: label,
          altName: altName,
        };
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .sort(
      (a: ITimezoneOption, b: ITimezoneOption) =>
        (a?.offset ?? 0) - (b?.offset ?? 0)
    );

  quickSave(options);
};

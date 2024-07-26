import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import z, { object } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const createUniqueArray = (length: number) => {
  if (100 - 1 + 1 < length) {
    throw new Error("Range is too small to generate unique values");
  }

  const set = new Set();
  while (set.size < length) {
    const randomNumber = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    set.add(randomNumber);
  }
  return Array.from(set);
};

export const createListDefaultValueForm = (numSize: number, prefixName: string, defaultValue: any) => {
  return createUniqueArray(numSize).map((_, index) => {
    const Index = `${prefixName}${index + 1}`;
    return { [Index]: defaultValue };
  });
};

export const createListSchemaForm = (numSize: number, prefixName: string, defaultValue: any) => {
  return createUniqueArray(numSize)?.reduce((acc: any, _, index) => {
    acc[`${prefixName}${index + 1}`] = defaultValue;
    return acc;
  }, {});
};
// biến từ 1 mảng object sang một object để có thể giải ra
export const formatDefaultValue = (defaultValueList: Array<any>) => {
  return defaultValueList?.reduce((acc, obj) => {
    const key = Object.keys(obj)[0];
    const value = obj[key];
    acc[key] = value;
    return acc;
  }, {});
};

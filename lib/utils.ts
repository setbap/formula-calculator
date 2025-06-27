import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertPersianToEnglish(value: string): string {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let converted = value;
  persianNumbers.forEach((persian, index) => {
    converted = converted.replace(
      new RegExp(persian, "g"),
      englishNumbers[index]
    );
  });

  return converted;
}

export function selectAllText(
  element: HTMLInputElement | HTMLTextAreaElement
): void {
  element.select();
}

export function handleInputFocus(
  e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
): void {
  setTimeout(() => {
    e.target.select();
  }, 0);
}

export function handleInputChange(
  e: React.ChangeEvent<HTMLInputElement>,
  originalOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
): void {
  const convertedValue = convertPersianToEnglish(e.target.value);

  const newEvent = {
    ...e,
    target: {
      ...e.target,
      value: convertedValue,
    },
  } as React.ChangeEvent<HTMLInputElement>;

  if (originalOnChange) {
    originalOnChange(newEvent);
  }
}

export function handleTextareaChange(
  e: React.ChangeEvent<HTMLTextAreaElement>,
  originalOnChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
): void {
  const convertedValue = convertPersianToEnglish(e.target.value);

  const newEvent = {
    ...e,
    target: {
      ...e.target,
      value: convertedValue,
    },
  } as React.ChangeEvent<HTMLTextAreaElement>;

  if (originalOnChange) {
    originalOnChange(newEvent);
  }
}

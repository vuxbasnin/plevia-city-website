import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO, isValid as isValidDate } from 'date-fns';
import { Timestamp } from "firebase/firestore";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to format various date/time input types for display in the UI.
export const formatDateForDisplay = (timestampInput: Timestamp | Date | { seconds: number, nanoseconds: number } | string | undefined, dateFormat: string = "dd/MM/yyyy HH:mm"): string => {
  if (!timestampInput) return "N/A";
  let date: Date;

  if (timestampInput instanceof Date) {
    date = timestampInput;
  } else if (timestampInput instanceof Timestamp) {
    date = timestampInput.toDate();
  } else if (typeof timestampInput === 'object' && timestampInput !== null && 'seconds' in timestampInput && typeof timestampInput.seconds === 'number' && 'nanoseconds' in timestampInput && typeof timestampInput.nanoseconds === 'number') {
    date = new Timestamp(timestampInput.seconds, timestampInput.nanoseconds).toDate();
  } else if (typeof timestampInput === 'string') {
    date = parseISO(timestampInput);
    if (!isValidDate(date)) {
        date = new Date(timestampInput);
    }
  } else {
    console.warn("formatDateForDisplay received an unexpected input type:", timestampInput);
    return "Invalid Input";
  }

  if (!isValidDate(date)) {
    console.warn("formatDateForDisplay resulted in Invalid Date for input:", timestampInput);
    return "Invalid Date";
  }

  try {
    return format(date, dateFormat);
  } catch (error) {
    console.error("Error formatting date:", error, "Original input:", timestampInput, "Parsed date:", date);
    return "Format Error";
  }
};

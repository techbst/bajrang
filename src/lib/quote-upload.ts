export const quoteFileExtensions = [".xlsx", ".xls", ".csv", ".pdf"] as const;
export const maxQuoteFileBytes = 10 * 1024 * 1024;

export function quoteFileExtension(filename: string) {
  return quoteFileExtensions.find((extension) => filename.toLowerCase().endsWith(extension));
}

export function quoteFileError(file: File) {
  if (!quoteFileExtension(file.name)) return "Choose an Excel, CSV, or PDF file.";
  if (!file.size) return "This file is empty. Choose another file.";
  if (file.size > maxQuoteFileBytes) return "Choose a file no larger than 10 MB.";
  return undefined;
}

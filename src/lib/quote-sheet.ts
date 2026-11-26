export const maxSheetRows = 1000;
const maxSheetColumns = 64;

export async function readQuoteSheet(file: File) {
  const { read, utils } = await import("xlsx");
  const workbook = read(await file.arrayBuffer(), {
    raw: true,
    sheets: 0,
    sheetRows: maxSheetRows + 2
  });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  if (!sheet?.["!ref"]) throw new Error("No rows found in the first sheet.");
  const range = utils.decode_range(sheet["!ref"]);
  if (range.e.c - range.s.c >= maxSheetColumns)
    throw new Error("The sheet has more than 64 columns.");
  if (range.e.r - range.s.r > maxSheetRows)
    throw new Error("The sheet has more than 1,000 data rows.");
  const rows = utils.sheet_to_json<string[]>(sheet, {
    header: 1,
    raw: false,
    defval: "",
    blankrows: false
  });
  if (!rows.length) throw new Error("No rows found in the first sheet.");
  return rows.map((row) => row.map((cell) => String(cell).trim()));
}

export const quoteColumns = [
  {
    key: "partNumber",
    label: "Part Number",
    required: true,
    matches:
      /^(part(\s*(no|number|code|#))?|sku|oem(\s*(no|number|code))?|item\s*(no|number|code))$/i
  },
  {
    key: "description",
    label: "Description",
    required: false,
    matches:
      /^(description|part\s*description|item\s*description|part\s*name|item\s*name|name)$/i
  },
  {
    key: "quantity",
    label: "Quantity",
    required: true,
    matches: /^(qty|quantity|order\s*qty|qty\s*required|units)$/i
  }
] as const;

export type QuoteColumnMap = Record<
  (typeof quoteColumns)[number]["key"],
  string
>;

export function guessQuoteColumns(headers: string[]): QuoteColumnMap {
  return Object.fromEntries(
    quoteColumns.map(({ key, matches }) => {
      const index = headers.findIndex((header) =>
        matches.test(header.replace(/[._-]/g, " ").trim())
      );
      return [key, index < 0 ? "" : String(index)];
    })
  ) as QuoteColumnMap;
}

export function mapQuoteRows(rows: string[][], mapping: QuoteColumnMap) {
  const cell = (row: string[], column: string) =>
    column === "" ? "" : (row[Number(column)] ?? "");
  return rows.map((row) => {
    const partNumber = cell(row, mapping.partNumber);
    const description = cell(row, mapping.description);
    const quantityText = cell(row, mapping.quantity);
    const quantity = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.0+)?$/.test(quantityText)
      ? Number(quantityText.replaceAll(",", ""))
      : NaN;
    const valid =
      Boolean(partNumber) &&
      partNumber.length <= 500 &&
      description.length <= 500 &&
      Number.isSafeInteger(quantity) &&
      quantity > 0;
    return { partNumber, description, quantity, quantityText, valid };
  });
}

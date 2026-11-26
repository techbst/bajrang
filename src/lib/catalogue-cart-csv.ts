type CsvCartItem = {
  partNumber: string;
  description: string;
  productType?: string;
  brand: string;
  vehicle: string;
  assemblyCode: string;
  assemblyName: string;
  quantity: number;
};

export function catalogueCartCsv(items: CsvCartItem[]) {
  const rows = [
    [
      "Part Number",
      "Description",
      "Product Type",
      "Brand",
      "Vehicle",
      "Assembly",
      "Quantity"
    ],
    ...items.map((item) => [
      item.partNumber,
      item.description,
      item.productType ?? "",
      item.brand,
      item.vehicle,
      `${item.assemblyCode} ${item.assemblyName}`.trim(),
      String(item.quantity)
    ])
  ];
  return (
    "\ufeff" +
    rows
      .map((row) =>
        row
          .map((cell) => {
            const value = /^[\s]*[=+@-]|^[\t\r\n]/.test(cell)
              ? "'" + cell
              : cell;
            return '"' + value.replaceAll('"', '""') + '"';
          })
          .join(",")
      )
      .join("\r\n")
  );
}

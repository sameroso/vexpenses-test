// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pivot(arr: any[]) {
  const mp = new Map();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setValue(a: any[], path: any[], val: { [x: string]: any }) {
    if (Object(val) !== val) {
      // primitive value
      const pathStr = path.join(".");
      const i = (mp.has(pathStr) ? mp : mp.set(pathStr, mp.size)).get(pathStr);
      a[i] = val;
    } else {
      for (const key in val) {
        setValue(a, key == "0" ? path : path.concat(key), val[key]);
      }
    }
    return a;
  }

  const result = arr.map((obj) => setValue([], [], obj));
  return [[...mp.keys()], ...result];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toCsv(arr: any[]) {
  return arr
    .map((row) =>
      row
        .map((val: number) => (isNaN(val) ? JSON.stringify(val) : +val))
        .join(",")
    )
    .join("\n");
}
export const downloadCSV = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[],
  fileName: string
) => {
  const csvData = new Blob([toCsv(pivot(data))], { type: "text/csv" });
  const csvURL = URL.createObjectURL(csvData);
  const link = document.createElement("a");
  link.href = csvURL;
  link.download = `${fileName}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

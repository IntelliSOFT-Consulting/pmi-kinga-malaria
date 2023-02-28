export const parseCsv = async file => {
  // file is in csv format, convert it to json with first row as headers
  const reader = new FileReader();
  reader.readAsText(file);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const csv = reader.result;
      const lines = csv?.replace(/\r/g, '').split('\n');
      const result = [];
      const headers = lines[0].split(',');
      console.log(headers);
      for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(',');
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }
        result.push(obj);
      }
      resolve(result);
    };
    reader.onerror = error => reject(error);
  });
};

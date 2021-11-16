const ms: any = require("modelscript/build/modelscript.cjs.js");

/**
 * Funcion para extraer datos de un archivo .csv
 * @param file - Ubicacion de el archivo .csv 
 * @returns retorna un objeto "JSON" con multiples valores
 */
export async function readCsv(file: string): Promise<any> {
  let dataset;
  await ms
    .loadCSV(file)
    .then((csvData: string) => {
      dataset = new ms.DataSet(csvData);
    })
    .catch(console.error);

  return dataset;
}
import { readCsv } from "./getDataFromCsv";

export default async function convertJSONtoArray(data: string): Promise<Array<Array<number>>> {
  const points3D: Array<Array<number>> = [];
  const csv = await readCsv(data);
  for (let i = 0; i < csv.data.length; i++) {
    points3D.push([+csv.data[i]['x'], +csv.data[i]['y'], +csv.data[i]['z']]);
  }
  return points3D;
}
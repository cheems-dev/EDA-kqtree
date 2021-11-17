import { performance } from "perf_hooks";
import KDtree from "./class/KD-tree";
import INode from "./class/Node";
import convertJSONtoArray from "./functions/convertJSONtoArray";


async function main() {
  const file: Array<string> = ['test100', 'test500', 'test1000', 'test5000', 'test10000', 'test20000', 'test100000', 'test200000', 'test350000'];
  console.log("size, time");
  for (let i = 0; i < file.length; i++) {
    const points3D = await convertJSONtoArray(`./data/${file[i]}.csv`);
    let root = new INode();
    const kdtree = new KDtree(3);
    let start: number = performance.now();
    for (let i = 0; i < points3D.length; i++)
      root = kdtree.insert(root, points3D[i]);
    let end: number = performance.now();
    console.log(`${file[i].slice(4)}, ${+(end - start).toFixed(4)}`);
  }
}
main();


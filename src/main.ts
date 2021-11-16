import KDtree from "./class/KD-tree";
import INode from "./class/Node";
import convertJSONtoArray from "./functions/convertJSONtoArray";


async function main() {

  /* Manejar la asincronia */
  const points3D = await convertJSONtoArray("./data/test1000.csv");
  const point: Array<number> = [-0.13324339017031003, -0.28966775580839643, 0.1609404012898191];
  const point2: Array<number> = [-0.14, 0.236, 0.16804];
  let root = new INode();
  const kdtree = new KDtree(3);
  for (let i = 0; i < points3D.length; i++)
    root = kdtree.insert(root, points3D[i]);
  kdtree.search(root, point) ? console.log('Encontrado') : console.log('No encontrado');
  kdtree.search(root, point2) ? console.log('Encontrado') : console.log('No encontrado');


}
main();


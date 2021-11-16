import { KDtree } from "./class/KD-tree";
import INode from "./class/Node";


function main() {
  // Busqueda
  const k = 2;
  /* const vector: Array<Array<number>> = [[3, 6], [17, 15], [13, 15], [6, 12], [9, 1], [2, 7], [10, 19]]; */
  const vector: Array<Array<number>> = [[30, 40], [5, 25], [70, 70], [10, 12], [50, 30], [35, 45]];
  const kdtree = new KDtree(k);
  let root = new INode();
  for (let i = 0; i < vector.length; i++)
    root = kdtree.insert(root, vector[i]);

  root = kdtree.deleteNode(root, vector[0]);
  console.log('Root after deletion of (30, 40)\n', root.point[0], " ", root.point[1]);
  /* const vector01: Array<number> = [10, 19];
  kdtree.search(root, vector01) ? console.log('found') : console.log('not found');
  const vector02: Array<number> = [12, 19];
  kdtree.search(root, vector02) ? console.log('found') : console.log('not found');
 */
  // findMinimum
  /*  const k = 2, vector: Array<Array<number>> = [[30, 40], [5, 25], [70, 70], [10, 12], [50, 30], [35, 45]];
 
   const kdtree = new KDtree(k);
   let root = new INode();
   for (let i = 0; i < vector.length; i++)
     root = kdtree.insert(root, vector[i]);
   console.log(`Minimum of 0'th dimension is ${kdtree.findMinimum(root, 0)} .`);
   console.log(`Minimum of 1'th dimension is ${kdtree.findMinimum(root, 1)} .`); */

}
main();


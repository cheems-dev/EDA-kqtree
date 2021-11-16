import KDtree from "../src/class/KD-tree";
import INode from "../src/class/Node";

describe('test KDtree class', () => {
  test('functions insert and search', () => {
    const points: Array<Array<number>> = [[3, 6], [17, 15], [13, 15], [6, 12], [9, 1], [2, 7], [10, 19]];
    const kdtree = new KDtree(2);
    let root = new INode();
    for (let i = 0; i < points.length; i++)
      root = kdtree.insert(root, points[i]);
    console.log(root);

    expect(kdtree.search(root, [10, 19])).toEqual(true);
    expect(kdtree.search(root, [2, 7])).toEqual(false);
  });

  it('functions insert and delete', () => {
    const points: Array<Array<number>> = [[30, 40], [5, 25], [70, 70], [10, 12], [50, 30], [35, 45]];
    const kdtree = new KDtree(2);
    let root = new INode();
    for (let i = 0; i < points.length; i++)
      root = kdtree.insert(root, points[i]);
    console.log(root);
    /* Retorna el nodo eliminado */
    root = kdtree.deleteNode(root, points[0]);
    /* Root after deletion of (30, 40) */
    expect(root.point).toStrictEqual([35, 45]);
  });
});
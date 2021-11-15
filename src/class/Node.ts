/**
 * Clase representar un nodo en un kdtree
 */
export default class INode {
  public point: Array<number> = [];
  public left!: INode | null;
  public right!: INode | null;
}
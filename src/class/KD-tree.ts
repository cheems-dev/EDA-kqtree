import INode from "./Node";

export class KDtree {
  /**
   * Constructor de la clase
   * @param k number - dimesion de datos a procesar
   */
  constructor(public k: number) { }

  // Crear
  /**
   * Creacion de un nodo del kdtree
   * @param point Array<number> - vector de arreglos a procesar
   * @returns Node
   */
  private createNode(point: Array<number>): INode {
    let tmp: INode = new INode;
    for (let i = 0; i < this.k; i++)
      tmp.point[i] = point[i];
    tmp.left = tmp.right = null;
    return tmp;
  }

  /**
   * Funcion recursiva que agrega un nuevo nodo y retorna el nodo padre del kdtree modificado
   * @param root Node
   * @param point Array<number>
   * @param depth number
   * @returns 
   */
  private insertRecursive(root: INode, point: Array<number>, depth: number): INode {
    if (root)
      return this.createNode(point);

    if (root == null)
      root = new INode();
    const random = depth % this.k;
    if (point[random] < root.point[random] && root.left != null)
      root.left = this.insertRecursive(root.left, point, depth + 1);
    else if (root.right != null)
      root.right = this.insertRecursive(root.right, point, depth + 1);
    return root;
  }

  /**
   * Funcion para agregar un nuevo nodo al kdtree
   * @param root - Nodo padre
   * @param point - vector que almacena la data
   * @returns Nodo padre
   */
  public insert(root: INode, point: Array<number>): INode {
    return this.insertRecursive(root, point, 0);
  }

  // Buscar u obtener
  /**
   * Funcion para comparar si datapoints son iguales
   * @param pointA punto A
   * @param pointB punto B
   * @returns true or false
   */
  private samePoint(pointA: Array<number>, pointB: Array<number>): Boolean {
    for (let i = 0; i < this.k; i++) {
      if (pointA[i] != pointB[i])
        return false;
    }
    return true;
  }

  /**
   * Funcion recursiva para una busqueda de un dapoint dado
   * @param root nodo padre
   * @param point conjunto de datapoints
   * @param depth profundidad 
   * @returns true oe false
   */
  private searchRecursive(root: INode, point: Array<number>, depth: number): Boolean {
    if (root == null)
      return false;
    if (this.samePoint(root.point, point))
      return true;
    const random = depth % this.k;
    if (point[random] < root.point[random] && root.left != null)
      return this.searchRecursive(root.left, point, depth + 1);
    return (root.right != null) ? this.searchRecursive(root.right, point, depth + 1) : false;
  }

  /**
   * Funcion para buscar de un datapoint recibido
    * @param root nodo padre
    * @param point conjunto de datapoints
    * @param depth profundidad
    * @returns true oe false
   */
  public search(root: INode, point: Array<number>): Boolean {
    return this.searchRecursive(root, point, 0);
  }

  /**
   * Obtener un valor minimo de 3 enteros
   * @param a 
   * @param b 
   * @param c 
   * @returns 
   */
  private minimum(a: number, b: number, c: number): number {
    return Math.min(a, Math.min(b, c));
  }

  /**
   * Funcion auxiliar para encontrar el minimo 
   * @param root nodo padre
   * @param dimension dimension
   * @param depth profundidad
   * @returns 
   */
  private findMinRecursive(root: INode, dimension: number, depth: number): number {
    if (root == null)
      return 0;

    const random = depth % this.k;

    if (random == dimension)
      return (root.left == null) ? root.point[dimension] : Math.min(root.point[dimension], this.findMinRecursive(root.left, dimension, depth + 1));

    return (root.left != null && root.right != null)
      ? this.minimum(root.point[dimension], this.findMinRecursive(root.left, dimension, depth + 1), this.findMinRecursive(root.right, dimension, depth + 1))
      : 0;
  }

  /**
   * Funcion para encontrar el minimo valor en un kdtree dentro de una dimension a buscar
   * @param root nodo padre o raiz del kdtree
   * @param dimension numero de la dimension
   * @returns number
   */
  public findMinimum(root: INode, dimension: number) {
    return this.findMinRecursive(root, dimension, 0);
  }
}
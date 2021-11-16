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
  private findMinNode(first: INode, second: INode, third: INode, dimension: number): INode {
    let node: INode = first;
    if (second != null && second.point[dimension] < node.point[dimension])
      node = second;
    if (third != null && third.point[dimension] < node.point[dimension])
      node = third;
    return node;
  }

  /**
   * Funcion auxiliar para encontrar el minimo 
   * @param root nodo padre
   * @param dimension dimension
   * @param depth profundidad
   * @returns 
   */
  private findMinRecursive(root: INode, dimension: number, depth: number): any {
    if (root === null)
      return null;

    const random = depth % this.k;

    if (random === dimension)
      return (root.left === null) ? root : this.findMinRecursive(root.left, dimension, depth + 1);

    return (root.left !== null && root.right !== null) ? this.findMinNode(root, this.findMinRecursive(root.left, dimension, depth + 1), this.findMinRecursive(root.right, dimension, depth + 1), dimension) : null;
  }

  /**
   * Funcion para encontrar el minimo Nodo en un kdtree dentro de una dimension a buscar
   * @param root nodo padre o raiz del kdtree
   * @param dimension numero de la dimension
   * @returns number
   */
  public findMinimum(root: INode, dimension: number): INode {
    return this.findMinRecursive(root, dimension, 0);
  }

  /**
   * Copiar los datos del segundo arreglo al primer arreglo
   * @param arrayA primer arreglo
   * @param arrayB segundo arreglo
   */
  private copyArray(arrayA: Array<number>, arrayB: Array<number>) {
    for (let i = 0; i < this.k; i++)
      arrayA[i] = arrayB[i];
  }

  /**
   * Funcion para eliminar de manera recursiva
   * @param root nodo
   * @param point datapoint o conjunto de puntos
   * @param depth profundidad
   * @returns 
   */
  private deleteNodeRecursive(root: INode | null, point: Array<number>, depth: number): any {
    if (root == null)
      return null;
    const random = depth % this.k;
    if (this.samePoint(root.point, point)) {
      if (root.right != null) {
        const min: INode = this.findMinimum(root.right, random);

        this.copyArray(root.point, min.point);

        root.right = this.deleteNodeRecursive(root.right, min.point, depth + 1);
      }
      else if (root.left != null) {
        const min: INode = this.findMinimum(root.left, random);

        this.copyArray(root.point, min.point);

        root.right = this.deleteNodeRecursive(root.left, min.point, depth + 1);
      }
      else {
        root = null;
        return null;
      }
      return root;
    }

    if (point[random] < root.point[random])
      root.left = this.deleteNodeRecursive(root.left, point, depth + 1);
    else
      root.right = this.deleteNodeRecursive(root.right, point, depth + 1);
    return root;
  }

  /**
   * Funcion para eliminar un nodo en especifico
   * @param root nodo 
   * @param point datapoints 
   * @returns 
   */
  public deleteNode(root: INode, point: Array<number>) {
    return this.deleteNodeRecursive(root, point, 0);
  }
}
interface INode<T> {
  value: T;
}

type ExtractGeneric<TExtendsNode> = TExtendsNode extends INode<infer T> ? T : never;

/**
 * `a` will be considered greater than `b` if true.
 * And `b` considered greater than `a` if false.
 */
type BooleanComparator<T> = (a: T, b: T) => boolean;

type Find<T> = (value: T) => boolean;

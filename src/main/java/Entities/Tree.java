package Entities;

import Serialization.Serialize;
import java.util.function.Function;
import java.util.HashMap;
import java.util.List;
import java.util.Stack;

public class Tree<T> {

	public Tree<T> Children[];
	public String type = getClass().getName();
	public T Value;

	static {

		Serialize.declare(Tree.class.getName(), Tree.class);

	}

	public Tree() {

	}

	/**
	 * 
	 * @param predicate
	 */
	public Tree<T> search(Function<T, Boolean> predicate, List<Tree<T>> outParents) {
		Stack<Tree<T>> stack = new Stack<Tree<T>>();
		HashMap<Tree<T>, Tree<T>> parents = new HashMap<Tree<T>, Tree<T>>();
		stack.push(this);

		while (stack.size() > 0) {
			Tree<T> node = stack.pop();
			if (predicate.apply(node.Value)) {
				Tree<T> parent = node;
				do {
					parent = parents.getOrDefault(parent, null);
					outParents.add(parent);
				} while (parent != null);

				return node;
			} else {
				for (Tree<T> child : node.Children) {
					parents.putIfAbsent(child, node);
					stack.push(child);
				}
			}
		}

		return null;
	}

}
package Entities;

import Serialization.Serialize;

public class Tree<T> {

	public Tree<T> Children[];
	public String type = getClass().getName();
	public T Value;

	 static {

		 Serialize.declare(Tree.class.getName(), Tree.class);

	 }

	public Tree(){

	}

}
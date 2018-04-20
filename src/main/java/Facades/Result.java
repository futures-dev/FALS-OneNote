package Facades;

import Serialization.Serialize;

public class Result<TRequest, TResponse, TResult> {

	public TRequest request;
	public TResponse response;
	public TResult result;

	 static {

		 Serialize.declare(Result.class.getName(), Result.class);

	 }

	public Result(){

	}

	/**
	 * 
	 * @param request
	 * @param response
	 * @param result
	 */
	public Result(TRequest request, TResponse response, TResult result){
		this.request = request;
		this.response = response;
		this.result = result;
	}

}
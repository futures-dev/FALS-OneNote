package Entities.Lazy;

import Serialization.Serialize;
import Entities.Course;

public class CourseWrapper extends Course implements ILazyWrapper<Course> {

	public String IUrl;

	 static {

		 Serialize.declare(CourseWrapper.class.getName(), CourseWrapper.class);

	 }

	public CourseWrapper(){

	}

}
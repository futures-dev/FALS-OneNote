package Statistics;

import Serialization.Serialize;
import Entities.Course;

public abstract class CourseStatistics extends Statistics {

	public Course course;

	 static {

		 Serialize.declare(CourseStatistics.class.getName(), CourseStatistics.class);

	 }

	public CourseStatistics(){

	}

}
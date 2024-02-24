import { ICourse } from "../../dto/interfaces";
import CoursePanel from "./CoursePanel";

interface TableOfCoursesProps {
  courses: ICourse[];
}

function TableOfCourses({ courses }: TableOfCoursesProps) {
  return (
    <div className="flex flex-wrap">
      {courses.map((course, index) => (
        <div
          key={index}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-8"
        >
          <CoursePanel
            course={course}
            courseClick={() => console.log("click on course")}
          />
        </div>
      ))}
    </div>
  );
}

export default TableOfCourses;

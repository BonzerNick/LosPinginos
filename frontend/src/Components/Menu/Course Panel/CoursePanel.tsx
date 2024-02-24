import { ICourse } from "../../dto/interfaces";

interface CoursePanelProps {
  course: ICourse;
  courseClick: Function;
}

function CoursePanel({ course, courseClick }: CoursePanelProps) {
  return (
    <a
      onClick={(e) => courseClick()}
      className=" active:opacity-75 trasform duration-500 flex flex-col"
    >
      <div className="bg-white shadow-md rounded-md p-6 aspect-w-1 aspect-h-1 hover:shadow-lg hover:scale-110 transform duration-500">
        <h2 className=" text-gray-600 text-xl font-semibold flex justify-center h-1/5">
          {course.title}
        </h2>
        <p className="text-gray-600 mb-4 flex justify-center items-center h-4/5">
          {course.desc}
        </p>
      </div>
    </a>
  );
}

export default CoursePanel;

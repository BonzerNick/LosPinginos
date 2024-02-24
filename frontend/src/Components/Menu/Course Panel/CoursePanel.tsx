import { ICourse } from "../../dto/interfaces";
import teachLogo from "../../../assets/images/teach-svgrepo-com.svg";

interface CoursePanelProps {
  course: ICourse;
  courseClick: Function;
}

function CoursePanel({ course, courseClick }: CoursePanelProps) {
  return (
    <a
      onClick={(e) => courseClick()}
      className=" active:opacity-75 trasform duration-500 flex flex-col "
    >
      <div className="bg-white shadow-md rounded-md p-5 aspect-w-1 aspect-h-1 hover:shadow-lg hover:scale-105 transform duration-500 h-full">
        <div className="w-full flex justify-center h-6/12 mb-2">
          <img src={teachLogo}></img>
        </div>
        <h2 className=" text-gray-600 text-lg font-semibold flex justify-start text-start h-2/12">
          {course.title}
        </h2>
        <p className="text-gray-900 text-sm  flex text-start h-4/12 truncate whitespace-normal">
          {course.desc}
        </p>
      </div>
    </a>
  );
}

export default CoursePanel;

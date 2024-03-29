import React, { useEffect, useState } from "react";
import CoursePanel from "./CoursePanel";
import { ICourse } from "../../dto/interfaces";
import { API } from "../../api/api";

interface TableOfCoursesProps {
  session: string;
}

const CourseTabMenu = ({ session }: TableOfCoursesProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<ICourse[]>();

  const filteredCourses = courses?.filter((course) => {
    return (
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  async function fetchCourses() {
    try {
      const response = await API.fetchCourses(session);
      console.log(response);
      if (response.status === 200) {
        setCourses(response.data);
      } else {
        alert("Не удалось загрузить :(");
        return [];
      }
    } catch (error) {
      alert(error);
      return [];
    }
  }
  useEffect(() => {
    fetchCourses();
  });

  return (
    <div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-full text-black"
        />
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCourses?.map((course, index) => (
          <CoursePanel
            key={index}
            course={course}
            courseClick={() => {
              console.log(`${course.id} click`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseTabMenu;

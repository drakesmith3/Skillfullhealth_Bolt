
import { BookOpen } from "lucide-react";

const courses = [
  { id: 1, name: "BLS Course", price: "Q25,000" },
  { id: 2, name: "ECG Course", price: "Q35,000" },
  { id: 3, name: "ACLS by Cardinal Academy", price: "Q45,000" },
];

const RelatedCourses = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Related Courses</h2>
      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex items-center justify-between p-4 border rounded-md hover:border-primary/50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>{course.name}</span>
            </div>
            <span className="font-medium">{course.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedCourses;

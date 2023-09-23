export type Course = {
  courseId: number;
  title: string;
  description: string;
  lectureCount: number;
  doneCount: number;
  progress: number;
};

export type CourseInfo = {
  courseId: number;
  title: string;
  description: string;
  totalLectureCount: number;
  doneLectureCount: number;
};

export type Lecture = {
  lectureId: number;
  lectureTitle: string;
  lectureDescription: string;
  VideoUrl: string;
  isDone: boolean;
};

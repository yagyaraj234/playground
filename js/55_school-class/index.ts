class SchoolMember {
  name: string = "";
  email: string = "";
  id: string = "";
  active: boolean = true;
  age: number;
  type: "student" | "teacher";

  constructor(
    name: string,
    age: number,
    id: string,
    email: string,
    type: "student" | "teacher",
  ) {
    this.name = name;
    this.age = age;
    this.id = id;
    this.email = email;
    this.active = true;
    this.type = type;
  }

  // Shared methods
  getBasicInfo() {
    return {
      name: this.name,
      age: this.age,
      id: this.id,
      email: this.email,
      active: this.active,
    };
  }

  updateEmail(newEmail: string) {
    this.email = newEmail;
  }

  toggleStatus() {
    this.active = !this.active;
  }
}

class Student extends SchoolMember {
  grade: string;
  rollNumber: string;
  subjects: any;
  marks: any;
  attendance: number;
  // construct student
  constructor(
    name: string,
    age: number,
    id: string,
    email: string,
    grade: string,
    rollNumber: string,
  ) {
    super(name, age, id, email, "student");
    this.grade = grade;
    this.rollNumber = rollNumber;
    this.subjects = [];
    this.marks = {};
    this.attendance = 0;
  }

  // Add subject for student
  enrollInSubject(subject: string) {
    if (!this.subjects.includes(subject)) {
      this.subjects.push(subject);
      this.marks[subject] = [];
    }
  }

  // Add marks for a subject
  addMark(subject: string, mark: number) {
    if (this.subjects.includes(subject)) {
      this.marks[subject].push(mark);
    } else {
      throw new Error(`Student is not enrolled in ${subject}`);
    }
  }

  // Get student info
  getStudentInfo() {
    const averageMarks = this.calculateAverageMarks();
    return {
      ...this.getBasicInfo(),
      grade: this.grade,
      rollNumber: this.rollNumber,
      subjects: this.subjects,
      averageMarks: averageMarks,
      attendance: this.attendance,
      performance: this.getPerformanceLevel(averageMarks),
    };
  }
  calculateAverageMarks() {
    const allMarks = Object.values(this.marks).flat();
    if (allMarks.length === 0) return 0;
    return allMarks.reduce((sum, mark) => sum + mark, 0) / allMarks.length;
  }

  // Get performance level based on average
  getPerformanceLevel(average: number) {
    if (average >= 90) return "Excellent";
    if (average >= 80) return "Good";
    if (average >= 70) return "Average";
    if (average >= 60) return "Below Average";
    return "Poor";
  }

  // Update attendance
  updateAttendance(percentage: number) {
    this.attendance = Math.max(0, Math.min(100, percentage));
  }
}

class Teacher extends SchoolMember {
  department: string;
  experience: number;
  salary: number;
  subjects: any[];
  students: any[];
  constructor(
    name: string,
    age: number,
    id: string,
    email: string,
    department: string,
    experience: number,
    salary: number,
  ) {
    super(name, age, id, email, "teacher");
    this.department = department;
    this.experience = experience;
    this.salary = salary;
    this.subjects = [];
    this.students = [];
  }

  assignStudent(rollId: string) {
    this.students = [...this.students, rollId];
  }
  assignSubject(subject: string) {
    this.subjects = [...this.subjects, subject];
  }
  getTeacherSubjects() {
    return this.subjects.join(", ");
  }
  getTeacherInfo() {
    return this;
  }
  getWorkload() {
    const sub = this.subjects.length;
    const stu = this.students.length;
    return {
      students: stu,
      subjects: sub,
      totalStrength: stu + sub,
    };
  }
}

class School {
  name: string = "";
  students: any[] = [];
  teachers: any[] = [];
  constructor(name: string) {
    this.name = name;
  }

  addStudent(student: any) {
    this.students = [...this.students, student];
  }

  addTeacher(teacher: any) {
    this.teachers = [...this.teachers, teacher];
  }
  getTotalStrength() {
    const stuLen = this.students.length;
    const teachLen = this.teachers.length;
    return {
      students: stuLen,
      teachers: teachLen,
      totalStrength: stuLen + teachLen,
    };
  }
  getStudentsByGrade(grade: string) {
    return this.students.filter((stu) => stu.grade === grade);
  }
}

const school = new School("Learnersbucket High School");

// Create students
const student1 = new Student(
  "Harry Potter",
  16,
  "S001",
  "harry@learnersbucket.com",
  "10th",
  "R001",
);
const student2 = new Student(
  "Hermione Granger",
  17,
  "S002",
  "hermione@learnersbucket.com",
  "11th",
  "R002",
);
const student3 = new Student(
  "Ron Weasely",
  15,
  "S003",
  "ron@learnersbucket.com",
  "9th",
  "R003",
);

// Create teachers
const teacher1 = new Teacher(
  "Mr. Rubeus Hagrid",
  35,
  "T001",
  "rubeus@learnersbucket.com",
  "Mathematics",
  10,
  50000,
);
const teacher2 = new Teacher(
  "Mr. Albus Dumbledore",
  28,
  "T002",
  "albus@learnersbucket.com",
  "English",
  5,
  45000,
);

// Add students
student1.enrollInSubject("Mathematics");
student1.enrollInSubject("Physics");
student1.addMark("Mathematics", 85);
student1.addMark("Mathematics", 92);
student1.addMark("Physics", 78);
student1.updateAttendance(95);

student2.enrollInSubject("English");
student2.enrollInSubject("History");
student2.addMark("English", 88);
student2.addMark("History", 82);
student2.updateAttendance(87);

// Add teachers
teacher1.assignSubject("Mathematics");
teacher1.assignSubject("Physics");
teacher1.assignStudent("S001");
teacher1.assignStudent("S003");

teacher2.assignSubject("English");
teacher2.assignSubject("Literature");
teacher2.assignStudent("S002");

// Enroll into school
school.addStudent(student1);
school.addStudent(student2);
school.addStudent(student3);
school.addTeacher(teacher1);
school.addTeacher(teacher2);

// Test the functionalities
console.log("--- TOTAL STRENGTH ---");
console.log(school.getTotalStrength());

console.log("--- STUDENT INFO ---");
console.log(student1.getStudentInfo());

console.log("--- TEACHER SUBJECTS ---");
console.log(teacher1.getTeacherSubjects());

console.log("--- ADDITIONAL OPERATIONS ---");
// console.log("School Stats:", school.getSchoolStats());
console.log("Teacher Info:", teacher2.getTeacherInfo());
console.log("Teacher Workload:", teacher1.getWorkload());
console.log(
  "Students in 10th grade:",
  school.getStudentsByGrade("10th").map((s) => s.name),
);

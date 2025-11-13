/**
 * Seed Courses
 * Creates 5 Stevens CS/SSW courses
 */

import { getCollection, COLLECTIONS } from '../database_config/index.js';

const courses = [
  {
    courseCode: 'CS545',
    courseName: 'Human Computer Interaction',
    section: 'WS',
    department: 'Computer Science',
    instructorName: 'Dr. Gregg Vesonder',
    instructorEmail: 'gvesonde@stevens.edu',
    term: 'Fall 2025',
    enrolledStudents: [],
    createdAt: new Date(),
  },
  {
    courseCode: 'CS590',
    courseName: 'Algorithms',
    section: 'WS',
    department: 'Computer Science',
    instructorName: 'Dr. William Hendrix',
    instructorEmail: 'whendrix@stevens.edu',
    term: 'Fall 2025',
    enrolledStudents: [],
    createdAt: new Date(),
  },
  {
    courseCode: 'CS555',
    courseName: 'Agile Methods for Software Development',
    section: 'WS',
    department: 'Computer Science',
    instructorName: 'Dr. Michael Chen',
    instructorEmail: 'mchen@stevens.edu',
    term: 'Fall 2025',
    enrolledStudents: [],
    createdAt: new Date(),
  },
  {
    courseCode: 'SSW590',
    courseName: 'DevOps Principles and Practices',
    section: 'WS',
    department: 'Software Engineering',
    instructorName: 'Dr. Gregg Vesonder',
    instructorEmail: 'gvesonde@stevens.edu',
    term: 'Fall 2025',
    enrolledStudents: [],
    createdAt: new Date(),
  },
  {
    courseCode: 'CS546',
    courseName: 'Web Programming',
    section: 'WS',
    department: 'Computer Science',
    instructorName: 'Patrick Hill',
    instructorEmail: 'phill@stevens.edu',
    term: 'Fall 2025',
    enrolledStudents: [],
    createdAt: new Date(),
  },
];

export const seedCourses = async () => {
  try {
    const coursesCollection = getCollection(COLLECTIONS.COURSES);

    // Clear existing courses
    await coursesCollection.deleteMany({});

    // Insert courses
    const result = await coursesCollection.insertMany(courses);

    console.log(`Seeded ${result.insertedCount} courses`);
    return Object.values(result.insertedIds);
  } catch (error) {
    console.error('Error seeding courses:', error);
    throw error;
  }
};

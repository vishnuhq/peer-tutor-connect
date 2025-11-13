/**
 * Seed Students
 * Creates 100 diverse students with hashed passwords
 */

import bcrypt from 'bcrypt';
import { getCollection, COLLECTIONS } from '../database_config/index.js';

// Hard-coded list of 100 diverse students from around the world
const studentNames = [
  // Indian names (20 students)
  { firstName: 'Aditi', lastName: 'Sharma' }, // Persona
  { firstName: 'Arjun', lastName: 'Patel' },
  { firstName: 'Priya', lastName: 'Singh' },
  { firstName: 'Raj', lastName: 'Kumar' },
  { firstName: 'Ananya', lastName: 'Gupta' },
  { firstName: 'Rohan', lastName: 'Reddy' },
  { firstName: 'Kavya', lastName: 'Mehta' },
  { firstName: 'Vikram', lastName: 'Joshi' },
  { firstName: 'Neha', lastName: 'Kapoor' },
  { firstName: 'Aditya', lastName: 'Verma' },
  { firstName: 'Shruti', lastName: 'Iyer' },
  { firstName: 'Karthik', lastName: 'Nair' },
  { firstName: 'Riya', lastName: 'Desai' },
  { firstName: 'Siddharth', lastName: 'Malhotra' },
  { firstName: 'Isha', lastName: 'Pandey' },
  { firstName: 'Nikhil', lastName: 'Rao' },
  { firstName: 'Pooja', lastName: 'Khanna' },
  { firstName: 'Varun', lastName: 'Menon' },
  { firstName: 'Divya', lastName: 'Krishnan' },
  { firstName: 'Amit', lastName: 'Shah' },

  // Chinese names (15 students)
  { firstName: 'Wei', lastName: 'Wang' },
  { firstName: 'Li', lastName: 'Zhang' },
  { firstName: 'Mei', lastName: 'Chen' },
  { firstName: 'Jun', lastName: 'Liu' },
  { firstName: 'Ying', lastName: 'Wu' },
  { firstName: 'Feng', lastName: 'Huang' },
  { firstName: 'Xiu', lastName: 'Zhou' },
  { firstName: 'Ming', lastName: 'Yang' },
  { firstName: 'Jing', lastName: 'Zhao' },
  { firstName: 'Hua', lastName: 'Xu' },
  { firstName: 'Qiang', lastName: 'Sun' },
  { firstName: 'Lan', lastName: 'Ma' },
  { firstName: 'Tao', lastName: 'Lin' },
  { firstName: 'Yan', lastName: 'Zhu' },
  { firstName: 'Rong', lastName: 'Guo' },

  // American names (20 students)
  { firstName: 'John', lastName: 'Smith' },
  { firstName: 'Emily', lastName: 'Johnson' },
  { firstName: 'Michael', lastName: 'Williams' },
  { firstName: 'Sarah', lastName: 'Brown' },
  { firstName: 'David', lastName: 'Jones' },
  { firstName: 'Jessica', lastName: 'Garcia' },
  { firstName: 'James', lastName: 'Miller' },
  { firstName: 'Ashley', lastName: 'Davis' },
  { firstName: 'Daniel', lastName: 'Rodriguez' },
  { firstName: 'Jennifer', lastName: 'Martinez' },
  { firstName: 'Matthew', lastName: 'Hernandez' },
  { firstName: 'Amanda', lastName: 'Lopez' },
  { firstName: 'Christopher', lastName: 'Gonzalez' },
  { firstName: 'Melissa', lastName: 'Wilson' },
  { firstName: 'Joshua', lastName: 'Anderson' },
  { firstName: 'Stephanie', lastName: 'Thomas' },
  { firstName: 'Andrew', lastName: 'Taylor' },
  { firstName: 'Nicole', lastName: 'Moore' },
  { firstName: 'Ryan', lastName: 'Jackson' },
  { firstName: 'Lauren', lastName: 'White' },

  // European names (15 students)
  { firstName: 'Oliver', lastName: 'Müller' },
  { firstName: 'Emma', lastName: 'Schmidt' },
  { firstName: 'Lucas', lastName: 'Schneider' },
  { firstName: 'Sophia', lastName: 'Fischer' },
  { firstName: 'Noah', lastName: 'Weber' },
  { firstName: 'Isabella', lastName: 'Meyer' },
  { firstName: 'Liam', lastName: 'Wagner' },
  { firstName: 'Mia', lastName: 'Becker' },
  { firstName: 'Alessandro', lastName: 'Rossi' },
  { firstName: 'Giulia', lastName: 'Russo' },
  { firstName: 'Pierre', lastName: 'Dubois' },
  { firstName: 'Camille', lastName: 'Bernard' },
  { firstName: 'Hugo', lastName: 'Martin' },
  { firstName: 'Léa', lastName: 'Thomas' },
  { firstName: 'Felix', lastName: 'Hoffmann' },

  // Middle Eastern names (10 students)
  { firstName: 'Omar', lastName: 'Khan' },
  { firstName: 'Fatima', lastName: 'Ali' },
  { firstName: 'Hassan', lastName: 'Ahmed' },
  { firstName: 'Layla', lastName: 'Hassan' },
  { firstName: 'Ibrahim', lastName: 'Mohammed' },
  { firstName: 'Amira', lastName: 'Ibrahim' },
  { firstName: 'Karim', lastName: 'Saeed' },
  { firstName: 'Zahra', lastName: 'Mansour' },
  { firstName: 'Tariq', lastName: 'Rashid' },
  { firstName: 'Noor', lastName: 'Khalil' },

  // African names (7 students)
  { firstName: 'Kwame', lastName: 'Osei' },
  { firstName: 'Ama', lastName: 'Mensah' },
  { firstName: 'Kofi', lastName: 'Adjei' },
  { firstName: 'Chinwe', lastName: 'Okafor' },
  { firstName: 'Chidi', lastName: 'Nwosu' },
  { firstName: 'Zuri', lastName: 'Mwangi' },
  { firstName: 'Jabari', lastName: 'Kamau' },

  // East Asian (Japan/Korea) (8 students)
  { firstName: 'Yuki', lastName: 'Yamamoto' },
  { firstName: 'Sakura', lastName: 'Tanaka' },
  { firstName: 'Haruto', lastName: 'Suzuki' },
  { firstName: 'Hana', lastName: 'Sato' },
  { firstName: 'Min-Jun', lastName: 'Kim' },
  { firstName: 'Ji-Woo', lastName: 'Park' },
  { firstName: 'Seo-Jun', lastName: 'Lee' },
  { firstName: 'Ha-Eun', lastName: 'Choi' },

  // Russian/Eastern European (5 students)
  { firstName: 'Dmitri', lastName: 'Ivanov' },
  { firstName: 'Anastasia', lastName: 'Petrova' },
  { firstName: 'Alexei', lastName: 'Sokolov' },
  { firstName: 'Natasha', lastName: 'Volkov' },
  { firstName: 'Viktor', lastName: 'Popov' },
];

const majors = [
  'Computer Science',
  'Software Engineering',
  'Computer Engineering',
  'Data Science',
  'Cybersecurity',
  'Information Systems',
];

/**
 * Generates a random integer between min and max (inclusive)
 */
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Shuffles an array
 */
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * Seeds 100 diverse students
 */
export const seedStudents = async (courseIds) => {
  try {
    const studentsCollection = getCollection(COLLECTIONS.STUDENTS);
    const coursesCollection = getCollection(COLLECTIONS.COURSES);

    // Clear existing students
    await studentsCollection.deleteMany({});

    // Hash the common password once
    const hashedPassword = await bcrypt.hash('password123', 10);

    const students = [];

    // Create 100 students with hardcoded names
    for (let i = 0; i < studentNames.length; i++) {
      const { firstName, lastName } = studentNames[i];

      // Create unique email
      const baseEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
      const email = `${baseEmail}@stevens.edu`;

      // Randomly assign 3-4 courses
      const numCourses = randomInt(3, 4);
      const shuffledCourseIds = shuffleArray(courseIds);
      const enrolledCourses = shuffledCourseIds.slice(0, numCourses);

      const student = {
        firstName,
        lastName,
        universityEmail: email,
        hashedPassword,
        major: majors[randomInt(0, majors.length - 1)],
        age: randomInt(17, 25),
        enrolledCourses,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      students.push(student);
    }

    // Insert all students
    const result = await studentsCollection.insertMany(students);
    const studentIds = Object.values(result.insertedIds);

    // Update courses with enrolled students
    for (const courseId of courseIds) {
      const enrolledStudents = students
        .map((student, index) => ({
          studentId: studentIds[index],
          enrolledCourses: student.enrolledCourses,
        }))
        .filter(({ enrolledCourses }) =>
          enrolledCourses.some((id) => id.equals(courseId))
        )
        .map(({ studentId }) => studentId);

      await coursesCollection.updateOne(
        { _id: courseId },
        { $set: { enrolledStudents } }
      );
    }

    console.log(`Seeded ${result.insertedCount} students`);
    console.log(`   - All passwords: password123`);
    console.log(`   - Aditi Sharma included as student persona`);
    return studentIds;
  } catch (error) {
    console.error('Error seeding students:', error);
    throw error;
  }
};

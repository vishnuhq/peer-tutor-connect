/**
 * Courses Routes
 * Handles course-related endpoints
 */

import express from 'express';
import { param, validationResult } from 'express-validator';
import { requireAuth } from '../middlewares.js';
import { getCoursesByStudentId, getCourseById } from '../data/courses.js';
import { isValidObjectId } from '../validation.js';

const router = express.Router();

/**
 * GET /api/courses
 * Get all courses the logged-in student is enrolled in
 */
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const studentId = req.session.student.id;
    const courses = await getCoursesByStudentId(studentId);

    res.json({
      success: true,
      courses,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/courses/:courseId
 * Get a specific course by ID
 */
router.get(
  '/:courseId',
  requireAuth,
  [
    param('courseId').custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error('Invalid course ID');
      }
      return true;
    }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { courseId } = req.params;
      const course = await getCourseById(courseId);

      if (!course) {
        return res.status(404).json({
          success: false,
          error: 'Course not found',
        });
      }

      res.json({
        success: true,
        course,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

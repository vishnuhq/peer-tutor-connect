/**
 * API Client
 * Axios instance and all API calls
 */

import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // Important for sessions
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authApi = {
  login: (email, password) =>
    api.post("/auth/login", { universityEmail: email, password }),

  logout: () => api.post("/auth/logout"),

  checkAuth: () => api.get("/auth/check"),
};

// Courses API calls
export const coursesApi = {
  getCourses: () => api.get("/courses"),

  getCourseById: (courseId) => api.get(`/courses/${courseId}`),
};

// Questions API calls
export const questionsApi = {
  getQuestionsByCourse: (courseId, sort = "newest") =>
    api.get(`/questions/${courseId}`, { params: { sort } }),

  getQuestionById: (questionId) => api.get(`/questions/detail/${questionId}`),

  createQuestion: (data) => api.post("/questions", data),

  updateQuestion: (questionId, data) =>
    api.patch(`/questions/${questionId}`, data),

  deleteQuestion: (questionId) => api.delete(`/questions/${questionId}`),
};

// Responses API calls
export const responsesApi = {
  getResponses: (questionId, sort = "newest") =>
    api.get(`/responses/${questionId}`, { params: { sort } }),

  createResponse: (data) => api.post("/responses", data),

  updateResponse: (responseId, data) =>
    api.patch(`/responses/${responseId}`, data),

  deleteResponse: (responseId) => api.delete(`/responses/${responseId}`),

  markAsHelpful: (responseId, isHelpful) =>
    api.patch(`/responses/${responseId}/helpful`, { isHelpful }),
};

// Notifications API calls
export const notificationsApi = {
  getNotifications: (unreadOnly = true) =>
    api.get("/notifications", { params: { unreadOnly } }),

  getNotificationCount: () => api.get("/notifications/count"),

  markAsRead: (notificationId) =>
    api.patch(`/notifications/${notificationId}/read`),

  markAllAsRead: () => api.patch("/notifications/read-all"),
};

export default api;

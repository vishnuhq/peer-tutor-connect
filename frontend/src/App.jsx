/**
 * Main Application Component
 * Routing and layout
 */

import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import CoursesList from "./components/CoursesList";
import QuestionsList from "./components/QuestionsList";
import QuestionDetail from "./components/QuestionDetail";
import QuestionForm from "./components/QuestionForm";

//import ProtectedRoute from "./components/ProtectedRoute";

import ProtectedRoute from "./components/ProtectedRoute";
import HelpWidget from "./components/HelpWidget";
import ScrollToTopButton from "./components/ScrollToTopButton";

import Spinner from "./components/Spinner";

const AppRoutes = () => {
  const { loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner size="lg" text="Loading application..." />
      </div>
    );
  }

  const hideWidgets = location.pathname === "/";


  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <CoursesList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:courseId/questions"
          element={
            <ProtectedRoute>
              <QuestionsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:courseId/questions/new"
          element={
            <ProtectedRoute>
              <QuestionForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions/:questionId"
          element={
            <ProtectedRoute>
              <QuestionDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions/:questionId/edit"
          element={
            <ProtectedRoute>
              <QuestionForm isEdit />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* Global help widget, hidden on login */}
      {!hideWidgets && (
        <><div className="fixed bottom-6 right-6 flex flex-col gap-4">
          <HelpWidget />
          <ScrollToTopButton /></div>
        </>
      )}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

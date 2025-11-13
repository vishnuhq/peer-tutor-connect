/**
 * Question Detail Component
 * Shows full question with all responses
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { questionsApi, responsesApi, coursesApi } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import {
  CheckCircle,
  Circle,
  Edit,
  Trash2,
  MessageSquare,
  Star,
  ChevronRight,
  AlertCircle,
  X,
} from 'lucide-react';
import Header from './Header';
import Spinner from './Spinner';
import ResponseForm from './ResponseForm';

// Confirmation Modal Component
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" style={{ padding: '1rem' }}>
      <div className="bg-white shadow-2xl w-full" style={{ maxWidth: '28rem', borderRadius: '1rem', padding: '2rem' }}>
        <div className="flex items-start justify-between" style={{ marginBottom: '1.5rem' }}>
          <h3 className="font-bold text-gray-900" style={{ fontSize: '1.25rem' }}>{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            style={{ padding: '0.25rem' }}
          >
            <X style={{ width: '1.5rem', height: '1.5rem' }} />
          </button>
        </div>
        <p className="text-gray-600" style={{ marginBottom: '2rem', fontSize: '1rem' }}>
          {message}
        </p>
        <div className="flex justify-end" style={{ gap: '1rem' }}>
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
            style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const QuestionDetail = () => {
  const { questionId } = useParams();
  const { user } = useAuth();
  const [question, setQuestion] = useState(null);
  const [course, setCourse] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [editingResponseId, setEditingResponseId] = useState(null);
  const [sortResponses, setSortResponses] = useState('newest');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, type: null, id: null });
  const responseFormRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestion();
  }, [questionId, sortResponses]);

  // Auto-scroll to response form when it opens
  useEffect(() => {
    if ((showResponseForm || editingResponseId) && responseFormRef.current) {
      setTimeout(() => {
        responseFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [showResponseForm, editingResponseId]);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const questionResponse = await questionsApi.getQuestionById(questionId);
      setQuestion(questionResponse.data.question);

      // Fetch course info
      if (questionResponse.data.question.courseId) {
        try {
          const courseResponse = await coursesApi.getCourseById(questionResponse.data.question.courseId);
          setCourse(courseResponse.data.course);
        } catch (err) {
          console.error('Failed to fetch course:', err);
        }
      }

      // Fetch responses
      const responsesResponse = await responsesApi.getResponses(questionId, sortResponses);
      setResponses(responsesResponse.data.responses || []);
    } catch (error) {
      console.error('Error fetching question:', error);
      toast.error('Failed to load question');
      setTimeout(() => navigate('/courses'), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async () => {
    try {
      await questionsApi.deleteQuestion(questionId);
      toast.success('Question deleted successfully');
      setTimeout(() => navigate(`/courses/${question.courseId}/questions`), 1000);
    } catch (error) {
      toast.error('Failed to delete question');
    } finally {
      setDeleteModal({ isOpen: false, type: null, id: null });
    }
  };

  const handleToggleResolved = async () => {
    try {
      await questionsApi.updateQuestion(questionId, {
        isResolved: !question.isResolved,
      });
      setQuestion({ ...question, isResolved: !question.isResolved });
      toast.success(question.isResolved ? 'Marked as unresolved' : 'Marked as resolved', { autoClose: 1500 });
    } catch (error) {
      toast.error('Failed to update question', { autoClose: 1500 });
    }
  };

  const handleDeleteResponse = async (responseId) => {
    try {
      await responsesApi.deleteResponse(responseId);
      toast.success('Response deleted successfully', { autoClose: 1500 });
      fetchQuestion();
    } catch (error) {
      toast.error('Failed to delete response', { autoClose: 1500 });
    } finally {
      setDeleteModal({ isOpen: false, type: null, id: null });
    }
  };

  const handleToggleHelpful = async (responseId, currentState) => {
    try {
      await responsesApi.markAsHelpful(responseId, !currentState);
      // Update the response state locally instead of refetching
      setResponses(prevResponses =>
        prevResponses.map(response =>
          response._id === responseId
            ? { ...response, isHelpful: !currentState }
            : response
        )
      );
      toast.success(currentState ? 'Removed helpful mark' : 'Marked as helpful', { autoClose: 1500 });
    } catch (error) {
      toast.error('Failed to update response', { autoClose: 1500 });
    }
  };

  const handleResponseSubmit = () => {
    setShowResponseForm(false);
    setEditingResponseId(null);
    fetchQuestion();
    toast.success('Response posted successfully', {
      autoClose: 3000,
      onClick: () => navigate(`/questions/${questionId}`)
    });
  };

  const isQuestionPoster = question && user && question.posterId === user.id;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
        <Header />
        <div className="flex justify-center items-center" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          <Spinner size="lg" text="Loading question..." />
        </div>
      </div>
    );
  }

  if (!question) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Header />

      <main id="main-content" className="container-centered fade-in" style={{ paddingTop: '2rem', paddingBottom: '2rem', maxWidth: '64rem' }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <ol className="flex items-center" style={{ gap: '0.5rem', fontSize: '0.875rem' }}>
            <li>
              <Link to="/courses" className="text-teal-600 hover:text-teal-700 hover:underline font-medium">
                My Courses
              </Link>
            </li>
            <ChevronRight className="text-gray-400" style={{ width: '1rem', height: '1rem' }} />
            <li>
              <Link
                to={`/courses/${question.courseId}/questions`}
                className="text-teal-600 hover:text-teal-700 hover:underline font-medium"
              >
                {course ? course.courseCode : 'Course'}
              </Link>
            </li>
            <ChevronRight className="text-gray-400" style={{ width: '1rem', height: '1rem' }} />
            <li className="text-gray-700 font-semibold truncate" style={{ maxWidth: '30rem' }}>
              {question.title}
            </li>
          </ol>
        </nav>

        {/* Question Card */}
        <div className="bg-white shadow-md border-2 border-gray-200" style={{ borderRadius: '1rem', padding: '2.5rem', marginBottom: '2rem' }}>
          {/* Question Header */}
          <div className="flex items-start justify-between" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
            <h1 className="font-bold text-gray-900 leading-tight text-2xl sm:text-4xl" style={{ flex: 1 }}>
              {question.title}
            </h1>

            {/* Resolved Badge */}
            {question.isResolved && (
              <div className="flex items-center bg-gradient-to-r from-emerald-50 to-green-50 text-green-700 border border-green-200 font-semibold flex-shrink-0" style={{ gap: '0.375rem', padding: '0.5rem 1rem', borderRadius: '0.75rem', fontSize: '0.875rem' }}>
                <CheckCircle style={{ width: '1.25rem', height: '1.25rem' }} />
                Answered
              </div>
            )}
          </div>

          {/* Question Content */}
          <div className="prose max-w-none" style={{ marginBottom: '2rem' }}>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap" style={{ fontSize: '1.125rem' }}>{question.content}</p>
          </div>

          {/* Question Meta */}
          <div className="flex items-center border-b border-gray-200" style={{ gap: '1.25rem', fontSize: '0.875rem', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="flex items-center" style={{ gap: '0.75rem' }}>
              <div className="bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center flex-shrink-0" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%' }}>
                <span className="text-white font-bold" style={{ fontSize: '0.875rem' }}>
                  {question.isAnonymous ? 'A' : (question.posterName || 'U').charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {question.isAnonymous ? 'Anonymous' : question.posterName || 'Unknown'}
                </p>
                <p className="text-gray-500">
                  {formatDistanceToNow(new Date(question.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          </div>

          {/* Question Actions */}
          {isQuestionPoster && (
            <div className="flex items-center flex-wrap" style={{ gap: '1rem' }}>
              <button
                onClick={handleToggleResolved}
                className="flex items-center border-2 border-teal-300 bg-teal-50 hover:bg-teal-100 text-teal-700 font-semibold transition-colors"
                style={{ gap: '0.5rem', padding: '0.625rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem' }}
              >
                {question.isResolved ? (
                  <>
                    <Circle style={{ width: '1rem', height: '1rem' }} />
                    Mark as Unresolved
                  </>
                ) : (
                  <>
                    <CheckCircle style={{ width: '1rem', height: '1rem' }} />
                    Mark as Resolved
                  </>
                )}
              </button>
              <button
                onClick={() => navigate(`/questions/${questionId}/edit`)}
                className="flex items-center border-2 border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold transition-colors"
                style={{ gap: '0.5rem', padding: '0.625rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem' }}
              >
                <Edit style={{ width: '1rem', height: '1rem' }} />
                Edit Question
              </button>
              <button
                onClick={() => setDeleteModal({ isOpen: true, type: 'question', id: questionId })}
                className="flex items-center border-2 border-red-300 bg-red-50 hover:bg-red-100 text-red-600 font-semibold transition-colors"
                style={{ gap: '0.5rem', padding: '0.625rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem' }}
              >
                <Trash2 style={{ width: '1rem', height: '1rem' }} />
                Delete Question
              </button>
            </div>
          )}
        </div>

        {/* Responses Section */}
        <div className="bg-white shadow-md border-2 border-gray-200" style={{ borderRadius: '1rem', padding: '2.5rem' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '2rem' }}>
            <h2 className="font-bold text-gray-900 text-xl sm:text-3xl">
              Responses ({responses.length})
            </h2>
            {!showResponseForm && (
              <button
                onClick={() => setShowResponseForm(true)}
                className="flex items-center bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold shadow-lg transition-all"
                style={{ gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem' }}
              >
                <MessageSquare style={{ width: '1.25rem', height: '1.25rem' }} />
                Reply
              </button>
            )}
          </div>

          {/* Response Form */}
          {(showResponseForm || editingResponseId) && (
            <div ref={responseFormRef} style={{ marginBottom: '2rem' }}>
              <ResponseForm
                questionId={questionId}
                responseId={editingResponseId}
                initialContent={editingResponseId ? responses.find(r => r._id === editingResponseId)?.content : ''}
                onSuccess={handleResponseSubmit}
                onCancel={() => {
                  setShowResponseForm(false);
                  setEditingResponseId(null);
                }}
              />
            </div>
          )}

          {/* Sort Responses */}
          {responses.length > 0 && (
            <div className="flex items-center border-b border-gray-200" style={{ gap: '1rem', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
              <label htmlFor="sortResponses" className="text-gray-700 font-semibold" style={{ fontSize: '0.875rem' }}>
                Sort by:
              </label>
              <select
                id="sortResponses"
                value={sortResponses}
                onChange={(e) => setSortResponses(e.target.value)}
                className="border-2 border-gray-300 bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-teal-500 font-medium transition-colors"
                style={{ padding: '0.5rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem' }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          )}

          {/* Responses List */}
          {responses.length === 0 ? (
            <div className="text-center" style={{ padding: '3rem 1rem' }}>
              <MessageSquare className="text-gray-400 mx-auto" style={{ width: '4rem', height: '4rem', marginBottom: '1rem' }} />
              <p className="text-gray-600" style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No responses yet</p>
              <p className="text-gray-500" style={{ fontSize: '0.875rem' }}>Be the first to help answer this question!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {responses.map((response) => {
                const isResponsePoster = user && response.posterId === user.id;
                return (
                  <div
                    key={response._id}
                    className="border-2 border-gray-200 bg-gray-50/50"
                    style={{ borderRadius: '0.5rem', padding: '0.875rem 1rem' }}
                  >
                    {/* Response Header */}
                    <div className="flex items-start justify-between" style={{ marginBottom: '0.5rem' }}>
                      <div className="flex items-center" style={{ gap: '0.5rem' }}>
                        <div className="bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center" style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%' }}>
                          <span className="text-white font-bold" style={{ fontSize: '0.75rem' }}>
                            {response.isAnonymous ? 'A' : (response.posterName || 'U').charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900" style={{ fontSize: '0.875rem' }}>
                            {response.isAnonymous ? 'Anonymous' : response.posterName || 'Unknown'}
                          </p>
                          <p className="text-gray-500" style={{ fontSize: '0.75rem' }}>
                            {formatDistanceToNow(new Date(response.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>

                      {/* Helpful Badge */}
                      {response.isHelpful && (
                        <div className="flex items-center bg-yellow-100 text-yellow-700 font-semibold" style={{ gap: '0.25rem', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontSize: '0.6875rem' }}>
                          <Star style={{ width: '0.875rem', height: '0.875rem' }} />
                          Helpful
                        </div>
                      )}
                    </div>

                    {/* Response Content */}
                    <p className="text-gray-700 leading-normal whitespace-pre-wrap" style={{ fontSize: '0.9375rem', marginBottom: '0.625rem', marginLeft: '2.25rem' }}>
                      {response.content}
                    </p>

                    {/* Response Actions */}
                    <div className="flex items-center flex-wrap" style={{ gap: '0.5rem', marginLeft: '2.25rem' }}>
                      {isQuestionPoster && (
                        <button
                          onClick={() => handleToggleHelpful(response._id, response.isHelpful)}
                          className={`flex items-center font-semibold transition-colors ${
                            response.isHelpful
                              ? 'border-2 border-yellow-300 bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                              : 'border-2 border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                          }`}
                          style={{ gap: '0.375rem', padding: '0.375rem 0.625rem', borderRadius: '0.375rem', fontSize: '0.75rem' }}
                        >
                          <Star style={{ width: '0.875rem', height: '0.875rem' }} />
                          {response.isHelpful ? 'Helpful' : 'Mark Helpful'}
                        </button>
                      )}
                      {isResponsePoster && (
                        <>
                          <button
                            onClick={() => setEditingResponseId(response._id)}
                            className="flex items-center border-2 border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-semibold transition-colors"
                            style={{ gap: '0.375rem', padding: '0.375rem 0.625rem', borderRadius: '0.375rem', fontSize: '0.75rem' }}
                          >
                            <Edit style={{ width: '0.875rem', height: '0.875rem' }} />
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteModal({ isOpen: true, type: 'response', id: response._id })}
                            className="flex items-center border-2 border-red-300 bg-red-50 hover:bg-red-100 text-red-600 font-semibold transition-colors"
                            style={{ gap: '0.375rem', padding: '0.375rem 0.625rem', borderRadius: '0.375rem', fontSize: '0.75rem' }}
                          >
                            <Trash2 style={{ width: '0.875rem', height: '0.875rem' }} />
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, type: null, id: null })}
        onConfirm={() => {
          if (deleteModal.type === 'question') {
            handleDeleteQuestion();
          } else if (deleteModal.type === 'response') {
            handleDeleteResponse(deleteModal.id);
          }
        }}
        title={`Delete ${deleteModal.type === 'question' ? 'Question' : 'Response'}?`}
        message={`Are you sure you want to delete this ${deleteModal.type}? This action cannot be undone.`}
      />
    </div>
  );
};

export default QuestionDetail;

/**
 * Response Form Component
 * Form for creating or editing a response
 */

import { useState } from "react";
import { responsesApi } from "../api/api";
import { Send, X } from "lucide-react";

const ResponseForm = ({
  questionId,
  responseId = null,
  initialContent = "",
  onSuccess,
  onCancel,
}) => {
  const [content, setContent] = useState(initialContent);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!responseId;

  const validateContent = () => {
    if (!content.trim()) {
      setError("Response content is required");
      return false;
    }

    if (content.length > 1500) {
      setError("Response must not exceed 1500 characters");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateContent()) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      if (isEdit) {
        await responsesApi.updateResponse(responseId, {
          content: content.trim(),
        });
      } else {
        await responsesApi.createResponse({
          questionId,
          content: content.trim(),
          isAnonymous,
        });
      }

      onSuccess();
    } catch (error) {
      const message = error.response?.data?.error || "Failed to save response";
      console.error("Failed to save response:", error);
      setError(message);
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    // Submit on Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleSubmit(e);
    }

    // Cancel on Escape
    if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div
      className="border border-gray-100 bg-gradient-to-r from-teal-50 to-emerald-50 shadow-sm"
      style={{ borderRadius: "1rem", padding: "1.5rem" }}
    >
      <form onSubmit={handleSubmit}>
        {/* Content Field */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div
            className="flex items-center justify-between"
            style={{ marginBottom: "0.75rem" }}
          >
            <label
              htmlFor="response-content"
              className="block font-semibold text-gray-900"
              style={{ fontSize: "1rem" }}
            >
              {isEdit ? "Edit Response" : "Your Response"} *
            </label>
            <span
              className={`font-medium ${
                content.length > 1500 ? "text-red-600" : "text-gray-600"
              }`}
              style={{ fontSize: "0.875rem" }}
            >
              {content.length}/1500
            </span>
          </div>
          <textarea
            id="response-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Share your knowledge to help answer this question. Include explanations, examples, or step-by-step guidance..."
            rows={7}
            className={`w-full border focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-y bg-white ${
              error ? "border-red-500" : "border-gray-200 hover:border-gray-300"
            }`}
            style={{
              padding: "0.875rem 1.25rem",
              borderRadius: "0.75rem",
              fontSize: "1rem",
              lineHeight: "1.6",
            }}
            disabled={isSubmitting}
            autoFocus
          />
          {error && (
            <p
              className="text-red-600 font-medium"
              style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}
              role="alert"
            >
              {error}
            </p>
          )}
          <p
            className="text-gray-600 font-medium"
            style={{ marginTop: "0.5rem", fontSize: "0.75rem" }}
          >
            💡 Tip: Press{" "}
            <kbd
              className="bg-white border border-gray-300"
              style={{
                padding: "0.125rem 0.5rem",
                borderRadius: "0.25rem",
                fontSize: "0.75rem",
              }}
            >
              Ctrl+Enter
            </kbd>{" "}
            to submit quickly
          </p>
        </div>

        {/* Anonymous Toggle (only for new responses) */}
        {!isEdit && (
          <div
            className="bg-white border border-teal-100"
            style={{
              marginBottom: "1.25rem",
              padding: "1rem",
              borderRadius: "0.75rem",
            }}
          >
            <label
              className="flex items-start cursor-pointer"
              style={{ gap: "0.75rem" }}
            >
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="text-teal-600 border-gray-300 focus:ring-2 focus:ring-teal-500 flex-shrink-0"
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  borderRadius: "0.25rem",
                  marginTop: "0.125rem",
                }}
                disabled={isSubmitting}
              />
              <div>
                <span
                  className="font-semibold text-gray-900 block"
                  style={{ fontSize: "0.875rem" }}
                >
                  Post anonymously
                </span>
                <p
                  className="text-gray-600"
                  style={{ fontSize: "0.75rem", marginTop: "0.125rem" }}
                >
                  Your identity will be hidden from other students
                </p>
              </div>
            </label>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center" style={{ gap: "0.75rem" }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              gap: "0.5rem",
              padding: "0.625rem 1.5rem",
              borderRadius: "0.75rem",
              fontSize: "0.9375rem",
            }}
          >
            {isSubmitting ? (
              <>
                <div
                  className="border-2 border-white border-t-transparent animate-spin"
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    borderRadius: "50%",
                  }}
                ></div>
                {isEdit ? "Updating..." : "Posting..."}
              </>
            ) : (
              <>
                <Send style={{ width: "1.25rem", height: "1.25rem" }} />
                {isEdit ? "Update Response" : "Post Reply"}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="inline-flex items-center bg-white hover:bg-gray-50 text-gray-700 font-semibold border border-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              gap: "0.5rem",
              padding: "0.625rem 1.5rem",
              borderRadius: "0.75rem",
              fontSize: "0.9375rem",
            }}
          >
            <X style={{ width: "1.25rem", height: "1.25rem" }} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResponseForm;

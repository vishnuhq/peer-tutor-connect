/**
 * Spinner Component
 * Loading indicator
 */

const Spinner = ({ size = "md", text = "" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      ></div>
      {text && <p className="text-gray-600 text-sm font-medium">{text}</p>}
    </div>
  );
};

export default Spinner;

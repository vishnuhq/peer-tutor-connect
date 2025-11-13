import { useState } from "react";
import { HelpCircle, X } from "lucide-react";

const HelpWidget = () => {
    const [open, setOpen] = useState(false);


    const zIndex = 40;

    return (
        <>
            {/* Help panel (small card above the button) */}
            {open && (
                <div
                    style={{
                        position: "fixed",
                        right: "1.5rem",
                        bottom: "5.5rem",
                        width: "min(360px, calc(100vw - 2rem))",
                        backgroundColor: "white",
                        borderRadius: "1rem",
                        boxShadow:
                            "0 10px 30px rgba(15, 23, 42, 0.18)",
                        padding: "1rem 1.25rem",
                        zIndex,
                    }}
                >
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        aria-label="Close help guide"
                        style={{
                            position: "absolute",
                            top: "0.5rem",
                            right: "0.5rem",
                            padding: "0.25rem",
                            borderRadius: "999px",
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                        }}
                    >
                        <X size={16} color="#6b7280" />
                    </button>

                    <h2
                        style={{
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: "#111827",
                            marginBottom: "0.5rem",
                            paddingRight: "1.5rem",
                        }}
                    >
                        How to use Peer-Tutor Connect
                    </h2>

                    <ul
                        style={{
                            margin: 0,
                            paddingLeft: "1.25rem",
                            fontSize: "0.875rem",
                            color: "#374151",
                            lineHeight: 1.6,
                            listStyleType: "disc",
                        }}
                    >
                        <li>
                            Choose a <strong>course</strong> from “My Courses” to open its discussion board.
                        </li>

                        <li>
                            Use <strong>Search</strong> or the <strong>Unanswered</strong> filter to check if your
                            question already exists.
                        </li>

                        <li>
                            Click <strong>Post Question</strong> to describe what you're stuck on.
                            Be specific so peers can help faster.
                        </li>

                        <li>
                            On a question page, scroll to <strong>Your Response</strong> to post a reply
                            or mark helpful answers.
                        </li>

                        <li>
                            Use <strong>Post anonymously</strong> if you don't want your name shown to classmates.
                        </li>

                        <li>
                            Check the <strong>bell icon</strong> for notifications when someone responds to your questions.
                        </li>
                    </ul>




                    <p
                        style={{
                            marginTop: "0.75rem",
                            fontSize: "0.75rem",
                            color: "#6b7280",
                        }}
                    >
                        Tip: You can reopen this guide anytime using the{" "}
                        <strong>?</strong> button in the bottom-right corner.
                    </p>
                </div>
            )}

            {/* Floating ? button */}
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-label="Open help guide"
                style={{
                    position: "fixed",
                    right: "1.5rem",
                    bottom: "1.5rem",
                    width: "3.25rem",
                    height: "3.25rem",
                    borderRadius: "999px",
                    border: "none",
                    backgroundColor: "#0f766e", // teal-ish
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.25)",
                    zIndex,
                }}
            >
                <HelpCircle size={22} />
                {/* or: <span style={{ fontSize: "1.5rem", fontWeight: 700 }}>?</span> */}
            </button>
        </>
    );
};

export default HelpWidget;

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {

            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!visible) return null;

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{
                position: "fixed",

                right: "5.25rem",
                bottom: "1.5rem",
                width: "3rem",
                height: "3rem",
                borderRadius: "999px",
                border: "none",
                backgroundColor: "#0f766e",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(15, 23, 42, 0.25)",
                zIndex: 40,
            }}
        >
            <ChevronUp size={20} />
        </button>
    );
};

export default ScrollToTopButton;

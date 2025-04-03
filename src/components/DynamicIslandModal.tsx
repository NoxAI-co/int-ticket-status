import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useEffect } from "react";

interface DynamicIslandModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const DynamicIslandModal = ({
  isOpen,
  onClose,
  children,
}: DynamicIslandModalProps) => {
  // Handle escape key press to close the modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, onClose]);

  // Animation variants for the modal
  const modalVariants: Variants = {
    closed: {
      width: "120px",
      height: "40px",
      borderRadius: "20px",
      opacity: 0,
      y: -100,
      scale: 0.8,
    },
    open: {
      width: "90vw",
      maxWidth: "1600px",
      height: "90vh",
      borderRadius: "16px",
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      width: "120px",
      height: "40px",
      borderRadius: "20px",
      opacity: 0,
      y: 50,
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 40,
        duration: 0.4,
      },
    },
  };

  // Animation variants for the backdrop
  const backdropVariants: Variants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut" 
      } 
    }
  };

  // Animation variants for the content
  const contentVariants: Variants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: { delay: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.15 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/25 backdrop-blur-sm z-40"
            initial="closed"
            animate="open"
            exit="exit"
            variants={backdropVariants}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-lg shadow-xl overflow-hidden z-50"
            initial="closed"
            animate="open"
            exit="exit"
            variants={modalVariants}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content */}
            <motion.div
              className="h-full overflow-auto"
              variants={contentVariants}
              initial="closed"
              animate="open"
              exit="exit"
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DynamicIslandModal;

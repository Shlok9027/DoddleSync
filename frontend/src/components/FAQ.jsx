import React, { useState } from "react";

// Main Component
const FAQ = () => {
  const [showFAQ, setShowFAQ] = useState(false);

  return (
    <div className="min-h-[20vh] rounded-4xl text-white font-inter p-4 sm:p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
      {/* Background radial gradient and animated blobs */}
      <div className="absolute rounded-3xl inset-0 bg-radial-gradient-dark opacity-70"></div>
      <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-pink-700 rounded-full blur-[150px] opacity-60 animate-blob z-0" />
      <div className="absolute top-40 right-0 w-[30rem] h-[30rem] bg-yellow-700 rounded-full blur-[150px] opacity-60 animate-blob animation-delay-2000 z-0" />
      <div className="absolute bottom-0 left-[15%] w-[30rem] h-[30rem] bg-purple-600 rounded-full blur-[150px] opacity-60 animate-blob animation-delay-4000 z-0" />

      {/* Trigger Button */}
      <div className="relative z-10 text-center w-full">
        {!showFAQ ? (
          <button
            className="text-3xl sm:text-4xl font-orbitron font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-lg underline"
            onClick={() => setShowFAQ(true)}
          >
            FAQ
            <p className="mt-1 text-sm sm:text-base font-semibold tracking-wide text-blue-300 animate-pulse">
              (Click Me to Know Everything 😉)
            </p>
          </button>
        ) : (
          <FAQSection />
        )}
      </div>

      {/* Tailwind keyframes + Orbitron font */}
<style>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap");
        .font-orbitron {
          font-family: "Orbitron", sans-serif;
        }
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.02);
            opacity: 0.3;
          }
        }
        @keyframes pulse-fast {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.01);
            opacity: 0.25;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s infinite ease-in-out;
        }
        .animate-pulse-fast {
          animation: pulse-fast 3s infinite ease-in-out;
        }
        .bg-radial-gradient-dark {
          background: radial-gradient(
            circle at center,
            rgba(29, 78, 216, 0.1) 0%,
            rgba(0, 0, 0, 0.8) 70%,
            rgba(0, 0, 0, 1) 100%
          );
        }
      `}</style>
    </div>
  );
};

// FAQ Section Component
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = ["All", ...new Set(faqData.map((faq) => faq.category))];
  const filteredFaqs =
    selectedCategory === "All"
      ? faqData
      : faqData.filter((faq) => faq.category === selectedCategory);

  return (
    <div className="w-full max-w-screen-2xl mx-auto p-6 sm:p-8 rounded-2xl shadow-3xl border border-blue-300 relative z-10 flex flex-col lg:flex-row lg:space-x-8 mt-6">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-15 blur-xl rounded-2xl -z-10 animate-pulse-fast"></div>

      {/* Vertical Title */}
      <div className="flex flex-col justify-center items-center lg:items-start lg:w-1/5 mb-8 lg:mb-0 lg:pr-4">
        <span className="text-4xl sm:text-5xl font-orbitron font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-lg mb-2">
          Frequently
        </span>
        <span className="text-4xl sm:text-5xl font-orbitron font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-lg mb-2">
          Asked
        </span>
        <span className="text-4xl sm:text-5xl font-orbitron font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-lg">
          Questions
        </span>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap lg:flex-col justify-center lg:justify-start gap-2 mb-8 lg:mb-0 lg:w-1/5 lg:pr-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setOpenIndex(null);
            }}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ease-in-out
              ${
                selectedCategory === category
                  ? " text-white shadow-md transform scale-105 ring-1 ring-blue-400"
                  : " text-gray-300  hover:text-white hover:shadow-sm"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="flex-1 space-y-3">
        {filteredFaqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            toggleFAQ={() => toggleFAQ(index)}
          />
        ))}
      </div>
    </div>
  );
};

// Single FAQ Accordion Item
const FAQItem = ({ question, answer, isOpen, toggleFAQ }) => (
  <div className="border border-blue-700 rounded-lg mb-3 overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-[1.005] hover:shadow-blue-500/50 relative">
    <div className="absolute inset-0 opacity-20 rounded-lg -z-10 animate-pulse-slow"></div>
    <button
      className="flex justify-between items-center w-full p-4 text-left focus:outline-none transition-colors duration-300 rounded-t-lg relative z-10"
      onClick={toggleFAQ}
    >
      <span className="text-base sm:text-lg font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 drop-shadow-md">
        {question}
      </span>
      <svg
        className={`w-6 h-6 text-blue-400 transform transition-transform duration-300 ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    <div
      className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <div className="p-4 text-gray-200 text-sm sm:text-base leading-relaxed border-t">
          {answer}
        </div>
      </div>
    </div>
  </div>
);

// FAQ Data
const faqData = [
  {
    question: "What kind of websites do you develop?",
    answer:
      "We specialize in developing a wide range of websites, including e-commerce platforms, business websites, custom web applications, and more. Our expertise covers various industries and requirements.",
    category: "General",
  },
{
  question: "Which technology stack do you primarily use?",
  answer:
    "We use all the latest stacks that are in demand, including HTML, CSS, Tailwind CSS, JavaScript, and the powerful MERN stack (MongoDB, Express.js, React.js, Node.js) to deliver modern, fast, and scalable web applications.",
  category: "General",
},
  {
    question: "How does the inquiry process work?",
    answer:
      "After logging in or signing up, you can select a package and submit an inquiry form. This form requires your name, communication email, mobile number, the title of your idea, and a full, explained description of your idea/topic.",
    category: "Inquiry Process",
  },
  {
    question: "Can I submit multiple inquiries with one login/email?",
    answer:
      "To streamline our process, each login email is limited to one initial inquiry. If you have additional development needs or ideas, please contact us directly via the chat window or email for further discussion.",
    category: "Inquiry Process",
  },
  {
    question: "What are the available payment plans?",
    answer:
      "We offer two main payment plans: the Standard Package, which requires a complete one-time payment, and the Custom Plan, where you make an advance payment, and the remaining balance depends on the project's scope and milestones.",
    category: "Payment Details",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "For your convenience, we accept payments through Stripe, Razorpay, and various Google Pay methods, ensuring secure and flexible payment options.",
    category: "Payment Details",
  },
  {
    question: "What happens after I make the final payment?",
    answer:
      "Immediately after your final payment, a dedicated chat window will open within your account. This allows for direct and real-time communication with our admin team for all further project discussions and updates.",
    category: "Communication",
  },
  {
    question: "Is the chat communication secure?",
    answer:
      "Absolutely. All communication within our chat window is fully end-to-end encrypted, ensuring the privacy and security of your discussions with our admin team.",
    category: "Communication",
  },
  {
    question: "How does the admin manage inquiries and plans?",
    answer:
      "Our admin receives all your submitted information as a new inquiry in their dedicated admin panel. From there, they can view all project details, communicate with you via chat, and also manage (change, delete, or add) the available service plans.",
    category: "Admin Interaction",
  },
];

export default FAQ;

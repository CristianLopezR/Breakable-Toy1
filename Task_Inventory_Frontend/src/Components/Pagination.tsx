import React from "react";

type CardProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Card: React.FC<CardProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="flex justify-center space-x-1 dark:text-gray-800 relative z-50 pointer-events-auto">
      {/* Botón Previous */}
      <button
        title="previous"
        type="button"
        onClick={() => {
          console.log("Click en Previous");
          if (currentPage > 0) onPageChange(currentPage - 1);
        }}
        disabled={currentPage === 0}
        className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100 disabled:opacity-50"
      >
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      {/* Botones dinámicos */}
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => {
            console.log("Click en página:", page);
            onPageChange(page);
          }}
          title={`Page ${page + 1}`}
          className={`inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-50 ${
            page === currentPage
              ? "font-semibold dark:text-violet-600 dark:border-violet-600"
              : "dark:border-gray-100"
          }`}
        >
          {page + 1}
        </button>
      ))}

      {/* Botón Next */}
      <button
        title="next"
        type="button"
        onClick={() => {
          console.log("Click en Next");
          if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
        }}
        disabled={currentPage === totalPages - 1}
        className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100 disabled:opacity-50"
      >
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default Card;
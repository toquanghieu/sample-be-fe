import type { Shoe } from "../../types";

type ShoeItemProps = {
  shoe: Shoe;
  onDelete: (id: string) => void;
  isDeleting: boolean;
};

export const ShoeItem = ({ shoe, onDelete, isDeleting }: ShoeItemProps) => {
  return (
    <div className="card p-5 group hover:border-surface-700 transition-all duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-surface-100 truncate">
            {shoe.name}
          </h3>
          <p className="text-surface-400 text-sm mt-1">{shoe.brand}</p>
        </div>

        <button
          onClick={() => onDelete(shoe.id)}
          disabled={isDeleting}
          className="btn-danger opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-50"
          aria-label={`Delete ${shoe.name}`}
        >
          {isDeleting ? (
            <svg
              className="animate-spin h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

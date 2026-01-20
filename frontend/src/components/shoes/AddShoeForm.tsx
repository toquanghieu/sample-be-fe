import { useState, type FormEvent } from "react";
import type { CreateShoeDTO } from "../../types";

type AddShoeFormProps = {
  onAdd: (shoe: CreateShoeDTO) => Promise<void>;
};

export const AddShoeForm = ({ onAdd }: AddShoeFormProps) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !brand.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await onAdd({ name: name.trim(), brand: brand.trim() });
      setName("");
      setBrand("");
    } catch {
      setError("Failed to add shoe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6">
      <h2 className="text-xl font-semibold text-surface-100 mb-5">Add New Shoe</h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="shoe-name"
            className="block text-sm font-medium text-surface-300 mb-2"
          >
            Shoe Name
          </label>
          <input
            id="shoe-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            placeholder="Air Jordan 1"
            required
          />
        </div>

        <div>
          <label
            htmlFor="shoe-brand"
            className="block text-sm font-medium text-surface-300 mb-2"
          >
            Brand
          </label>
          <input
            id="shoe-brand"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="input-field"
            placeholder="Nike"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !name.trim() || !brand.trim()}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
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
              Adding...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Shoe
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

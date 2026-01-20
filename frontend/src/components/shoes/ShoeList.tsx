import { useState, useEffect, useCallback } from "react";
import type { Shoe, CreateShoeDTO } from "../../types";
import { shoesApi } from "../../services/api";
import { ShoeItem } from "./ShoeItem";
import { AddShoeForm } from "./AddShoeForm";

export const ShoeList = () => {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchShoes = useCallback(async () => {
    try {
      setError(null);
      const data = await shoesApi.getAll();
      setShoes(data);
    } catch {
      setError("Failed to load shoes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShoes();
  }, [fetchShoes]);

  const handleAddShoe = async (data: CreateShoeDTO) => {
    const newShoe = await shoesApi.create(data);
    setShoes((prev) => [newShoe, ...prev]);
  };

  const handleDeleteShoe = async (id: string) => {
    setDeletingId(id);
    try {
      await shoesApi.delete(id);
      setShoes((prev) => prev.filter((shoe) => shoe.id !== id));
    } catch {
      setError("Failed to delete shoe. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="animate-spin h-10 w-10 text-primary-500"
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
          <p className="text-surface-400">Loading your collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Add Shoe Form */}
      <div className="lg:col-span-1">
        <AddShoeForm onAdd={handleAddShoe} />
      </div>

      {/* Shoe List */}
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-surface-100">
            Your Collection
          </h2>
          <span className="text-sm text-surface-400">
            {shoes.length} {shoes.length === 1 ? "shoe" : "shoes"}
          </span>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm mb-4">
            {error}
            <button
              onClick={() => setError(null)}
              className="float-right text-red-400 hover:text-red-300"
            >
              ×
            </button>
          </div>
        )}

        {shoes.length === 0 ? (
          <div className="card p-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-surface-800 rounded-2xl mb-4">
              <svg
                className="w-8 h-8 text-surface-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-surface-200 mb-2">
              No shoes yet
            </h3>
            <p className="text-surface-400">
              Add your first shoe to start your collection!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {shoes.map((shoe) => (
              <ShoeItem
                key={shoe.id}
                shoe={shoe}
                onDelete={handleDeleteShoe}
                isDeleting={deletingId === shoe.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

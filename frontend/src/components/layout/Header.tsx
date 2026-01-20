import { useAuth } from "../../context/AuthContext";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-surface-800 bg-surface-900/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary-400"
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
            <span className="font-semibold text-surface-100">Shoe Collection</span>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-surface-400">
              Hello, <span className="text-surface-200">{user?.name}</span>
            </span>
            <button
              onClick={logout}
              className="btn-secondary text-sm py-2 px-4"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

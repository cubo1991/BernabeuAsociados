// src/app/login/layout.js
export default function LoginLayout({ children }) {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 min-h-screen flex items-center justify-center px-4">
      {children}
    </div>
  );
}

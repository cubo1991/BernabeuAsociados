// src/app/login/page.js
"use client";

import LoginForm from "@/app/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="w-full max-w-md mx-auto p-6 bg-white rounded shadow">
      <LoginForm />
    </main>
  );
}

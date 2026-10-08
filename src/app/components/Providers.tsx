"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#0f172a",
            color: "#f8fafc",
            border: "1px solid #1e293b",
            padding: "12px 16px",
            fontSize: "14px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#0f172a",
            },
          },
          error: {
            iconTheme: {
              primary: "#f43f5e",
              secondary: "#0f172a",
            },
          },
        }}
      />
      {children}
    </>
  );
}

"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  details?: string;
}

export function ErrorModal({
  isOpen,
  onClose,
  title = "Um erro foi encontrado",
  message,
  details,
}: ErrorModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200); // Wait for animation to complete
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative w-full max-w-md bg-black rounded-xl shadow-2xl border border-neutral-700 transform transition-all duration-200 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6  dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-red-600/15 border-red-600 border rounded-full">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-neutral-300 capitalize">
              {title}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-8 w-8 p-0 hover:bg-neutral-100 "
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-neutral-600 mb-4">{message}</p>

          {details && (
            <div className="bg-neutral-900/50 rounded-lg p-4 mb-4">
              <p className="text-sm text-amber-300 font-mono">{details}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 pt-0">
          <Button
            onClick={handleClose}
            className="bg-amber-300 hover:bg-amber-200 text-black font-medium"
          >
            Entendi
          </Button>
        </div>
      </div>
    </div>
  );
}

// Hook para facilitar o uso do modal de erro
export function useErrorModal() {
  const [error, setError] = useState<{
    isOpen: boolean;
    title?: string;
    message: string;
    details?: string;
  }>({
    isOpen: false,
    message: "",
  });

  const showError = (message: string, title?: string, details?: string) => {
    setError({
      isOpen: true,
      title,
      message,
      details,
    });
  };

  const hideError = () => {
    setError((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    error,
    showError,
    hideError,
  };
}

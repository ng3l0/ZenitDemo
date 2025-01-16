import React from "react";

interface ButtonProps {
  variant?: "default" | "outline" | "icon";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string; // To allow additional custom styling
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "md",
  children,
  onClick,
  className = "",
}) => {
  const baseClasses =
    "rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition";
  const variantClasses =
    variant === "default"
      ? "bg-purple-600 text-white hover:bg-purple-700"
      : variant === "outline"
      ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
      : "p-2 hover:bg-gray-100 rounded-full";
  const sizeClasses =
    size === "sm"
      ? "px-2 py-1 text-sm"
      : size === "md"
      ? "px-4 py-2 text-md"
      : "px-6 py-3 text-lg";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

import React, { memo } from "react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DashboardVariant = "default" | "primary" | "secondary" | "accent";

export interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value?: string | number;  // Added number type
  icon?: React.ReactNode;
  description?: string;
  linkText?: string;
  linkUrl?: string;
  variant?: DashboardVariant;
  isLoading?: boolean;  // Added loading state
  onClick?: () => void;  // Added click handler
}

// Add variant styles mapping for better maintainability
const variantStyles: Record<DashboardVariant, string> = {
  default: "bg-white border-gray-200",
  primary: "bg-[#D4AF37]/10 border-[#D4AF37]",
  secondary: "bg-gray-50 border-gray-300",
  accent: "bg-primary/5 border-primary"
};

const DashboardCard = memo(({
  title,
  value,
  icon,
  description,
  linkText,
  linkUrl,
  variant = "default",
  isLoading = false,
  className,
  onClick,
  ...props
}: DashboardCardProps) => {
  if (isLoading) {
    return (
      <Card 
        className={cn(
          "p-6 animate-pulse",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3 mb-3">
          {icon && <div className="w-6 h-6 bg-gray-200 rounded" />}
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-1" />
        {description && <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />}
      </Card>
    );
  }

  return (
    <Card 
      className={cn(
        "p-6 shadow-md hover:shadow-lg transition-all duration-200",
        variantStyles[variant],
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-center gap-3 mb-3">
        {icon && (
          <div className="text-[#D4AF37] transition-transform duration-200 group-hover:scale-110">
            {icon}
          </div>
        )}
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {title}
        </h3>
      </div>
      
      {value !== undefined && (
        <p className="text-2xl font-bold mb-1 text-gray-900">
          {value}
        </p>
      )}
      
      {description && (
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {description}
        </p>
      )}
      
      {linkText && linkUrl && (
        <Link 
          to={linkUrl}
          className="block"
          onClick={(e) => e.stopPropagation()} // Prevent card click when clicking link
        >
          <Button 
            variant="outline" 
            size="sm"
            className={cn(
              "w-full border-[#D4AF37] text-[#D4AF37]",
              "hover:bg-[#D4AF37]/10 transition-colors duration-200"
            )}
          >
            {linkText}
          </Button>
        </Link>
      )}
    </Card>
  );
});

DashboardCard.displayName = "DashboardCard";

export default DashboardCard;

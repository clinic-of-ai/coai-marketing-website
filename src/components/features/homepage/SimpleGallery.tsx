import React from "react";

interface SimpleGalleryProps {
  children: React.ReactNode;
}

export function SimpleGallery({ children }: SimpleGalleryProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}
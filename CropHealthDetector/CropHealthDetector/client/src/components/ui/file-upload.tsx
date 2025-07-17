import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CloudUpload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onClear?: () => void;
  accept?: string;
  maxSize?: number;
  preview?: string;
  className?: string;
}

export default function FileUpload({ 
  onFileSelect, 
  onClear, 
  accept = "image/*", 
  maxSize = 5 * 1024 * 1024, // 5MB
  preview,
  className 
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (file.size > maxSize) {
      alert(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file');
      return;
    }
    
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  return (
    <div className={cn("upload-area", isDragging && "dragover", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />
      
      {preview ? (
        <div className="space-y-4">
          <img 
            src={preview} 
            alt="Preview" 
            className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
          />
          <div className="flex justify-center space-x-3">
            <Button
              type="button"
              className="bg-primary text-white hover:bg-primary/90"
            >
              <CloudUpload className="w-4 h-4 mr-2" />
              Analyze Disease
            </Button>
            {onClear && (
              <Button
                type="button"
                variant="outline"
                onClick={onClear}
                className="hover:bg-gray-100"
              >
                <X className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="cursor-pointer"
        >
          <CloudUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Drag and drop your crop image here</p>
          <p className="text-sm text-gray-500 mb-4">or</p>
          <Button
            type="button"
            className="bg-secondary text-white hover:bg-secondary/90"
          >
            Browse Files
          </Button>
          <p className="text-xs text-gray-400 mt-3">
            Supported formats: JPG, PNG, JPEG (Max {maxSize / 1024 / 1024}MB)
          </p>
        </div>
      )}
    </div>
  );
}

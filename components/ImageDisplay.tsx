
import React from 'react';
import type { ImageData } from '../types';
import { Spinner } from './Spinner';
import { Button } from './Button';

interface ImageDisplayProps {
  originalImage: ImageData;
  restoredImage: string | null;
  isLoading: boolean;
  onRestore: () => void;
  onReset: () => void;
}

const ImageCard: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="w-full flex flex-col items-center">
        <h3 className="text-xl font-semibold text-gray-300 mb-4">{title}</h3>
        <div className="w-full aspect-square bg-gray-900/50 rounded-lg overflow-hidden shadow-lg border border-gray-700 flex items-center justify-center">
            {children}
        </div>
    </div>
);

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, restoredImage, isLoading, onRestore, onReset }) => {
  const downloadName = `restored-${originalImage.name}`;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
        <ImageCard title="Original">
            <img src={originalImage.url} alt="Original" className="object-contain w-full h-full" />
        </ImageCard>

        <ImageCard title="Restored">
            {isLoading ? (
                <Spinner message="Restoring Image..." />
            ) : restoredImage ? (
                <img src={restoredImage} alt="Restored" className="object-contain w-full h-full" />
            ) : (
                <div className="text-center text-gray-500 p-4">
                    <p>Your restored image will appear here.</p>
                </div>
            )}
        </ImageCard>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onReset} variant="secondary" disabled={isLoading}>
          Upload New Photo
        </Button>
        {restoredImage ? (
          <a href={restoredImage} download={downloadName}>
            <Button variant="primary">Download Restored Image</Button>
          </a>
        ) : (
          <Button onClick={onRestore} isLoading={isLoading} disabled={isLoading}>
            Restore Photo
          </Button>
        )}
      </div>
    </div>
  );
};

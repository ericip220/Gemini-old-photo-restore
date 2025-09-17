
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImageDisplay } from './components/ImageDisplay';
import { Footer } from './components/Footer';
import { restorePhoto } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import type { ImageData } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('Upload an old photo to begin the restoration process.');

  const handleImageUpload = useCallback(async (file: File) => {
    setError(null);
    setRestoredImage(null);
    setIsLoading(true);
    setStatusMessage('Preparing your image...');

    try {
      const base64 = await fileToBase64(file);
      setOriginalImage({
        url: URL.createObjectURL(file),
        base64,
        mimeType: file.type,
        name: file.name,
      });
      setStatusMessage('Image ready. Click "Restore Photo" to enhance it.');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred while reading the file.';
      setError(`Failed to process image: ${errorMessage}`);
      setOriginalImage(null);
      setStatusMessage('Upload an old photo to begin the restoration process.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRestore = useCallback(async () => {
    if (!originalImage) {
      setError('Please upload an image first.');
      return;
    }

    setError(null);
    setRestoredImage(null);
    setIsLoading(true);
    setStatusMessage('AI is working its magic... Restoring colors and details.');

    try {
      const restoredBase64 = await restorePhoto(originalImage.base64, originalImage.mimeType);
      if (restoredBase64) {
        setRestoredImage(`data:image/png;base64,${restoredBase64}`);
        setStatusMessage('Restoration complete! Compare the results below.');
      } else {
        throw new Error('The AI did not return an image. Please try again.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Restoration failed: ${errorMessage}`);
      setStatusMessage('Something went wrong. Please try another photo.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);

  const handleReset = useCallback(() => {
    setOriginalImage(null);
    setRestoredImage(null);
    setError(null);
    setIsLoading(false);
    setStatusMessage('Upload an old photo to begin the restoration process.');
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-5xl bg-gray-800/50 rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-700 backdrop-blur-sm">
          <p className="text-center text-lg text-gray-300 mb-6">{statusMessage}</p>
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-6 text-center" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {!originalImage ? (
            <ImageUploader onImageUpload={handleImageUpload} isLoading={isLoading} />
          ) : (
            <ImageDisplay
              originalImage={originalImage}
              restoredImage={restoredImage}
              isLoading={isLoading}
              onRestore={handleRestore}
              onReset={handleReset}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;

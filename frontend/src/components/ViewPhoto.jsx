import React from 'react';
import { useParams } from 'react-router-dom';

const ViewPhoto = () => {
  const { encodedUrl } = useParams();
  const imageUrl = decodeURIComponent(encodedUrl); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Your Pop@Pic! Memory</h1>
      <img src={imageUrl} alt="Result" className="rounded-2xl shadow-xl max-w-full" />
    </div>
  );
};

export default ViewPhoto;
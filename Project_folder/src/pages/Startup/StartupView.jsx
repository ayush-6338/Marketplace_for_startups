import React from 'react';
import { useParams } from 'react-router-dom';

export default function StartupView() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold">Startup #{id}</h1>
      <p className="text-gray-600 mt-2">This is a demo startup profile.</p>
    </div>
  );
}


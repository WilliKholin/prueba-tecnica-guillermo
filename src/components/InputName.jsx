import React from 'react';

export const InputName = ({ name, setName }) => {
  return (
    <input
      className="border border-gray-300 rounded px-4 py-2 w-full"
      type="text"
      placeholder="Your name..."
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
};

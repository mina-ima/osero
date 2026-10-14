import React from 'react';
import type { DiscType } from '../logic/othelloGame';

interface DiscProps {
  value: DiscType;
}

export const Disc: React.FC<DiscProps> = ({ value }) => {
  if (!value) return null;

  return (
    <div className={`disc ${value}`}>
      <div className="disc-inner" />
    </div>
  );
};

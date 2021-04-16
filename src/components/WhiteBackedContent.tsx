import React, { ReactNode } from 'react';

export default function WhiteBackedContent({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      style={{ backgroundColor: '#FFF4EC', zIndex: 20, position: 'relative' }}
    >
      {children}
    </div>
  );
}

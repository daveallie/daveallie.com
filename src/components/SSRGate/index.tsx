import React, { ReactNode, useEffect, useState } from 'react';

type SSRGateProps = {
  children: ReactNode;
  clientOnly?: boolean;
};

export default function SSRGate({ children, clientOnly }: SSRGateProps) {
  const [isClient, setIsClient] = useState(typeof window !== 'undefined');

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  return !isClient && clientOnly ? null : <>{children}</>;
}

'use client'

import { SessionProvider } from 'next-auth/react';

const Provider = ({ children, session }) => {
  return (
    <SessionProvider section={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider

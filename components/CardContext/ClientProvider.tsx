'use client'

import { CardProvider } from './CardContext'
import React from 'react'

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <CardProvider availableCards={[]}>{children}</CardProvider>
}

export default ClientProvider

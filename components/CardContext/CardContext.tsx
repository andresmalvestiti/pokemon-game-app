import { Card } from '@/types/Card'
import { FC, ReactNode, createContext, useContext, useState } from 'react'

type CardIdentfier = Pick<Card, 'id' | 'name'>

interface CardContextType {
  availableCards: CardIdentfier[]
  addCards: (cards: Card[]) => void
}

const CardContext = createContext<CardContextType | undefined>(undefined)

interface CardProviderProps {
  children: ReactNode
  availableCards: CardIdentfier[]
}

export const CardProvider: FC<CardProviderProps> = ({
  children,
  availableCards,
}) => {
  const [cards, setCards] = useState<CardIdentfier[]>(availableCards);

  const addCards = (cards: Card[]) => {
    setCards(cards.map(({ id, name }) => ({id, name})));
  };
  return (
    <CardContext.Provider value={{ availableCards: cards, addCards }}>
      {children}
    </CardContext.Provider>
  )
}

export const useCardContext = () => {
  const context = useContext(CardContext)
  if (context === undefined) {
    throw new Error('useCardContext must be used within a CardProvider')
  }
  return context
}

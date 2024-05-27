'use client'
import { CardActionArea, Grid } from '@mui/material'
import { FC } from 'react'
import Card from '../Card/Card'
import { Card as CardType } from '../../types/Card'
import { useRouter } from 'next/navigation'

interface Props {
  cards: CardType[]
}

const CardList: FC<Props> = ({ cards }) => {
  const router = useRouter()
  const handleClick = (id: number) => {
    router.push(`/battle/${id}`)
  }
  return (
    <Grid container spacing={2}>
      {cards.map((card, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <CardActionArea onClick={() => handleClick(card.id)}>
            <Card
              name={card.name}
              hp={card.hp}
              element={card.element?.name}
              attack={card.attack}
              weakness={card.weakness.name}
              weaknessMultiplier={card.weaknessMultiplier}
              resistance={card.resistance?.name}
              resistanceValue={card.resistanceValue}
            />
          </CardActionArea>
        </Grid>
      ))}
    </Grid>
  )
}

export default CardList

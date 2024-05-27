import {
  Box,
  Card as MUICard,
  Typography,
  CardContent,
  CardMedia,
} from '@mui/material'
import { FC } from 'react'

interface Props {
  name: string
  hp: number
  element: string
  attack: number
  weakness: string
  weaknessMultiplier: number
  resistance?: string
  resistanceValue?: number
  expansion?: string
  rarity?: string
}

const Card: FC<Props> = ({
  name,
  hp,
  element,
  attack,
  weakness,
  weaknessMultiplier,
  resistance,
  resistanceValue,
  expansion = 'Basic',
  rarity = 'rare',
}) => (
  <MUICard elevation={3}>
    <CardContent className="bg-pokemon-primary" style={{ padding: '8px' }}>
      <Box className="flex flex-col card-bg px-3 gap-y-3">
        <Box className="flex flex-row justify-between text-center">
          <Typography variant="h5">{name}</Typography>
          <Typography variant="h5">HP {hp}</Typography>
        </Box>
        <CardMedia
          sx={{ height: 150 }}
          image="/pokeball.jpg"
          title="pokemon image"
        />

        <Box className="flex flex-col gap-y-3">
          <Typography variant="body2">Energy type: {element}</Typography>
          <Typography variant="body2">Attack: {attack}</Typography>
          <Typography variant="body2">Weakness: {weakness} x {weaknessMultiplier}</Typography>
          <Typography variant="body2">Resistance: {resistance} {resistanceValue || '-'}</Typography>
          <Typography variant="body2">{expansion}</Typography>
          <Typography variant="body2">{rarity}</Typography>
        </Box>
      </Box>
    </CardContent>
  </MUICard>
)

export default Card

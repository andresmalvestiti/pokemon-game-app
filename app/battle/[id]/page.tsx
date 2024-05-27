'use client'
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import Card from '../../../components/Card/Card'
import Loader from '../../../components/Loader/Loader'
import { Card as CardType } from '../../../types/Card'
import { useParams } from 'next/navigation'
import BattleResult from '@/components/BattleResult.tsx/BattleResult'
import { fetchCard, fetchCards, postBattle } from '@/app/queries/queries'

const Page: FC = () => {
  const { id } = useParams<{ id: string }>()
  const [attacker, setAttacker] = useState<CardType | undefined>(undefined)
  const [cards, setCards] = useState<CardType[]>([])
  const [defender, setDefender] = useState<number | undefined>(undefined)
  const [cardLoading, setCardLoading] = useState(true)
  const [dropdownLoading, setDropdownLoading] = useState(true)
  const [battleLoading, setBattleLoading] = useState(false)
  const [success, setSuccess] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const loadCards = async () => {
      setDropdownLoading(true)
      try {
        const cards = await fetchCards()
        setCards(cards)
      } catch (error) {
        console.error(error)
      } finally {
        setDropdownLoading(false)
      }
    }
    loadCards()
  }, [])

  useEffect(() => {
    const loadCard = async () => {
      setCardLoading(true)
      try {
        const card = await fetchCard(id)
        setAttacker(card)
      } catch (error) {
        console.error(error)
      } finally {
        setCardLoading(false)
      }
    }
    if (id) {
      loadCard()
    }
  }, [id])

  const handleBattle = async () => {
    if (attacker && defender !== undefined) {
      setBattleLoading(true)
      try {
        const result = await postBattle(attacker.id, defender)
        setSuccess(true)
      } catch (error) {
        setSuccess(false)
        console.error(error)
      } finally {
        setBattleLoading(false)
      }
    }
  }

  const loading = cardLoading || dropdownLoading

  if (loading) {
    return <Loader />
  }

  if (!attacker) throw new Error('Card not found')

  const onReset = () => {
    setSuccess(undefined)
    setDefender(undefined)
  }

  const battleFinished = success !== undefined

  const availableCards = cards
    .filter((card) => card.id !== Number(id))
    .map(({ id, name }) => ({ id, name }))

  return (
    <Box className="flex flex-col mt-5 gap-y-7">
      <Typography variant="h3">{attacker.name}</Typography>
      <Grid container spacing={6} alignContent="center">
        <Grid item xs={12} sm={4} lg={4}>
          <Card
            name={attacker.name}
            hp={attacker.hp}
            element={attacker.element?.name}
            attack={attacker.attack}
            weakness={attacker.weakness.name}
            weaknessMultiplier={attacker.weaknessMultiplier}
            resistance={attacker.resistance?.name}
            resistanceValue={attacker.resistanceValue}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={4} alignContent="center">
          <Box className="flex justify-center w-full">
            <Box
              className="flex justify-center text-center bg-pokemon-secondary p-3 w-fit"
              style={{ borderRadius: '50%' }}
            >
              <Typography variant="h3" className="text-white">
                VS
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} lg={4} alignContent="center">
          <Box className="flex flex-col h-[30%] items-center gap-y-8">
            <Typography variant="h5">Battle with:</Typography>
            <FormControl fullWidth variant="outlined" disabled={battleFinished}>
              <InputLabel>Pokemon</InputLabel>
              <Select
                value={defender}
                onChange={(e) => setDefender(e.target.value as number)}
                variant="outlined"
                fullWidth
                size="small"
              >
                {availableCards.map(({ name, id }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              fullWidth
              className="bg-pokemon-primary text-pokemon-text font-bold"
              onClick={handleBattle}
              disabled={!defender || battleFinished}
            >
              {battleLoading ? <CircularProgress /> : 'BATTLE!'}
            </Button>
          </Box>
        </Grid>
      </Grid>
      {battleFinished && (
        <Box className="flex flex-col gap-y-3 w-full justify-center items-center">
          <BattleResult attackerName={attacker.name} success={success} />
          <Button
            className="bg-pokemon-secondary text-pokemon-text font-bold"
            onClick={onReset}
          >
            Reset
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Page
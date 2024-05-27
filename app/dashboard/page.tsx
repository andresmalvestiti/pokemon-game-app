import {
  Box,
} from '@mui/material'
import CardList from '@/components/CardList/CardList'
import { Card } from '@/types/Card'
import { useRouter } from 'next/navigation'

const backendUrl = process.env.NEXT_PUBLIC_API_URL

export async function getCards(): Promise<Card[]> {
  try {
    const res = await fetch(`${backendUrl}/cards`, { method: 'GET' })
    if (!res.ok) {
      throw new Error('Failed to fetch cards data')
    }

    return res.json();
  } catch (error) {
    console.log('error', error)
    throw new Error('Failed to fetch cards data')
  }
}

export default async function Dashboard() {
  const cardsData = await getCards();
  return (
    <Box className="flex flex-col gap-y-5 mt-5 w-full">
      <CardList cards={cardsData}/>
    </Box>
  )
}

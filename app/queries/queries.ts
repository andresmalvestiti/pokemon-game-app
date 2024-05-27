import { Card } from '@/types/Card'

const backendUrl = process.env.NEXT_PUBLIC_API_URL

export const fetchCards = async (): Promise<Card[]> => {
  try {
    const res = await fetch(`${backendUrl}/cards`, {
      method: 'GET',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch cards data')
    }
    return res.json()
  } catch (error) {
    throw new Error('Failed to fetch cards data')
  }
}

export const fetchCard = async (id: string): Promise<Card> => {
  try {
    const res = await fetch(`${backendUrl}/cards/${id}`, {
      method: 'GET',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch card data')
    }
    return res.json()
  } catch (error) {
    throw new Error('Failed to fetch card data')
  }
}

export const postBattle = async (
  attackerId: number,
  defenderId: number,
): Promise<boolean> => {
  try {
    const res = await fetch(`${backendUrl}/battle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attackerId, defenderId }),
    })
    if (!res.ok) {
      throw new Error('Failed to post battle')
    }
    return res.json()
  } catch (error) {
    throw new Error('Failed to post battle')
  }
}

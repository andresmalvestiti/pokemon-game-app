import { Element } from './Element'

export interface Card {
  id: number
  name: string
  element: Element
  hp: number
  attack: number
  weakness: Element
  weaknessMultiplier: number
  resistance?: Element
  resistanceValue: number
}

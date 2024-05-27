import { Box, Typography, useTheme } from '@mui/material'
import { FC } from 'react'

interface Props {
  attackerName: string
  success: boolean
}

const BattleResult: FC<Props> = ({ attackerName, success }) => {
  const { palette } = useTheme()
  const text = success ? `${attackerName} won!` : `${attackerName} lost!`
  return (
    <Box className="flex w-full justify-center items-center">
      <Typography
        variant="h4"
        className='font-bold'
        sx={{ color: success ? palette.success.main : palette.error.main }}
      >
        {text}
      </Typography>
    </Box>
  )
}

export default BattleResult

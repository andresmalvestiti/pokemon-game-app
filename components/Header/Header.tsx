import { AppBar, Toolbar, Container, Box } from '@mui/material'
import Image from 'next/image'
import { FC } from 'react'

const Header: FC = () => (
  <AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
      <Box 
          sx={{ 
            width: '10%',
            minWidth: '100px',
            position: 'relative',
            height: 'auto',
          }}
        >
          <Image 
            src="/pokemon_logo.png" 
            alt="Logo" 
            layout="responsive" 
            width={100} 
            height={40} 
            objectFit="contain" 
          />
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
)

export default Header

import React from 'react'
import styled from "@emotion/styled";
import { AppBar } from '@mui/material';

type CustomAppBarProps = {
  children?: React.ReactNode
}

const AppBarStyled = styled(AppBar)({
  background: '#fff',
  color: '#000',
  display: 'grid',
  placeItems: 'center'
})

const CustomAppBar = ({children}:CustomAppBarProps) => {
  return (
    <AppBarStyled>
      <>
        {children}
      </>
    </AppBarStyled>
  )
}

export default CustomAppBar
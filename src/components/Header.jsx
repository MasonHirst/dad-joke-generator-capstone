import React, { useState, useEffect, useContext } from 'react'
import LiveCodeIcon from '../assets/LiveCode-icon.png'
import { Link, useNavigate } from 'react-router-dom'
import HeaderButton from '../style/HeaderButton'
import { getUser } from '../data'

import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import { teal } from '@mui/material/colors'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const Header = () => {
   const navigate = useNavigate()
   const [userData, setUserData] = useState(null)
   const [anchorEl, setAnchorEl] = useState(null)
   const open = Boolean(anchorEl)
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(null)
   }

   function handleMyAccount() {
      setAnchorEl(null)
      navigate('/user/account')
   }

   function handleLogout() {
      localStorage.clear()
      window.location.reload(false)
   }

   function handleFav() {
      setAnchorEl(null)
      navigate('/user/favorites')
   }

   useEffect(() => {
      async function getData() {
         let user = await getUser()
         setUserData(user)
      }
      getData()
   }, [])

   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '20px',
            paddingRight: '40px',
            height: '90px',
            background: 'black',
            position: 'fixed',
            width: '100vw',
            top: 0
         }}
      >
         <Link to="/">
            <img src={LiveCodeIcon} width="200px" alt="Live Code Logo" />
         </Link>

         <div
            style={{
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
               gap: 60,
            }}
         >
            <HeaderButton href={'/fortunes/generator'}>Fortunes</HeaderButton>
            <HeaderButton href={'/fortunes/add'}>Create</HeaderButton>
            <HeaderButton href={'/fortunes/search'}>Search</HeaderButton>
         </div>

         <div>
            <Button
               id="basic-button"
               aria-controls={open ? 'basic-menu' : undefined}
               aria-haspopup="true"
               aria-expanded={open ? 'true' : undefined}
               onClick={handleClick}
            >
               <Avatar
                  sx={{ bgcolor: teal[600] }}
                  src="/broken-image.jpg"
               />
            </Button>
            <Menu
               id="basic-menu"
               anchorEl={anchorEl}
               open={open}
               onClose={handleClose}
               MenuListProps={{
                  'aria-labelledby': 'basic-button',
               }}
            >
               <Typography
                  style={{ fontSize: '25px', textAlign: 'center', margin: '0 15px'}}
               >
                  {userData ? userData.username : ''}
               </Typography>
               <div style={{margin: '15px', borderBottom: '1px solid grey'}}></div>
               <MenuItem onClick={handleMyAccount}>My Account</MenuItem>
               <MenuItem onClick={handleFav}>Favorites</MenuItem>
               <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
         </div>
      </div>
   )
}

export default Header

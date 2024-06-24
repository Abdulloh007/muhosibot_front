'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Link from 'next/link';
import NextTopLoader from 'nextjs-toploader';

import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { toggleIsOpen } from '@/lib/features/sidebarSlice';


const Sidebar = () => {
  const [isOpen, setHover] = useState<boolean>(false);
  const [isCollapse, setCollapse] = useState<boolean>(false);

  const headerIcon = [
    {
      id: 1,
      img: '/iconMenu/home.svg',
      alt: 'icon-home',
      text: 'Консоль',
      href: '/',
    },
    {
      id: 2,
      img: '/iconMenu/file.svg',
      alt: 'icon-file',
      text: 'Документы',
      href: '/document',
      collapseArr: [
        {
          txt: 'Исходящие',
        },
        {
          txt: 'Входящие',
        },
        {
          txt: 'Шаблоны',
        },
        {
          txt: 'Планировщик',
        },
      ],
    },
    {
      id: 3,
      img: '/iconMenu/dollar-sign.svg',
      alt: 'icon-dollar',
      href: '/money',
      text: 'Деньги'
    },
    {
      id: 4,
      img: '/iconMenu/book.svg',
      alt: 'icon-book',
      href: '/paying',
      text: 'Платежи'
    },
    {
      id: 5,
      img: '/iconMenu/shopping-cart.svg',
      alt: 'icon-shopping-cart',
      href: '/product',
      text: 'Товары'
    },
    {
      id: 6,
      img: '/iconMenu/briefcase.svg',
      alt: 'icon-briefcase',
      href: '/contragent',
      text: 'Контрагенты'
    },
    {
      id: 7,
      img: '/iconMenu/users.svg',
      alt: 'icon-users',
      href: '/cooperator',
      text: 'Сотрудники'
    },
    {
      id: 8,
      img: '/iconMenu/settings.svg',
      alt: 'icon-setting',
      href: '/setting',
      text: 'Настройки'
    },

  ]
  const isOpenMob = useAppSelector(state => state.sidebar.isOpen)
  const dispatch = useAppDispatch()
  return (
    <>
    {window.outerWidth > 576 
    ? (
      <header className='fixed h-screen z-10 opacity-100'>
          <div onMouseEnter={() => setHover(true)} onMouseLeave={() => {setHover(false); setCollapse(false)}} className={`header h-[100vh] overflow-hidden transition-all duration-500 flex bg-[#FFF] justify-between flex-col  shadow-xl ${isOpen ? `w-[300px]` : `w-[104px] `}`}>
            <div className="flex flex-col">
              <div className='flex mb-4'>
                <Image src="/iconMenu/logo.svg"
                  width={63}
                  height={44}
                  alt="Picture of the author"
                />
                <div className={`text-[#A774FF] text-[26px] pl-1 leading-8 ${isOpen ? `opacity-100` : `opacity-0`} `}>ухосиби<br />ан</div>
              </div>
              <div className='flex flex-col'>
                <List>
                  {headerIcon.map((item) => (
                    <React.Fragment key={item.id} >
                      <ListItem
                        disablePadding
                        sx={{ display: 'block' }}
                        onClick={() => (item.id === 2 && isOpen) ? setCollapse(!isCollapse) : undefined}
                      >
                        <Link href={item.href || ''}>

                          <ListItemButton
                            sx={{
                              minHeight: 30,
                              justifyContent: isOpen ? 'initial' : 'center',
                              p: 0,

                            }}
                            className='hover:rounded-2xl'
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: isOpen ? 3 : 'auto',
                                justifyContent: 'center',
                              }}
                            >
                              <div key={item.id} className='px-4 py-4'>
                                <Image src={item.img} width={20} height={22} alt={item.alt} />
                              </div>
                            </ListItemIcon>
                            <ListItemText primary={item.text} sx={{ opacity: isOpen ? 1 : 0 }} />
                            {item.id == 2 && isOpen ? (isCollapse ? <ExpandLess /> : <ExpandMore />) : ''}
                          </ListItemButton>
                        </Link>

                      </ListItem>
                      <Collapse in={isCollapse} timeout="auto" unmountOnExit>
                        {item.collapseArr?.map((o) => (
                          <ListItem key={o.txt} disablePadding sx={{ display: 'block' }}>
                            <ListItemText className='py-3 text-[#6A7682] pl-[76px] hover:bg-[#A774FF] hover:text-white hover:rounded-2xl cursor-pointer' primary={o.txt} sx={{ opacity: isOpen ? 1 : 0 }} />
                          </ListItem>
                        ))}
                      </Collapse>
                    </React.Fragment>
                  ))}
                </List>
              </div>
            </div>
          </div>
          
          <NextTopLoader
            color="#A774FF"
            initialPosition={0.08}
            crawlSpeed={100} // Изменил значение на 100
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
      </header>
    )
    :(
      <header className={'fixed h-screen z-10 opacity-100 transition-all ' + (window.outerWidth < 576 ? 'translate-x-[-100%]': '') + (isOpenMob ? 'translate-x-0' : '')}>
          <div className='header h-[100vh] overflow-hidden transition-all duration-500 flex bg-[#FFF] justify-between flex-col  shadow-xl w-full'>
            <div className="flex flex-col">
              <div className='flex mb-4'>
                <Image src="/iconMenu/logo.svg"
                  width={63}
                  height={44}
                  alt="Picture of the author"
                />
                <div className={`text-[#A774FF] text-[26px] pl-1 leading-8 opacity-100 `}>ухосиби<br />ан</div>
              </div>
              <div className='flex flex-col'>
                <List onClick={e => dispatch(toggleIsOpen({}))}>
                  {headerIcon.map((item) => (
                    <React.Fragment key={item.id} >
                      <ListItem
                        disablePadding
                        sx={{ display: 'block' }}
                        onClick={() => (item.id === 2 && isOpenMob) ? setCollapse(!isCollapse) : undefined}
                      >
                        <Link href={item.href || ''}>

                          <ListItemButton
                            sx={{
                              minHeight: 30,
                              justifyContent: 'initial' ,
                              p: 0,

                            }}
                            className='hover:rounded-2xl'
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: 3 ,
                                justifyContent: 'center',
                              }}
                            >
                              <div key={item.id} className='px-4 py-4'>
                                <Image src={item.img} width={20} height={22} alt={item.alt} />
                              </div>
                            </ListItemIcon>
                            <ListItemText primary={item.text} sx={{ opacity:1 }} />
                            {item.id == 2 && isOpenMob ? (isCollapse ? <ExpandLess /> : <ExpandMore />) : ''}
                          </ListItemButton>
                        </Link>

                      </ListItem>
                      <Collapse in={isCollapse} timeout="auto" unmountOnExit>
                        {item.collapseArr?.map((o) => (
                          <ListItem key={o.txt} disablePadding sx={{ display: 'block' }}>
                            <ListItemText className='py-3 text-[#6A7682] pl-[76px] hover:bg-[#A774FF] hover:text-white hover:rounded-2xl cursor-pointer' primary={o.txt} sx={{ opacity: isOpenMob ? 1 : 0 }} />
                          </ListItem>
                        ))}
                      </Collapse>
                    </React.Fragment>
                  ))}
                </List>
              </div>
            </div>
          </div>
          
          <NextTopLoader
            color="#A774FF"
            initialPosition={0.08}
            crawlSpeed={100} // Изменил значение на 100
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
      </header>

    )}
    </>
  )
}


export default Sidebar
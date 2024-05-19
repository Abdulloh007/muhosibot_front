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


const Header = () => {
  const [isOpen, setHover] = useState<boolean>(false);
  const [isCollapse, setCollapse] = useState<boolean>(false);

  const handleHover = () => {
    setHover(!isOpen)
    if (isOpen && isCollapse) {
      setHover(false)
      setCollapse(false)
    }
  }

  const handleCollapse = (e: React.FormEvent) => {
    e.stopPropagation()
    if (isOpen) {
      setCollapse(!isCollapse)
    }

    if (isOpen === false) {
      setCollapse(false)
    }
  }





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

  return (
    <header className='fixed h-screen z-10 opacity-100'>
      <section>
        <div onMouseEnter={handleHover} onMouseLeave={handleHover} className={`header h-[100vh] overflow-hidden transition-all duration-500 flex bg-[#FFF] justify-between flex-col  shadow-xl ${isOpen ? `w-[400px]` : `w-[104px] `}`}>
          <div className='flex'>
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
                    onClick={(item.id === 2 && isOpen) ? handleCollapse : undefined}
                  >
                    <Link href={isOpen ? item.href : ''}>

                      <ListItemButton
                        sx={{
                          minHeight: 48,
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
                          <div key={item.id} className='px-4 py-6'>
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
                        <ListItemText className='py-7 text-[#6A7682] pl-[76px] hover:bg-[#A774FF] hover:text-white hover:rounded-2xl' primary={o.txt} sx={{ opacity: isOpen ? 1 : 0 }} />
                      </ListItem>
                    ))}
                  </Collapse>
                </React.Fragment>
              ))}
            </List>
          </div>
          <div className='relative mt-24 ml-3'>
            <Image className='object-cover rounded-full' src='/iconMenu/avatar.jpeg'
              width={32}
              height={32}
              alt='avatar'
            />
          </div>
        </div>
      </section>
      {isOpen && <NextTopLoader
        color="#A774FF"
        initialPosition={0.08}
        crawlSpeed={100} // Изменил значение на 100
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      />}
    </header>
  )
}


export default Header
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Collapse } from "@mui/material";
import { Button, Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";

const bellSvg = "/iconMenu/bell.svg";
const headPhonesSvg = "/iconMenu/headphones.svg";

const Topbar = () => {
  const [isNotify, setNotify] = useState(false);
  const [isRead, SetRead] = useState();
  const userData = useAppSelector(state => state.profile)
  const [selectedOption, setSelectedOption] = React.useState(new Set([]));
  const [noties, setNoties] = useState([
    {
      id: 1,
      subject: 'Новое уведомление от сервиса',
      description: 'All commits from the source branch are added to the destination branch as a single commit.',
      status: 'unreaded'
    },
    {
      id: 2,
      subject: 'Новое уведомление от сервиса',
      description: 'All commits from the source branch are added to the destination branch as a single commit.',
      status: 'readed'
    },
    {
      id: 3,
      subject: 'Другое уведомление от сервиса',
      description: 'All commits from the source branch are added to the destination branch as a single commit.',
      status: 'фксршмув'
    },
  ])

  const handleRead = (e) => {
    SetRead(e.target.checked);
  };

  return (
    <>
      <div className="w-full bg-white shadow mb-5">
        <div className="container py-4">
          <div className="w-full flex flex-wrap justify-end">

            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button isIconOnly className="bg-white rounded-full">
                  <Image width={17} height={17} src={bellSvg} alt="svg-el" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Merge options"
                selectionMode="single"
                className="max-w-[300px]"
              >
                {noties.map((item) => (

                  <DropdownItem key={item.id} description={item.description} className={item.status == "archived" ? 'opacity-50' : ''}>
                    {item.subject}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>


            <Button isIconOnly className="ml-[15px] bg-white rounded-full">
              <Image src={headPhonesSvg} width={17} height={17} alt="svg-el" />
            </Button>

            <Link href="/setting" className="flex flex-wrap items-center hover:bg-[#e1e1e1] transition ml-[15px] pr-2 rounded-full cursor-pointer">
              <div className="w-9 h-9  flex justify-center items-center bg-white rounded-full">
                <Image src="/user-avatar.png" width={17} height={17} alt="svg-el" />
              </div>
              <p className="ml-2">{userData.surname} {userData.name} {userData.patronimic}</p>
            </Link>
          </div>
        </div>
      </div>

    </>
  );
};

export default Topbar;

'use client'
import React, { useState } from 'react';
import { DownloadIcon } from "../Icons/downloadIcon";
import Image from 'next/image'
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { utils, writeFile } from 'xlsx';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Collapse } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ChevronDownIcon from '@/components/core/Icons/ChevronDownIcon';

interface ExportComponentProps {
  users1: Array<any>;
  collapse: boolean;
}

const ExportComponent: React.FC<ExportComponentProps> = ({ users1, collapse }) => {

  const dataCollapse = [
    {
      Icon: '/iconMenu/file-text.svg',
      txt: 'XLS Excel'
    },
    {
      Icon: '/iconMenu/printer.svg',
      txt: 'Печать'
    },
  ]

  const [exportState, setExportState] = useState<boolean>(false);

  const clickTypeExport = (txt: string) => {
    console.log(txt)
  }

  const handleTypeExport = () => {
    setExportState(!exportState);
  };

  const handleExport = () => {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(users1);
    utils.book_append_sheet(wb, ws, 'MySteels');
    writeFile(wb, 'MyExcel.XLSX');
  };
  // text-white py-[10px] px-[25px] bg-[#4D89FF] rounded-md

  return (
    <div className="flex  items-center mb-[10px] ">
      <Button size='md' className='text-white py-2 px-7 bg-[#4D89FF] rounded-md mr-[15px]'>
        Фильтры
      </Button>
      <ButtonGroup variant="flat">
        <Button className='bg-white' startContent={<DownloadIcon />}  onClick={handleExport}>XLS</Button>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly className='bg-white'>
              <ChevronDownIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="excel" startContent={<Image src='/iconMenu/file-text.svg' width={18} height={18} alt='XLS Excel' />}>XLS Excel</DropdownItem>
            <DropdownItem key="print" startContent={<Image src='/iconMenu/printer.svg' width={18} height={18} alt='Печать' />}>Печать</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </ButtonGroup>
    </div>
  );
};

export default ExportComponent;

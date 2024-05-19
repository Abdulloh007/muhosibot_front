'use client'
import React, { useState } from 'react';
import { DownloadIcon } from "../Icons/downloadIcon";
import Image from 'next/image'
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Button } from "@nextui-org/react";
import { utils, writeFile } from 'xlsx';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Collapse } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

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
    <div className="flex  items-center mb-[10px]">
      <Button size='md' className='text-white py-2 px-7 bg-[#4D89FF] rounded-md'>
        Фильтры
      </Button>
      <div className="flex flex-col z-10 relative items-baseline">
        <div className="flex  justify-center items-center pl-[10px] rounded-t-md bg-white ml-[25px]">
          <div onClick={handleExport} className='cursor-pointer  flex border-r-1 pr-2 border-r-black'>
            <DownloadIcon />
            <span className="pl-[10px]">XLS</span>
          </div>
          <div className="p-2" onClick={handleTypeExport}>
            {exportState ? <ExpandLess /> : <ExpandMore />}
          </div>
        </div>
        <div className='flex absolute left-[45px] top-[40px]'>
          {collapse ? (<Collapse in={exportState} timeout="auto" unmountOnExit className='py-[10px] pl-[10px] pr-[9px] bg-white rounded-b-md'>
            {dataCollapse.map((o) => (
              <ListItem key={o.txt} className='flex' disablePadding sx={{ display: 'block' }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    pr: exportState ? 1 : 'auto',
                    justifyContent: 'center',
                  }}

                >
                  <div onClick={() => clickTypeExport(o.txt)} key={o.txt}>
                    <Image src={o.Icon} width={18} height={18} alt={o.txt} />
                  </div>
                </ListItemIcon>
                <ListItemText primary={o.txt} sx={{ opacity: exportState ? 1 : 0 }} />
              </ListItem>
            ))}
          </Collapse>) : ''}
        </div>
      </div>
    </div>
  );
};

export default ExportComponent;

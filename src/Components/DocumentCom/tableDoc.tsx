import React, { useState } from 'react';
import DocumentIcon from "@/components/core/Icons/FolderIcon";
import { Checkbox } from "@nextui-org/react";

interface TypePropsDoc {
  table?: {
    titleDoc: string;
    titleDocType: string;
    titlePrice: string;
    titlePriceType: string;
  };
}

const TableDoc: React.FC<TypePropsDoc> = ({ table }) => {
  if (!table) {
    return null;
  }

  const styleWidth = { width: "6px", height: "6px" };

  const { titleDoc, titleDocType, titlePrice, titlePriceType } = table;

  const [isChecked, setChecked] = useState<boolean>(false)

  const handleClick = (e: React.FormEvent) => {
    setChecked(!isChecked)
  }

  return (
    <div key={titleDoc} className='flex flex-col'>
      <div>
        <Checkbox onClick={handleClick} radius="sm">
          <div className='flex items-center'>
            <DocumentIcon />
            <h1 className='text-[16px] font-medium pl-1'>Пакет документов</h1>
          </div>
        </Checkbox>
      </div>
      <div className='mt-4'>
        <Checkbox isSelected={isChecked} radius="sm">
          <div className='flex items-center ml-6'>
            <div style={styleWidth} className={`${titleDocType === 'Накладная' ? 'bg-purpleLg' : (titleDocType === 'Счет' ? 'bg-[#FFF511]' : 'bg-[#5DFF11]')} rounded-full`}></div>
            <p className='text-[14px] text-[#5C5C5C] pl-1'>{titleDoc}</p>
          </div>
        </Checkbox>
      </div>
      <div className='mt-4'>
        <Checkbox isSelected={isChecked} radius="sm">
          <div className='flex items-center ml-6'>
            <div style={styleWidth} className={`${titlePriceType === 'Накладная' ? 'bg-purpleLg' : (titlePriceType === 'Счет' ? 'bg-[#FFF511]' : 'bg-[#5DFF11]')} rounded-full`}></div>
            <p className='text-[14px] text-[#5C5C5C] pl-1'>{titlePrice}</p>
          </div>
        </Checkbox>
      </div>
    </div>
  );
};

export default TableDoc;

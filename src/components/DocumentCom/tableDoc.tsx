import React, { useState } from 'react';
import DocumentIcon from "@/components/core/Icons/FolderIcon";
import { Checkbox } from "@nextui-org/react";
import { Document } from '@/interfaces/document';

interface TypePropsDoc {
  document?: Document;
}

const TableDoc: React.FC<TypePropsDoc> = ({ document }) => {
  if (!document) {
    return null;
  }

  const styleWidth = { width: "6px", height: "6px" };

  const [isChecked, setChecked] = useState<boolean>(false)

  const handleClick = (e: React.FormEvent) => {
    setChecked(!isChecked)
  }

  return (
    <div key={document.id} className='flex flex-col'>
      {/* <div>
        <Checkbox onClick={handleClick} radius="sm">
          <div className='flex items-center'>
            <DocumentIcon />
            <h1 className='text-[16px] font-medium pl-1'>Пакет документов</h1>
          </div>
        </Checkbox>
      </div> */}
      <div className='mt-4'>
        <Checkbox isSelected={isChecked} radius="sm">
          <div className='flex items-center ml-6'>
            <div style={styleWidth} className={`${document.document_type.title === 'Накладная' ? 'bg-purpleLg' : (document.document_type.title === 'Счет' ? 'bg-[#FFF511]' : 'bg-[#5DFF11]')} rounded-full`}></div>
            <p className='text-[14px] text-[#5C5C5C] pl-1'>{document.title}</p>
          </div>
        </Checkbox>
      </div>
    </div>
  );
};

export default TableDoc;

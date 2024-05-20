import React from 'react';
import { Select, SelectItem } from "@nextui-org/react";
import { ExpandMore } from '@mui/icons-material';
import { btnClass } from '../core/addExployerCom/data';
import CheckMarkICon from '@/components/core/Icons/CheckMarkIcon';
// import {valueChangeGrey, valueChangeYellow} from './data'

interface StatusPropsDoc {
    status: {
        SignDoc: [
            { txt: string },
            { txt: string },
            { txt: string },
        ];
        SignDocPay: [
            { txt: string },
            { txt: string },
            { txt: string },
            { txt: string },
        ];
    };
}

const StatusDoc: React.FC<StatusPropsDoc> = ({ status }) => {
    const { SignDoc, SignDocPay } = status;

    return (
        <div >
            <Select
                placeholder="Подписание документов"
                labelPlacement="outside"
                className="bg-[#F1F1F1] rounded-md hover:bg-none"
                disableSelectorIconRotation
                classNames={btnClass}
                selectorIcon={<ExpandMore />}
            >
                {SignDoc.map((item) => (
                    <SelectItem
                        key={item.txt.toLocaleLowerCase()}
                        value={item.txt.toLocaleLowerCase()}
                    >
                        {item.txt}
                    </SelectItem>
                ))}
            </Select>
            <div className='mt-3'>
                <Select
                    placeholder="Не подписан"
                    labelPlacement="outside"
                    className='bg-[#FFF] w-36'
                    disableSelectorIconRotation
                    classNames={btnClass}
                    selectorIcon={(SignDocPay[0].txt === 'Не подписан' && SignDocPay[1].txt === 'Не оплачен') ? <CheckMarkICon /> : <ExpandMore />}
                >
                    {SignDocPay.map((item) => (
                        <SelectItem
                            key={item.txt.toLocaleLowerCase()}
                            value={item.txt.toLocaleLowerCase()}
                            className={(item.txt === 'Не подписан' || item.txt === 'Не оплачен') ? `text-[#FFB904]` : `text-[#5C5C5C]`}
                        >
                            {item.txt}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className='mt-3'>
                <Select
                    placeholder="Подписан"
                    labelPlacement="outside"
                    className='bg-[#FFF] w-36'
                    disableSelectorIconRotation
                    classNames={btnClass}
                    selectorIcon={(SignDocPay[0].txt === 'Не подписан' || SignDocPay[1].txt === 'Не оплачен') ? <CheckMarkICon /> : <ExpandMore />}
                >
                    {SignDocPay.map((item) => (
                        <SelectItem
                            key={item.txt.toLocaleLowerCase()}
                            value={item.txt.toLocaleLowerCase()}
                            className={(item.txt === 'Не подписан' || item.txt === 'Не оплачен') ? `text-[#FFB904]` : `text-[#5C5C5C]`}
                        >
                            {item.txt}
                        </SelectItem>
                    ))}
                </Select>
            </div>
        </div>
    );
};

export default StatusDoc;

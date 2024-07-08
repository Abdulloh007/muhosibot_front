import React from 'react';
import { Select, SelectItem } from "@nextui-org/react";
import { ExpandMore } from '@mui/icons-material';
import { btnClass } from '../core/addExployerCom/data';
import CheckMarkICon from '@/components/core/Icons/CheckMarkIcon';
// import {valueChangeGrey, valueChangeYellow} from './data'

interface StatusPropsDoc {
    status: string;
    statusList: any[];
}

const StatusDoc: React.FC<StatusPropsDoc> = ({ status, statusList }) => {

    return (
        <div >
            <Select
                placeholder="Подписание документов"
                labelPlacement="outside"
                className="bg-[#F1F1F1] rounded-md hover:bg-none"
                disableSelectorIconRotation
                classNames={btnClass}
                selectorIcon={<ExpandMore />}
                selectedKeys={[status]}
            >
                {statusList.map((item) => (
                    <SelectItem
                        key={item}
                    >
                        {item}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
};

export default StatusDoc;

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, useDisclosure } from "@nextui-org/react";
import { columns, users, btnClass } from "./data";
import { Select, SelectItem } from "@nextui-org/react";
import { ExpandMore } from '@mui/icons-material';
import { useState } from "react";
import PayModalApp from '@/Components/core/addPayCom/modal'



interface AppProps {
  filterVal: string,
  searchVal: string,
}

type handleChange = (e: React.ChangeEvent<HTMLSelectElement>, id: number) => void;

const tableClassName = {
  th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
}

const App: React.FC<AppProps> = ({ filterVal, searchVal }) => {
  const [isPayed, setPayed] = useState<string>('оплачено')
  const [isPayedBool, setPayedBool] = useState<boolean>(false)
  const [isItemId, setItemId] = useState<number>(0)
  const { isOpen, onOpen, onClose } = useDisclosure();
  let filteredUsers = [...users];
  const filterItems = () => {
    
    if (isPayedBool) {
      filteredUsers = filteredUsers.map((user) => {
        if (user.id === isItemId) {
          return {
            ...user,
            payed: isPayed.toLowerCase(),
          };
        }
        return user
      });
    }

    if (filterVal && filterVal !== "Все платежки") {
      filteredUsers = filteredUsers.filter(
        (user) => user.payed.toLowerCase() === filterVal.toLowerCase()
      );
    }

    if (searchVal) {
      filteredUsers = filteredUsers.filter((user) =>
        user.type.toLowerCase().includes(searchVal.toLowerCase())
      );
    }

    return filteredUsers;
  };

  const handleOpen = () => {
    onOpen();
  };

  const handleSelectChange: handleChange = (e, id) => {
    if (isPayed !== e.target.value) {
      setPayed(e.target.value);
      setItemId(id)
      setPayedBool(true)
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <PayModalApp isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Table
        aria-label="Rows actions table example with dynamic content"
        selectionMode="multiple"
        onRowAction={handleOpen}
        shadow="none"
        classNames={tableClassName}
        width={1200}
      >
        <TableHeader columns={columns} className='border-b-1'>
          {(column) =>
          (<TableColumn className='bg-white border-b-1' key={column.uid}>
            {column.name}
          </TableColumn>)}
        </TableHeader>
        <TableBody items={filterItems()}>
          {(item) => (
            <TableRow className='border-b-1' key={item.id}>
              {(columnKey) => {
                return (
                  <TableCell className={`pb-5 pt-6 `}>
                    {
                      columnKey == "group" ?
                        (
                          <p className="text-linkSm">{item.group}</p>
                        )
                        : columnKey == 'docs'
                          ?
                          (<p className="text-linkSm">{item.type}</p>)
                          : columnKey == 'purchase' ?
                            (<Select
                              placeholder="Оплачено"
                              labelPlacement="outside"
                              className="rounded-md hover:bg-none"
                              disableSelectorIconRotation
                              classNames={btnClass}
                              selectorIcon={<ExpandMore />}
                              onChange={(e) => handleSelectChange(e, item.id)}
                            >
                              {item.purchase.map((item) => (
                                <SelectItem
                                  key={item.txt}
                                  value={item.txt}
                                >
                                  {item.txt}
                                </SelectItem>
                              ))}
                            </Select>)
                            : getKeyValue(item, columnKey)

                    }
                  </TableCell>
                )
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};



export default App;

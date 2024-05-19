import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, useDisclosure } from "@nextui-org/react";
import { columns, users } from "./data";
import ArrowIcon from "@/Components/core/Icons/ArrowIcon"
import MyModalApp from '@/Components/core/addMoneyCom/modal'


interface AppProps {
  filterVal: string,
  searchVal: string
}

const tableClassName = {
  th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
}

const App: React.FC<AppProps> = ({ filterVal, searchVal }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const filterItems = () => {
    let filteredUsers = [...users];

    if (filterVal && filterVal !== "Все операции") {
      filteredUsers = filteredUsers.filter(
        (user) => user.docs.toLowerCase() === filterVal.toLowerCase()
      );
    }

    if (searchVal) {
      filteredUsers = filteredUsers.filter((user) =>
        user.docs.toLowerCase().includes(searchVal.toLowerCase())
      );
    }

    return filteredUsers;
  };

  const handleOpen = () => {
    onOpen();
  };

  return (
    <div className="flex flex-col gap-3">
      <MyModalApp isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
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
                      columnKey == "type" ? (
                        <>
                          <p>{item.type.docs}</p>
                          {item.type.link ? (
                            <div className="flex items-center">
                              <ArrowIcon />
                              <a href={item.type.link} className='text-linkSm pl-0.5 text-[12px]'>{item.type.title}</a>
                            </div>
                          )
                            :
                            <p className="text-[#757575] text-[12px]">{item.type.title}</p>}
                        </>
                      )
                        : (columnKey == 'docs'
                          ?
                          <span className={item.docs == 'Поступления' ? `text-[#009650]` : `text-[#FFB904]`}>{item.typeCheck}</span>
                          :
                          (columnKey == 'taxes'
                            ? <span className={item.docs == 'Поступления' ? `text-[#009650]` : `text-[#FFB904]`}>{item.taxes}</span>
                            : getKeyValue(item, columnKey)
                          )
                        )
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

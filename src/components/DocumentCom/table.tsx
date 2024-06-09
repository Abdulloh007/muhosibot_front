import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { columns, users } from "./data";
import ArrowIcon from "@/components/core/Icons/ArrowIcon"
import TableDoc from "@/components/DocumentCom/tableDoc"
import StatusDoc from '@/components/DocumentCom/statusDoc'
import SummaDoc from '@/components/DocumentCom/summaDoc'


interface AppProps {
  filterVal: string,
  searchVal: string
}

const tableClassName = {
  th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
}

const App: React.FC<AppProps> = ({ filterVal, searchVal }) => {
  const filterItems = () => {
    let filteredUsers = [...users];

    if (filterVal && filterVal !== "Все документы") {
      filteredUsers = filteredUsers.filter(
        (user) => user.type.toLowerCase() === filterVal.toLowerCase()
      );
    }

    if (searchVal) {
      filteredUsers = filteredUsers.filter((user) =>
        user.group.toLowerCase().includes(searchVal.toLowerCase())
      );
    }

    return filteredUsers;
  };

  return (
    <div className="flex flex-col gap-3">
      <Table
        aria-label="Rows actions table example with dynamic content"
        selectionMode="single"
        onRowAction={(key) => alert(`Opening item ${key}...`)}
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
                    {columnKey === 'docs' ? (
                      <TableDoc table={item.docs} />
                    ) : columnKey == 'status' ? (
                      <StatusDoc status={item.status} />
                    ) : columnKey == 'summa' ? (
                      <SummaDoc summa={item.summa} />
                    ) : (
                      getKeyValue(item, columnKey)
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

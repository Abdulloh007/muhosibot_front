import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { columns } from "./data";
import { useRouter } from "next/navigation";


interface AppProps {
  filterVal: string,
  searchVal: string,
  rows: any
}

const tableClassName = {
  th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
}

const App: React.FC<AppProps> = ({filterVal, searchVal, rows}) => {
  const router = useRouter()

  const filterItems = () => {
    let filteredUsers = [...rows];

    // if (filterVal && filterVal !== "Все Товары") {
    //   filteredUsers = filteredUsers.filter(
    //     (user) => user.type.toLowerCase() === filterVal.toLowerCase()
    //   );
    // }

    if (searchVal) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(searchVal.toLowerCase())
      );
    }

    return filteredUsers;
  };

  return (
    <div className="flex flex-col gap-3">
      <Table
        aria-label="Rows actions table example with dynamic content"
        selectionMode="multiple"
        onRowAction={(key) => router.push('/product/add?editId=' + key)}
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
                if(columnKey == 'sum') {
                  return (
                    <TableCell className={`pb-5 pt-6 `}>
                      {item.balance * parseFloat(item.price)}
                    </TableCell>
                  )
                }else {
                  return (
                    <TableCell className={`pb-5 pt-6 `}>
                      {getKeyValue(item, columnKey)}
                    </TableCell>
                  )
                }
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default App;

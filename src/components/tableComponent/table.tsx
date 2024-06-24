import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { columns, users } from "./data";
import { useRouter } from "next/navigation";


interface AppProps {
  filterVal: string,
  searchVal: string,
  stuff: any[]
}

const tableClassName = {
  th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
}

const App: React.FC<AppProps> = ({filterVal, searchVal, stuff}) => {
  const router = useRouter()
  function editStuff(id: string | number | bigint) {
    router.push('/cooperator/add?edit=' + id)
  }

  const filterItems = () => {
    let filteredUsers = [...stuff];

    if (filterVal && filterVal !== "All") {
      filteredUsers = filteredUsers.filter(
        (user) => user.status.toLowerCase() === filterVal.toLowerCase()
      );
    }

    if (searchVal) {
      filteredUsers = filteredUsers.filter((user) =>
        user.first_name.toLowerCase().includes(searchVal.toLowerCase())
      );
    }

    return filteredUsers;
  };

  return (
    <div className="flex flex-col gap-3">
      <Table
        aria-label="Rows actions table example with dynamic content"
        selectionMode="multiple"
        onRowAction={(key) => editStuff(key)}
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
                // console.log(columnKey);
                return (
                  <TableCell className={`pb-5 pt-6 ${columnKey === 'status' ? (item.status === 'Работает' ? 'text-[#4D89FF]' : 'text-[#FF3030]') : ''}`}>
                    {getKeyValue(item, columnKey)}
                  </TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default App;

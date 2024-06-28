import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { columns, users } from "./data";
import Counterparty from "@/interfaces/counterpaty";


interface AppProps {
  filterVal: string,
  searchVal: string,
  rows: Counterparty[]
}

const tableClassName = {
  th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
}

const App: React.FC<AppProps> = ({filterVal, searchVal, rows}) => {
  const filterItems = () => {
    let filteredRows = [...rows];

    if (filterVal && filterVal !== "Все Контрагенты") {
      filteredRows = filteredRows.filter(
        (counterparty) => counterparty.category?.title === filterVal.toLowerCase()
      );
    }

    if (searchVal) {
      filteredRows = filteredRows.filter((counterparty) =>
        counterparty.full_name.toLowerCase().includes(searchVal.toLowerCase())
      );
    }

    return filteredRows;
  };

  return (
    <div className="flex flex-col gap-3">
      <Table
        aria-label="Rows actions table example with dynamic content"
        selectionMode="multiple"
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
                  <TableCell className={`pb-5 pt-6`}>
                    {columnKey == 'category' ? item.category?.title : getKeyValue(item, columnKey)}
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

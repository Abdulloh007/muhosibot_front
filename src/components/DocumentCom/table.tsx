import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { columns, users } from "./data";
import ArrowIcon from "@/components/core/Icons/ArrowIcon"
import TableDoc from "@/components/DocumentCom/tableDoc"
import StatusDoc from '@/components/DocumentCom/statusDoc'
import SummaDoc from '@/components/DocumentCom/summaDoc'
import { Document } from "@/interfaces/document";
import { useRouter } from "next/navigation";


interface AppProps {
  filterVal: string,
  searchVal: string,
  rows: Document[]
}

const tableClassName = {
  th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
}

const App: React.FC<AppProps> = ({ filterVal, searchVal, rows }) => {
  const router = useRouter()
  
  const filterItems = () => {
    let filteredRows = rows;

    if (filterVal && filterVal !== "all") {
      filteredRows = filteredRows.filter(
        (doc) => doc.document_type.type === filterVal.toLowerCase()
      );
    }

    if (searchVal) {
      filteredRows = filteredRows.filter((doc) =>
        doc.title.toLowerCase().includes(searchVal.toLowerCase())
      );
    }

    return filteredRows;
  };

  return (
    <div className="flex flex-col gap-3">
      <Table
        aria-label="Rows actions table example with dynamic content"
        selectionMode="single"
        onRowAction={(key) => router.push('/document/add?editId=' + key)}
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
                    {columnKey === 'document' ? (
                      <TableDoc document={item} />
                    ) : columnKey === 'counterparty' ? (
                      <>{item.counterparty?.full_name}</>
                    ) : columnKey === 'status' ? (
                      <StatusDoc statusList={[item.status]} status={item.status} />
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

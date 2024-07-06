import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, useDisclosure } from "@nextui-org/react";
import { columns } from "./data";
import ArrowIcon from "@/components/core/Icons/ArrowIcon"
import { Transaction } from "@/interfaces/transaction";


interface AppProps {
  filterVal: string,
  searchVal: string,
  rows: Transaction[]
}

const tableClassName = {
  th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
}

const App: React.FC<AppProps> = ({ filterVal, searchVal, rows }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();


  function filterItems() {
    let filteredList = rows
    if (filterVal && filterVal !== "Все операции") {
      filteredList = filteredList.filter(
        item => item.operation === filterVal
      );
    }

    if (searchVal) {
      filteredList = filteredList.filter(item =>
        item.title.includes(searchVal.toLowerCase())
      );
    }

    return filteredList;
  };

  const handleOpen = () => {
    onOpen();
  };

  return (
    <div className="flex flex-col gap-3">
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
                      columnKey == "type"
                        ? (
                          <>
                            <p>{item.type.title}</p>
                            {item.document_id ? (
                              <div className="flex items-center">
                                <ArrowIcon />
                                <a href={'document/view?id=' + item.document?.id} className='text-linkSm pl-0.5 text-[12px]'>{item.document?.title} от {new Date(item.document?.created_at || '').toLocaleDateString()}</a>
                              </div>
                            )
                              :
                              <p className="text-[#757575] text-[12px]">{item.title}</p>}
                          </>
                        )
                        : columnKey == 'docs'
                          ? (<span className={item.operation == 'income' ? `text-[#009650]` : `text-[#FFB904]`}>{item.total}</span>)
                          : columnKey == 'counterparty'
                            ? (<span className={'text-[#4d89ff] cursor-pointer focus:text-underline'}>{item.counterparty.short_name}</span>)
                            : columnKey == 'taxes'
                              ? (<span className={item.operation == 'income' ? `text-[#009650]` : `text-[#FFB904]`}>{item.total_tax}</span>)
                              : (getKeyValue(item, columnKey))
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

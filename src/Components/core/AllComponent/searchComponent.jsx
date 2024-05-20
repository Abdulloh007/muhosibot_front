import React from "react";
import { Button, Input } from "@nextui-org/react";
import PlusIcon from "@/components/AllComponent/PlusIcon";
import Link from "next/link";

const SearchComponent = ({ link }) => {
  return (
    <div className="flex items-center">
      <div>
        <Input
          isClearable
          placeholder="Поиск"
          className="shadow-md"
          classNames={SearchInput}
          size="sm"
          value={isSearchValue}
          variant="bordered"
          onClear={() => setSearchValue("")}
          onValueChange={onSearchChange}
        />
      </div>
      <div>
        <Link href={link}>
          <Button
            className="bg-purpleLg text-white ml-[15px] border-none"
            startContent={<PlusIcon />}
            size="sm"
          >
            Добавить
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SearchComponent;

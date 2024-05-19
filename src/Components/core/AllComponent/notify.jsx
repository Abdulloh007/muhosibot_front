"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Collapse } from "@mui/material";
import { Button, Checkbox } from "@nextui-org/react";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

const bellSvg = "/iconMenu/bell.svg";
const headPhonesSvg = "/iconMenu/headphones.svg";

const data = [
  {
    id: 1,
    type: false,
    txt: "Новое уведомление от сервиса",
    span: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.",
  },
  {
    id: 2,
    type: true,
    txt: "Прочитанное уведомление от сервиса",
    span: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.",
  },
  {
    id: 3,
    type: true,
    txt: "Другое уведомление от сервиса",
    span: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.",
  },
];

const Notify = () => {
  const [isNotify, setNotify] = useState(false);
  const [isRead, SetRead] = useState();

  const handleRead = (e) => {
    SetRead(e.target.checked);
  };

  return (
    <>
      <div className="flex mt-5">
        <div
          onMouseEnter={() => setNotify(!isNotify)}
          className="w-9 relative h-9 flex justify-center items-center bg-white rounded-full ml-auto "
        >
          <Image width={17} height={17} src={bellSvg} alt="svg-el" />
        </div>

        <div className="w-9 h-9 ml-[15px] flex justify-center items-center bg-white rounded-full">
          <Image src={headPhonesSvg} width={17} height={17} alt="svg-el" />
        </div>
      </div>
      {isNotify && (
        <div className=" w-[400px] absolute mt-5 left-[950px] z-20">
          <Collapse in={isNotify} timeout="auto" unmountOnExit>
            <div className="shadow-md rounded-b-md">
              <div className="flex items-baseline rounded-t-md bg-white p-[15px]">
                <div>
                  <Button
                    className="bg-purpleLg p-[10px] font-semibold text-[14px] text-white min-w-0"
                    size="md"
                  >
                    Все
                  </Button>
                </div>
                <div className="ml-2">
                  <Button
                    className="p-[10px] bg-transparent rounded-lg text-[#4D89FF] font-semibold hover:bg-[#EEEEEE] min-w-0"
                    size="md"
                  >
                    Отчетность
                  </Button>
                </div>
                <div className="ml-16">
                  <Checkbox
                    onChange={handleRead}
                    radius="small"
                    color="default"
                  >
                    Прочитанные
                  </Checkbox>
                </div>
              </div>
              <div className="bg-[#F9F9F9]  rounded-b-md">
                {data.map((o) => (
                  <ListItem
                    key={o.txt}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <div
                      className={`${
                        isNotify ? `opacity-100` : `opacity-0`
                      }  px-[15px] text-[#6A7682]`}
                    >
                      <div
                        className={`${
                          o.id != 3
                            ? `border-b-2 border-[#00000] rounded-sm`
                            : ``
                        } py-[13px]`}
                      >
                        <h1
                          className={`text-[14px] font-medium ${
                            isRead && !o.type
                              ? `text-[#141414]`
                              : `text-[#757575]`
                          }`}
                        >
                          {o.txt}
                        </h1>
                        <p className="text-[#757575] text-[11px] ">{o.span}</p>
                      </div>
                    </div>
                  </ListItem>
                ))}
              </div>
            </div>
          </Collapse>
        </div>
      )}
    </>
  );
};

export default Notify;

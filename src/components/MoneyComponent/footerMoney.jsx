import { useAppSelector } from "@/lib/hooks";
import React from "react";

const FooterMoney = () => {
  const bankBalance = useAppSelector(state => state.paymentAccount.balance);
  const cashboxBalance = useAppSelector(state => state.cashbox.balance);

  const incomes_total = useAppSelector(state => state.profile.incomes_total);
  const outgoing_total = useAppSelector(state => state.profile.outgoing_total);

  return (
    <div className="fixed bottom-0 left-20 w-[80%] ml-16 rounded-t-xl p-[15px] bg-[#F1F1F1]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1>
            Остаток на сегодня:
            <span className="text-linkSm text-[16px]"> {bankBalance + cashboxBalance}</span>
          </h1>
          <p className="text-[10px] text-[#757575]">по банку и кассе</p>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <p style={{ width: 220 }} className="text-[14px]">
              Поступило / Списано, смн
            </p>
            <div style={{ width: "calc(100% - 220px)" }} className="flex ml-14">
              <p className="text-[#009650]">+ {incomes_total}</p>
              <p className="text-[#FFB904] ml-5">- {outgoing_total}</p>
            </div>
          </div>
          {/* <div className="flex justify-between items-center">
            <p style={{ width: 220 }} className="text-[14px]">
              Доходы / расходы, смн
            </p>
            <div style={{ width: "calc(100% - 220px)" }} className="flex ml-14">
              <p className="text-[#009650]">+10 000, 00</p>
              <p className="text-[#FFB904] ml-5">-- 3 000, 00</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FooterMoney;

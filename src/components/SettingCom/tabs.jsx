import React, { useEffect, useState } from "react"; // Ensure useState and useEffect are imported
import { Tabs, Tab, RadioGroup, Radio, Button, Input } from "@nextui-org/react";
import PenIcon from "@/components/core/Icons/PenIcon";
import { useAppSelector } from "@/lib/hooks";
import App from "@/components/DocumentCom/table";
import axios from "axios"; // Ensure axios is imported

const TabsSelect = {
  cursor: ["bg-purpleLg", "w-[100%]"],
  tabContent: ["text-[18px]"],
};

const TabsCom = () => {
  const [doctypeList, setDoctypeList] = useState([]); // Removed DocumentType[]
  const [docs, setDocs] = useState([]); // Removed Document[]
  const [currency, setCurrency] = useState([]); // Removed Document[]
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  
  const [server, setServer] = useState(''); // State for server input
  const [port, setPort] = useState('');

  const [kkmSettings, setKkmSettings] = useState([]);
  const [deviceStatus, setDeviceStatus] = useState(null);
  const [isShiftOpen, setIsShiftOpen] = useState(false);

  const openShift = async () => {
    const data = {
      formCode: 'OPEN_SHIFT',
      ffdVersion: 'VER_1',
      shouldPrintSlip: true,
      cashier: 'Бульбашев Б.Б.',
      kktVersion: '1'
    };

    try {
      const response = await fetch(`http://${kkmSettings[0].server}:${kkmSettings[0].port}/api/openShift`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.rc === 'SUCCESS') {
        setStatus(result.data);
      } else {
        setStatus(`Ошибка при открытии смены: ${result.rc}`);
      }
    } catch (error) {
      setStatus('Ошибка сети или сервера');
    }
  };

  const closeShift = async () => {
    const data = {
      formCode: 'CLOSE_SHIFT',
      ffdVersion: 'VER_1',
      shouldPrintSlip: true,
      cashier: 'Бульбашев Б.Б.',
      kktVersion: '1'
    };

    try {
      const response = await fetch(`http://${kkmSettings[0].server}:${kkmSettings[0].port}/api/closeShift`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.rc === 'SUCCESS') {
        setStatus(result.data);
      } else {
        setStatus(`Ошибка при закрытии смены: ${result.rc}`);
      }
    } catch (error) {
      setStatus('Ошибка сети или сервера');
    }
  };
  
  const getXReport = async () => {
    const data = {
      formCode: 'GET_X_REPORT',
      ffdVersion: 'VER_1',
      shouldPrintSlip: true
    };

    try {
      const response = await fetch(`http://${kkmSettings[0].server}:${kkmSettings[0].port}/api/getXReport`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.rc === 'SUCCESS') {
        setReport(result.data);
      } else {
        setReport(`Ошибка при получении X-отчёта: ${result.rc}`);
      }
    } catch (error) {
      setReport('Ошибка сети или сервера');
    }
  };

  const getDeviceStatus = async () => {
    const data = {
      formCode: 'DEVICE_STATUS',
      shouldPrintSlip: true
    };

    try {
      const response = await fetch(`http://${kkmSettings[0].server}:${kkmSettings[0].port}/api/deviceStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.rc === 'SUCCESS') {
        setStatus(result.data);
      } else {
        setStatus(`Ошибка при проверке устройства: ${result.rc}`);
      }
    } catch (error) {
      setStatus('Ошибка сети или сервера');
    }
  };

  const saveFiscalConfig = async () => {
  
    try {
      const userResponse = await axios.get('/api/me', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
        }
      });
      const user = userResponse.data;
      setOrganizations(user.primary_organization ? [user.primary_organization] : user.organizations);

      const defaultOrgId = user.primary_organization ? user.primary_organization.id : user.organizations[0]?.id;
      setSelectedOrgId(defaultOrgId);
      // Send fiscal configuration data to create a new fiscal config
      if (defaultOrgId) {
        const response = await axios.post(
          `/api/organizations/${defaultOrgId}/fiscal-configs`,
          {
            server: server,
            port: port
          },
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
            }
          }
        );
  
        // Handle response after saving the fiscal configuration
        console.log('Фискальная конфигурация сохранена:', response.data);
        setKkmSettings(response.data); // Update state with new fiscal config data
        window.location.reload()
      }
    } catch (error) {
      console.error('Ошибка при сохранении конфигураций:', error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch document types
        const doctypeResponse = await axios.get('/api/doctypes', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
          }
        });
        setDoctypeList(doctypeResponse.data);

        // Fetch currency data
        const currencyResponse = await axios.get('/api/currency', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
          }
        });
        setCurrency(currencyResponse.data);

        // Fetch document status
        const docsResponse = await axios.get('/api/documents/status/1', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
          }
        });
        setDocs(docsResponse.data);

        // Fetch user details and organizations
        const userResponse = await axios.get('/api/me', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
          }
        });
        const user = userResponse.data;
        setOrganizations(user.primary_organization ? [user.primary_organization] : user.organizations);

        // If there's a primary organization, set it as selected by default
        const defaultOrgId = user.primary_organization ? user.primary_organization.id : user.organizations[0]?.id;
        setSelectedOrgId(defaultOrgId);

        // Fetch KKM settings for the selected organization
        if (defaultOrgId) {
          const kkmResponse = await axios.get(`/api/organizations/${defaultOrgId}/fiscal-configs`, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem(btoa('token'))
            }
          });
          setKkmSettings(kkmResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  
  function exitApp() {
    localStorage.clear();
    location.reload();
  }

  const handleGetDeviceStatus = async () => {
    try {
      const status = await getDeviceStatus();
      setDeviceStatus(status);
    } catch (error) {
      alert("Не удалось получить статус устройства.");
    }
  };

  const userData = useAppSelector(state => state.profile);

  return (
    <div className="container">
      <div className="flex flex-col">
        <h1 className="text-[36px] font-semibold">Настройки</h1>
        <span className="text-[#B0B0B0] text-[16px]">
          Настройки &gt; Аккаунт и уведомления
        </span>
      </div>
      <div className="w-full mt-[60px] rounded-xl shadow-lg min-h-[70vh] bg-white">
        <div className="container-form">
          <Tabs
            key="underlined"
            variant="underlined"
            classNames={TabsSelect}
            aria-label="Tabs variants"
          >
            <Tab key="account" title="Аккаунт и уведомления">
              <div className="pt-[25px]">
                <div className="flex mt-[15px]">
                  <p style={{ width: 158 }}>Электронная почта</p>
                  <div className="flex">
                    <p className="ml-[100px]">{userData.email}</p>
                    <div className="flex items-center ml-[10px] text-linkSm">
                      <PenIcon />
                      Изменить почту
                    </div>
                  </div>
                </div>
                <div className="flex mt-[15px]">
                  <p style={{ width: 158 }}>Телефон</p>
                  <div className="flex">
                    <p className="ml-[100px]">{userData.phone}</p>
                    <div className="flex items-center ml-[10px] text-linkSm">
                      <PenIcon />
                      Изменить номер
                    </div>
                  </div>
                </div>
                <div className="flex mt-[15px]">
                  <p style={{ width: 158 }}>Пароль</p>
                  <div className="flex">
                    <p className="ml-[100px]">**************</p>
                    <div className="flex items-center ml-[10px] text-linkSm">
                      <PenIcon />
                      Изменить пароль
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[40px] mb-[60px]">
                <h1 className="font-semibold text-[18px]">Вход в платформу</h1>
                <RadioGroup className="mt-[20px]" defaultValue="toPassword">
                  <Radio value="toPassword">По паролю</Radio>
                  <Radio value="PushAndPw" className="flex items-start">
                    По паролю и push-уведомлению от мобильного приложения
                    <br />
                    <a
                      href="#"
                      className="text-linkSm text-[14px]"
                    >
                      Почему это удобно
                    </a>
                  </Radio>
                </RadioGroup>
              </div>
              <div className="w-full">
                <Button variant="ghost" color="danger" onClick={exitApp}>Выйти</Button>
              </div>
            </Tab>
            <Tab key="tarif" title="Тарифы и оплата" />
            <Tab key="adaptive" title="Многопользовательский режим" />
            <Tab key="accouting" title="Настройки учёта">
              <div className="pt-[25px]">
                <div className="flex mt-[15px]">
                  <p style={{ width: 250 }}>Система налогообложения</p>
                  <div className="flex">
                    <p className="ml-[100px]">{userData.primary_organization.tax_system}</p>
                    <div className="flex items-center ml-[10px] text-linkSm">
                      <PenIcon />
                      Изменить СНО
                    </div>
                  </div>
                </div>

                {kkmSettings.length < 0 ? (
                  kkmSettings.map((kkm, index) => (
                    <div key={index}>
                      <div className="mt-[40px] mb-[20px]">
                        <h1 className="font-semibold text-[18px]">Настройки ККМ</h1>
                        <Input className={'mt-[20px] w-[250px]'} type="text" label="Сервер" value={kkm.server} />
                        <Input className={'mt-[20px] w-[250px]'} type="number" label="Порт" value={kkm.port} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <div className="mt-[40px] mb-[20px]">
                      <h1 className="font-semibold text-[18px]">Настройки ККМ</h1>
                      {/* Providing default values for server and port */}
                      <Input className={'mt-[20px] w-[250px]'} type="text" label="Сервер" value={server} onChange={(e) => setServer(e.target.value)} />
                      <Input className={'mt-[20px] w-[250px]'} type="number" label="Порт" value={port} onChange={(e) => setPort(e.target.value)} />
                    </div>
                    <div className="w-full">
                      <Button variant="ghost" onClick={saveFiscalConfig} color="success">Сохранить</Button>
                    </div>
                  </div>
                )}

              </div>
              <div className="mt-[40px] mb-[40px]">
                <h1 className="font-semibold text-[18px] mb-[20px]">Операции ККМ</h1>
                <Button variant="flat" color="success" className="mr-3" onClick={isShiftOpen ? closeShift : openShift}> {isShiftOpen ? "Закрыть Смену" : "Открыть Смену"}</Button>
                <Button variant="flat" className="mr-3">X отчёт</Button>
                <Button variant="flat" onClick={handleGetDeviceStatus} className="mr-3 bg-[#ffc107] text-[#000]">Проверка связи</Button>
                <Button variant="flat" color="success" onClick={getXReport}>Закрыть Смену</Button>
              </div>
            </Tab>
            <Tab key="deleted_docs" title="Удаленные документы">
              <div className="mt-[40px] mb-[40px]">
                <h1 className="font-semibold text-[18px] mb-[20px]">Удаленные документы</h1>
                <App rows={docs} />
              </div>
            </Tab>
            <Tab key="currency" title="Валюта">
              <div className="mt-[40px] mb-[40px]">
                {/* <h1 className="font-semibold text-[18px] mb-[20px]">Валюта</h1> */}
                <div className="w-[95%] mx-auto">
                  <div className="flex w-full justify-around py-3 border-b-[2px] border-t border-b-[#a774ff] border-t-[#eee]">
                    <p className="w-[40%] font-[600] text-[18px]">Название</p>
                    <p className="w-[30%] font-[600] text-[18px]">Короткое название</p>
                    <p className="w-[30%] font-[600] text-[18px]">Код</p>
                    <p className="w-[30%] font-[600] text-[18px]">Курс</p>
                    {/* <p className="w-[30%] font-[600] text-[18px]"></p> */}
                  </div>
                  {currency.map((item, index) => (
                    <div key={index} className="flex w-full justify-around py-4 border-b border-b-[#eee]">
                      <p className="w-[40%]">{item.name}</p>
                      <p className="w-[30%]">{item.sh_name}</p>
                      <p className="w-[30%]">{item.code}</p>
                      <p className="w-[30%]">{item.well}</p>
                      {/* <p className="w-[30%]"><a onClick="" className="bg-[#a774ff] px-3 py-2 rounded-md text-[#fff] cursor-pointer">Установить</a></p> */}
                    </div>
                  ))}
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TabsCom;

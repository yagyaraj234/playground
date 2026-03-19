import { IconChevronDown } from "@tabler/icons-react";
import React, { useEffect } from "react";
import { CardContainer, CardContent } from "./-card";
import PayButton from "./-pay-button";
import PaymentOption from "./-payment-option";
const tabs = ["United States", "Germany", "United Kingdom", "China", "Mexico"];

function GermanyCard() {
  return (
    <CardContainer className="h-fit">
      <div className="flex flex-col p-4">
        <div className=" text-zinc-600 text-sm flex gap-2 items-center">
          <img src="/kalarna.svg" alt="kalarna" />
          <div className="flex flex-col gap-0">
            <p className="font-medium text-base text-zinc-800">Klarna</p>
            <p className="text-xs">Jetzt kaufen, später bezahlen</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="bg-zinc-100 rounded-lg p-3 my-2">
            <span className="text-zinc-500 text-sm">Email</span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="bg-zinc-100 rounded-lg p-3 my-2 w-full">
              <span className="text-zinc-500 text-sm">Vor- und Nachname</span>
            </div>
            <div className="bg-zinc-100 flex justify-between items-center rounded-lg px-3 py-2.5 my-2 w-full">
              <div className="flex flex-col gap-0">
                <span className="text-zinc-700 text-sm -mt-2">Land</span>
                <span className="text-zinc-300 text-xs">Deutschland</span>
              </div>
              <IconChevronDown className="size-5 text-zinc-700" />
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center my-2">
          <img src="/payment.svg" alt="payment" />
          <p className="text-zinc-400 text-sm ">
            Nach dem Absenden werden Sie weitergeleitet, um die nächsten
            Schritte sicher abzuschließen.
          </p>
        </div>
      </div>
      <CardContent>
        <PaymentOption imagesrc="/sepa.svg" title="SEPA-Lastschrift" />
      </CardContent>
      <CardContent>
        <PaymentOption imagesrc="/paypal.svg" title="Paypal" />
      </CardContent>
    </CardContainer>
  );
}

function Mexico() {
  return (
    <div>
      <CardContainer>
        <div className="flex flex-col p-4">
          <div className=" text-zinc-600 text-sm flex gap-2 items-center">
            <img src="/card.svg" alt="kalarna" className=" opacity-60" />
            <div className="flex flex-col gap-0">
              <p className="font-medium text-base text-zinc-500">Klarna</p>
              <p className="text-xs text-zinc-400">
                Jetzt kaufen, später bezahlen
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="bg-zinc-100 rounded-lg p-3 my-2">
              <span className="text-zinc-500 text-sm">Email</span>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-zinc-100 rounded-lg p-3 my-2 w-full">
                <span className="text-zinc-500 text-sm">Vor- und Nachname</span>
              </div>
              <div className="bg-zinc-100 flex justify-between items-center rounded-lg px-3 py-2.5 my-2 w-full">
                <div className="flex flex-col gap-0">
                  <span className="text-zinc-700 text-sm -mt-2">Land</span>
                  <span className="text-zinc-300 text-xs">Deutschland</span>
                </div>
                <IconChevronDown className="size-5 text-zinc-700" />
              </div>
            </div>
          </div>
        </div>
        <CardContent>
          <PaymentOption
            imagesrc="/bank.svg"
            title=" Transferencias bancarias"
          />
        </CardContent>
        <CardContent>
          <PaymentOption imagesrc="/oxxo.svg" title="OXXO" />
        </CardContent>
      </CardContainer>

      <PayButton>Pagar MXN 3,500.00</PayButton>
    </div>
  );
}

function UnitedStateCard() {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <CardContainer className="divide-y-0 ring-0" ref={ref}>
      <div className="ring-1  w-full ring-zinc-200 rounded-lg  divide-y divide-zinc-200">
        <div className="p-4 text-zinc-600 text-sm flex gap-2 items-center">
          {" "}
          <img src="/card.svg" alt="card" className=" opacity-60" />
          Card
        </div>
        <div className="text-sm p-4 py-3 flex  gap-2 text-zinc-700 ">
          <PaymentOption imagesrc="/afterpay.svg" title="Afterpay" bnpl />
        </div>
        <div className="text-sm p-4 text-zinc-700 ">
          <PaymentOption
            className="-mt-2"
            imagesrc="/affirm.svg"
            title="Affirm"
          />
          <div className="ring-[0.5px] divide-y divide-zinc-200 ring-zinc-200 block w-11/12 mx-auto mt-4  rounded-md">
            <div className="p-4 flex gap-1 items-center">
              {" "}
              4 interest-free payments of $56{" "}
              <img
                src="/affirm-brand.svg"
                alt="affirm"
                className="-mt-2"
              />{" "}
              <a href="#" hrefLang="en" className="underline text-blue-500">
                Learn more
              </a>
            </div>
            <div className="flex gap-4 p-4">
              <img src="/payment.svg" alt="payment" />
              <p>
                After submission, you will be redirected to securely complete
                next steps.
              </p>
            </div>
          </div>
        </div>
      </div>
      <PayButton>Pay $168.00</PayButton>
    </CardContainer>
  );
}

function UnitedKingdom() {
  return (
    <div>
      <CardContainer>
        <div className="flex flex-col p-4">
          <div className=" text-zinc-600 text-sm flex gap-2 items-center">
            <img src="/card.svg" alt="card" className=" opacity-60" />
            <div className="flex flex-col gap-0">
              <p className="font-medium text-base text-zinc-500">Card</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="bg-zinc-100 rounded-lg p-3 my-2 flex items-center justify-between">
              <span className="text-zinc-500 text-sm font-light">
                Card Number
              </span>

              <div className="flex gap-2 items-center">
                <img src="/visa.svg" alt="visa" />
                <img src="/amex.svg" alt="amex" />
                <img src="/mastercard.svg" alt="mastercard" />
                <img src="/unionpay.svg" alt="unionpay" />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-zinc-100 rounded-lg p-3 my-2 w-full">
                <span className="text-zinc-500 text-sm font-light">
                  Expiry Date
                </span>
              </div>
              <div className="bg-zinc-100 flex justify-between items-center rounded-lg px-3 py-2.5 my-2 w-full">
                <span className="text-zinc-500 text-sm font-light">CVC</span>
                <img src="/cvc.svg" alt="cvc" />
              </div>
            </div>
          </div>
        </div>
        <CardContent>
          <PaymentOption imagesrc="/china.svg" title="Klarna" bnpl />
        </CardContent>
        <CardContent>
          <PaymentOption imagesrc="/clearpay.svg" title="Clearpay" bnpl />
        </CardContent>
      </CardContainer>

      <PayButton>Pay £235.00</PayButton>
    </div>
  );
}

function China() {
  return (
    <div>
      <CardContainer>
        <div className="flex flex-col p-4">
          <div className=" text-zinc-600 text-sm flex gap-2 items-center">
            <img src="/card.svg" alt="card" className=" opacity-60" />
            <div className="flex flex-col gap-0">
              <p className="font-medium text-base text-zinc-500">银行卡</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="bg-zinc-100 rounded-lg p-3 my-2 flex items-center justify-between">
              <span className="text-zinc-500 text-sm font-light">卡号</span>

              <div className="flex gap-2 items-center">
                <img src="/unionpay.svg" alt="unionpay" />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-zinc-100 rounded-lg p-3 my-2 w-full">
                <span className="text-zinc-500 text-sm font-light">有效期</span>
              </div>
              <div className="bg-zinc-100 flex justify-between items-center rounded-lg px-3 py-2.5 my-2 w-full">
                <span className="text-zinc-500 text-sm font-light">CVC</span>
                <img src="/cvc.svg" alt="cvc" />
              </div>
            </div>
          </div>
        </div>
        <CardContent>
          <PaymentOption imagesrc="/china.svg" title="支付宝" />
        </CardContent>
        <CardContent>
          <PaymentOption imagesrc="/chinaa.svg" title="微信支付" />
        </CardContent>
      </CardContainer>

      <PayButton>支付 ¥450.00</PayButton>
    </div>
  );
}

export default function StripePaymentTabs() {
  const [activeTab, setActiveTab] = React.useState(tabs[0]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // task: add to tabs to move from right to left when options are changing also automatically change the active tab
  useEffect(() => {
    const intervalId = setInterval(() => {
      const index = tabs.indexOf(activeTab);
      setActiveTab(tabs[(index + 1) % tabs.length]);
      if (index === tabs.length - 1) {
        setActiveTab(tabs[0]);
        containerRef.current?.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        // scroll container to 600px + 24px
        containerRef.current?.scrollTo({
          left: (index + 1) * 696,
          behavior: "smooth",
        });
      }
    }, 6000);

    return () => clearInterval(intervalId);
  }, [activeTab]);

  function handleItemClick(itemIndex: number) {
    setActiveTab(tabs[itemIndex]);
    containerRef?.current.scrollTo({
      left: itemIndex * 696,
      behavior: "smooth",
    });
  }

  return (
    <div className="flex flex-col gap-4 w-screen mx-auto">
      <div className="w-3/6 max-w-3/6 min-w-3/6  mx-auto">
        <div className="flex gap-4 items-center w-full my-6">
          {tabs.map((tab, idx) => (
            <div
              className={` text-black px-3 py-1.5 rounded-full cursor-pointer ${tab === activeTab ? "bg-purple-500 text-white" : "bg-white"}`}
              key={tab}
              onClick={() => handleItemClick(idx)}
            >
              {tab}
            </div>
          ))}
        </div>

        <div
          className="transition-all duration-500 ease-in bg-white flex gap-24 overflow-x-hidden no-scrollbar max-h-[420px] min-h-[420px] drop-shadow-md p-5 ring-1 ring-zinc-200 rounded-lg w-full
        "
          ref={containerRef}
        >
          <UnitedStateCard />
          <GermanyCard />
          <UnitedKingdom />
          <China />
          <Mexico />
        </div>
      </div>
    </div>
  );
}

import { IconChevronDown } from "@tabler/icons-react";
import React, { useEffect } from "react";
import { cn } from "../../../lib/utils";
import Bnpl from "./-payment-option";
import PayButton from "./-pay-button";
import PaymentOption from "./-payment-option";
const tabs = ["United States", "Germany", "Mexico", "China", "United Kingdom"];

function CardContainer({
  children,
  className,
  ref,
}: {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      className={cn(
        "ring-1  ring-zinc-200 rounded-lg  divide-y divide-zinc-200",
        className,
      )}
      ref={ref}
    >
      {children}
    </div>
  );
}

function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-2 items-center justify-start p-4", className)}>
      {children}
    </div>
  );
}

function GermanyCard() {
  return (
    <CardContainer>
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
        <img src="/sepa.svg" alt="sepa" />
        <p className="font-medium text-base text-zinc-800"> SEPA-Lastschrift</p>
      </CardContent>
      <CardContent>
        <img src="/paypal.svg" alt="paypal" />
        <p className="font-medium text-base text-zinc-800"> Paypal</p>
      </CardContent>
    </CardContainer>
  );
}

function Mexico() {
  return (
    <>
      <CardContainer>
        <div className="flex flex-col p-4">
          <div className=" text-zinc-600 text-sm flex gap-2 items-center">
            <img src="/card.svg" alt="kalarna" />
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
        </div>
        <CardContent>
          <img src="/bank.svg" alt="bank" />
          <p className="font-medium text-base text-zinc-800">
            Transferencias bancarias
          </p>
        </CardContent>
        <CardContent>
          <img src="/oxxo.svg" alt="oxxo" />
          <p className="font-medium text-base text-zinc-800">OXXO</p>
        </CardContent>
      </CardContainer>

      <PayButton>Pagar MXN 3,500.00</PayButton>
    </>
  );
}

function UnitedStateCard() {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <CardContainer className="divide-y-0 ring-0" ref={ref}>
      <div className="ring-1  w-full ring-zinc-200 rounded-lg  divide-y divide-zinc-200">
        <div className="p-4 text-zinc-600 text-sm flex gap-2 items-center">
          {" "}
          <img src="/card.svg" alt="card" />
          Card
        </div>
        <div className="text-sm p-4 py-3 flex  gap-2 text-zinc-700 ">
          <PaymentOption imagesrc="/afterpay.svg" title="Afterpay" />
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
    <>
      <CardContainer>
        <div className="flex flex-col p-4">
          <div className=" text-zinc-600 text-sm flex gap-2 items-center">
            <img src="/card.svg" alt="kalarna" />
            <div className="flex flex-col gap-0">
              <p className="font-medium text-base text-zinc-800">Card</p>
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
    </>
  );
}

function China() {
  return (
    <>
      <CardContainer>
        <div className="flex flex-col p-4">
          <div className=" text-zinc-600 text-sm flex gap-2 items-center">
            <img src="/card.svg" alt="kalarna" />
            <div className="flex flex-col gap-0">
              <p className="font-medium text-base text-zinc-800">银行卡</p>
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
    </>
  );
}

export default function StripePaymentTabs() {
  const [activeTab, setActiveTab] = React.useState(tabs[1]);

  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       const index = tabs.indexOf(activeTab);
  //       setActiveTab(tabs[(index + 1) % tabs.length]);
  //       lastActiveItemRef.current = tabs[(index + 1) % tabs.length];
  //     }, 3000);

  //     return () => clearInterval(intervalId);
  //   }, []);
  return (
    <div className="flex flex-col gap-4 w-screen mx-auto">
      <div className="w-4/6 max-w-4/6 min-w-4/6">
        <div className="flex gap-4 items-center w-full my-6">
          {tabs.map((tab, idx) => (
            <div
              className={` text-black px-3 py-1.5 rounded-full ${tab === activeTab ? "bg-purple-500 text-white" : "bg-white"}`}
              key={tab}
              onClick={() => setActiveTab(tabs[idx])}
            >
              {tab}
            </div>
          ))}
        </div>

        <div
          className="bg-white  max-h-[460px] min-h-[460px] drop-shadow-md p-8 ring-1 ring-zinc-200 rounded-lg w-full
        "
        >
          <China />
          {/* <UnitedStateCard /> */}
        </div>
      </div>
    </div>
  );
}

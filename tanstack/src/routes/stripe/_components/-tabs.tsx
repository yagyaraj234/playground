import { Link } from "@tanstack/react-router";
import React from "react";
const tabs = ["United States", "Mexico", "China", "Germany", "United Kingdom"];

function GermanyCard() {
  return (
    <div className="ring-1  ring-zinc-200 rounded-lg  divide-y divide-zinc-200"></div>
  );
}

function UnitedStateCard() {
  return (
    <>
      <div className="ring-1  ring-zinc-200 rounded-lg  divide-y divide-zinc-200">
        <div className="p-4 text-zinc-600 text-sm flex gap-2 items-center">
          {" "}
          <img src="/card.svg" alt="card" />
          Card
        </div>
        <div className="text-sm p-4 py-3 flex  gap-2 text-zinc-700 ">
          <img src="/afterpay.svg" alt="afterpay" />
          <div className="flex flex-col gap-0 justify-items-start -mt-1 ">
            <div>Afterpay</div>
            <p className="text-zinc-500 text-xs">Buy now pay later</p>
          </div>
        </div>
        <div className="text-sm p-4 text-zinc-700 ">
          <div className="flex gap-2">
            <img src="/affirm.svg" alt="affirm" />
            <div className="flex flex-col gap-0 justify-items-start -mt-2 ">
              <div>Affirm</div>
              <p className="text-zinc-500 text-xs">Buy now pay later</p>
            </div>
          </div>
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
      <button className="bg-purple-500/70 text-white px-4 py-2 mt-4  rounded-lg w-full text-center ">
        Pay $168.00
      </button>
    </>
  );
}

export default function StripePaymentTabs() {
  const [activeTab, setActiveTab] = React.useState(tabs[0]);
  return (
    <div className="flex flex-col gap-4 max-w-3xl">
      <div className="flex gap-4 items-center">
        {tabs.map((tab) => (
          <div
            className={` text-black px-3 py-1.5 rounded-full ${tab === activeTab ? "bg-purple-500 text-white" : "bg-white"}`}
            key={tab}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="bg-white drop-shadow-md p-8 ring-1 ring-zinc-200 rounded-lg">
        <UnitedStateCard />
      </div>
    </div>
  );
}

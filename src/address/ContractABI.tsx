import React from "react";
import { Tab } from "@headlessui/react";
import ModeTab from "../components/ModeTab";
import Copy from "../components/Copy";
import DecodedABI from "./DecodedABI";
import RawABI from "./RawABI";

type ContractABIProps = {
  abi: any[];
};

const ContractABI: React.FC<ContractABIProps> = ({ abi }) => (
  <div className="mb-3">
    <Tab.Group>
      <Tab.List className="flex items-baseline space-x-1 mb-1">
        <div className="flex items-baseline space-x-2 text-sm pr-2 py-1">
          <span>ABI</span>
          <Copy value={JSON.stringify(abi)} />
        </div>
        <ModeTab>Decoded</ModeTab>
        <ModeTab>Raw</ModeTab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <DecodedABI abi={abi} />
        </Tab.Panel>
        <Tab.Panel>
          <RawABI abi={abi} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  </div>
);

export default React.memo(ContractABI);

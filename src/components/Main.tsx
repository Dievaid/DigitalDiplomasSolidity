import { VStack, Input, Center, Button } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import React, { useState, useEffect, useRef } from "react";

import DiplomaProvider from '../abi/DiplomaProvider.json';
import Web3 from "web3";

export const Main: React.FC = () => {
  const { connector, hooks } = useWeb3React();

  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [acc, setAcc] = useState("");

  const {
    useSelectedAccount,
    useSelectedChainId,
    useSelectedIsActive,
    useSelectedIsActivating,
  } = hooks;
  const isActivating = useSelectedIsActivating(connector);
  const isActive = useSelectedIsActive(connector);
  const account = useSelectedAccount(connector);
  const chain = useSelectedChainId(connector);

  const [error, setError] = useState<Error | undefined>(undefined);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  const handleToggleConnect = () => {
    setError(undefined); // clear error state

    if (isActive) {
      if (connector?.deactivate) {
        void connector.deactivate();
      } else {
        void connector.resetState();
      }
    } else if (!isActivating) {
      setConnectionStatus("Connecting..");
      Promise.resolve(connector.activate(1)).catch((e) => {
        console.error(e);
        connector.resetState();
        setError(e);
      });
    }
  };

  useEffect(() => {
    if (isActive) {
      setConnectionStatus("Connected");
      const web3 = new Web3(connector.provider);
      setWeb3(web3);
      web3.eth.getAccounts().then(accs => setAcc(accs[0]));
    } else {
      setConnectionStatus("Disconnected");
    }
  }, [isActive]);

  const idRef = useRef<any>();
  const firstNameRef = useRef<any>();
  const lastNameRef = useRef<any>();
  const markRef = useRef<any>();
  const titleRef = useRef<any>();
  const dTypeRef = useRef<any>();

  const createDiploma = async () => {
    if (web3) {
      const diplomaProvider = new web3.eth.Contract(DiplomaProvider.abi, DiplomaProvider.networks[5777].address);

      await diplomaProvider.methods.createDiploma(
        // @ts-ignore
        idRef.current.value,
        firstNameRef.current.value,
        lastNameRef.current.value,
        +markRef.current.value,
        titleRef.current.value,
        dTypeRef.current.value
      ).send({from: account});
  
      alert("Diploma created");
    }
  }

  return (
    <Center p={"10%"} flexDirection={"column"}>
      <VStack>
        <p>{"METAMASK"}</p>
        <h3>
          Status -{" "}
          {error?.message ? "Error: " + error.message : connectionStatus}
        </h3>
        <h3>Address - {account ? account : "No Account Detected"}</h3>
        <h3>ChainId - {chain ? chain : "No Chain Connected"}</h3>
        <button onClick={handleToggleConnect} disabled={false}>
          {isActive ? "Disconnect" : "Connect"}
        </button>
        <p>{acc}</p>
      </VStack>
      <VStack w={"30%"}>
        <Input placeholder="Id" ref={idRef}></Input>
        <Input placeholder="First Name" ref={firstNameRef}></Input>
        <Input placeholder="Last Name" ref={lastNameRef}></Input>
        <Input placeholder="Mark" ref={markRef}></Input>
        <Input placeholder="Title" ref={titleRef}></Input>
        <Input placeholder="Diploma Type" ref={dTypeRef}></Input>
        <Button onClick={createDiploma}>Create</Button>
      </VStack>
    </Center>
  );
};

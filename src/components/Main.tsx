import { VStack, Input, Center, Button } from "@chakra-ui/react";
import React, { useRef } from "react";
import { ethers } from "ethers";

import DiplomaProvider from '../abi/DiplomaProvider.json';

export const Main: React.FC = () => {
  const idRef = useRef<any>();
  const firstNameRef = useRef<any>();
  const lastNameRef = useRef<any>();
  const markRef = useRef<any>();
  const titleRef = useRef<any>();
  const dTypeRef = useRef<any>();

  const createDiploma = async () => {
    try {
      const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');
      const privateKey = '0x376d9273dc95f87cd00f10d3f6a4e19722cc180454ac58e136f4061bff207629';
      const wallet = new ethers.Wallet(privateKey, provider);

      const contract = new ethers.Contract(DiplomaProvider.networks[5777].address, DiplomaProvider.abi, wallet);
  
      const result = await contract.createDiploma(
        idRef.current.value,
        firstNameRef.current.value,
        lastNameRef.current.value,
        +markRef.current.value,
        titleRef.current.value,
        dTypeRef.current.value
      );
      console.log('Contract result:', result);
    } catch (error) {
      console.error('Error interacting with the contract:', error);
    }
  }

  return (
    <Center p={"10%"} flexDirection={"column"}>
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

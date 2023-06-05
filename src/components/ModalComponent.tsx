import React, { useState } from "react";
import ReactModal from "react-modal";
import { useSimpleEvent } from "simple-core-state";
import styled from "styled-components";
import { core } from "../core";
import { GlobalVariables } from "../modals/GlobalVariablesModal";

export interface IModalProps<T> {
  openState: boolean;
  onClose: () => void;
  data: T;
}

export interface IModalComponentProps {
  openState: boolean;
  onClose: () => void;
  onAfterClose?: () => void;
  children: React.ReactNode;
}

export const ModalComponent = (p: IModalComponentProps) => {
  return (
    <ReactModalBox
      isOpen={p.openState}
      onRequestClose={() => p.onClose()}
      onAfterClose={p.onAfterClose}
      shouldCloseOnOverlayClick
      closeTimeoutMS={200}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "#00000025",
          zIndex: 999999,
          backdropFilter: "blur(4px)",
        },
      }}
      // style={{ overlay: { backgroundColor: '#ffffff26', zIndex: 999999, backdropFilter: 'blur(4px)' } }}
    >
      <ModalInsideContainer>{p.children}</ModalInsideContainer>
    </ReactModalBox>
  );
};

const ReactModalBox = styled(ReactModal)`
  /* background-color: ${({ theme }) => theme.solid}; */
  background-color: white;
  border: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  outline: none;

  @media only screen and (max-width: 500px) {
    width: calc(100%);
    border-radius: 0px;
    height: calc(100%);
    background-color: transparent;
  }
`;

const ModalInsideContainer = styled.div`
  height: calc(100%);
  @media only screen and (max-width: 500px) {
    background-color: ${({ theme }) => theme.solid};
    align-items: center;
    width: 100%;
    padding: 20px 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;

interface ModalEventData {
  name: ModalNames;
  data: any;
}

export type ModalNames = "GlobalVariables";

interface IModalWrapperProps {
  children?: React.ReactNode;
}

export const ModalWrapper = (p: IModalWrapperProps) => {
  const [isOpen, setisOpen] = useState(false);
  const [modalName, setModalName] = useState<ModalNames | null>(null);
  const [data, setData] = useState<any>(null);

  useSimpleEvent(core._events.modal, (e: ModalEventData) => {
    console.log("Modal event: ", e);
    setModalName(e.name);
    setData(e.data);
    setisOpen(true);
  });

  const closeModal = () => {
    setisOpen(false);
    setTimeout(() => {
      setData(null);
      setModalName(null);
    }, 200);
  };

  return (
    <>
      {modalName === "GlobalVariables" && (
        <GlobalVariables openState={isOpen} onClose={closeModal} data={data} />
      )}
      {p.children}
    </>
  );
};

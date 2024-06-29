import { createPortal } from "react-dom";
import "./Modal.scss";
import apple from "../assets/modal-apple.svg";
import at from "../assets/modal-at.svg";

import { ReactNode } from "react";
export interface ModalProps {
  onClose: () => void;
  show: boolean;
  children?: ReactNode;
  title?: string;
}
export default function Modal(props: ModalProps) {
  return createPortal(
    <div
      className={`modal-box z-1000 fixed left-0 right-0 top-0 bottom-0 mask justify-center items-center transition-300 transition-ease ${
        props.show ? "flex" : "hidden"
      }`}
    >
      <div className="modal-container max-w-750px w-100% rounded-12px mx-17px w-342px h-453px overflow-hidden">
        <div className="h-100% bg">
          <div className="modal-header h-50px flex justify-center items-center relative">
            <div className="font-size-20px font-bold">
              {props.title || "Title"}
            </div>
            <div className="absolute right-0 top-0 h-50px">
              <div className="relative flex justify-center items-center">
                <img
                  src={apple}
                  className="absolute right-0px top-0px w-40px h-40px"
                  alt=""
                />
                <img src={at} className="absolute right-9px top-9px" alt="" />
              </div>
            </div>
          </div>
          <div className="max-h-330px overflow-y-scroll mx-14px border-2px border-solid border-black rounded-8px bg-white">
            {props.children}
          </div>
          <div className="flex justify-center items-center h-70px">
            <div
              className="border-2px border-solid border-black rounded-8px boxShadow w-127px bg-white lh-36px font-size-14px font-bold"
              onClick={props.onClose}
            >
              Ok
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("root")!
  );
}

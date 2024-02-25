import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: any;
  open: boolean;
}

export function Modal({ children, open }: ModalProps) {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (open) {
      dialog.current!.showModal();
    } else {
      dialog.current!.close();
    }
  }, [open]);

  return createPortal(
    <dialog
      ref={dialog}
      className="fixed z-[2] w-full overflow-auto left-0 top-0;
   rounded-lg sm:max-w-sm"
    >
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
}

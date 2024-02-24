import { useEffect } from "react";
import { Modal } from "./Modal";

interface EffectSectionProps {
  open: boolean;
  close: Function;
  children: any;
}

export function EffectSection({ open, close, children }: EffectSectionProps) {
  useEffect(() => {
    const handlerEscape = (e: any) => {
      if (e.key === "Escape") {
        console.log(typeof e);
        e.preventDefault();
        close();
      }
    };

    document.addEventListener("keydown", handlerEscape);

    return () => {
      document.removeEventListener("keydown", handlerEscape);
    };
  });
  return (
    <section>
      <Modal open={open}>{children}</Modal>
    </section>
  );
}

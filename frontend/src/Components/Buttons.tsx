import { FaPlus } from "react-icons/fa";

interface ButtonProps {
  onClick: Function;
  title?: string;
}

export function Button({ title, onClick }: ButtonProps) {
  return (
    <button
      className="items-center appearance-none bg-green-400 rounded shadow-[rgba(0, 128, 0, 0.4)_0_2px_4px,rgba(0, 128, 0, 0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] box-border text-white cursor-pointer inline-flex h-12 justify-center leading-none overflow-hidden relative text-left no-underline transition-shadow duration-[0.15s,transform] delay-[0.15s] select-none touch-manipulation whitespace-nowrap will-change-[box-shadow,transform] text-lg px-4 border-0 focus:shadow-[#D6D6E7_0_0_0_1.5px_inset,rgba(0, 128, 0, 0.4)_0_2px_4px,rgba(0, 128, 0, 0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] hover:shadow-[rgba(0, 128, 0, 0.4)_0_4px_8px,rgba(0, 128, 0, 0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] hover:-translate-y-0.5 active:shadow-[#D6D6E7_0_3px_7px_inset] active:translate-y-0.5"
      onClick={() => onClick()}
    >
      {title}
    </button>
  );
}

export function BottomRightButton({ onClick }: ButtonProps) {
  return (
    <button
      className="fixed bottom-4 right-4 bg-green-400 hover:bg-green-300 hover:scale-125 text-white font-bold py-3 px-3 rounded-full shadow-md transform duration-700"
      onClick={(e) => onClick(e)}
    >
      <FaPlus size={20} />
    </button>
  );
}

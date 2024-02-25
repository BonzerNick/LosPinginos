import logo from "../../assets/images/penguin-svgrepo-com.svg";
export function Logo() {
  return (
    <div className="text-xl font-bold flex gap-2">
      <img src={logo} className="App-logo w-8" alt="logo" />
      <span className="hover:opacity-30 transition duration-300 ease-in-out disable-select flex items-center">
        Git Pingüinos
      </span>
    </div>
  );
}

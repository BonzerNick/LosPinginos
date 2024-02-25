import { Logo } from "./Logo";

interface HeaderProps {
  addSomething: Function;
  addTitle?: string;
  profileActions: Function;
  profileTitle?: string;
}

export function Header({
  addSomething,
  addTitle,
  profileActions,
  profileTitle,
}: HeaderProps) {
  return (
    <header className=" bg-green-300 text-neutral-900 p-3 px-2">
      <div className="lg:mx-24 mx-3 flex justify-between items-center ">
        <Logo />
        <nav>
          <ul className="flex space-x-4">
            {/* <li>
              <a
                className="hover:opacity-30  transition duration-300 ease-in-out disable-select"
                onClick={(e) => addSomething()}
              >
                {addTitle}
              </a>
            </li> */}
            <li>
              <a
                className="hover:opacity-30  transition duration-300 ease-in-out disable-select"
                onClick={(e) => profileActions()}
              >
                {profileTitle}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    // </div>
  );
}

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
    <header className="bg-gray-500 text-white p-3 px-2">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a
                className="hover:text-gray-300 transition duration-300 ease-in-out disable-select"
                onClick={(e) => addSomething()}
              >
                {addTitle}
              </a>
            </li>
            <li>
              <a
                className="hover:text-gray-300 transition duration-300 ease-in-out disable-select"
                onClick={(e) => profileActions()}
              >
                {profileTitle}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

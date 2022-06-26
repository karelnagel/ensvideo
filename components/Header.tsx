import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

import { useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

export function Header({ theme, setTheme }: { theme: boolean; setTheme: Function }) {
  const [query, setQuery] = useState("");

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      // navigate(`/${query.replace(".eth", "")}.eth`, { replace: true });
      // Todo fix
    }
  };

  return (
    <div className="w-full py-4">
      <div className="max-w-screen-xl m-auto grid grid-cols-3 items-center justify-center justify-items-center">
        <Link href="/">
          <h1 className="font-bold text-3xl text-primary">ENS Video</h1>
        </Link>
        <input
          onKeyDown={handleKeyDown}
          className="bg-primary text-primary-content rounded-md p-2 placeholder-primary-content"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
        />
        <div className="flex space-x-3">
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={() => setTheme((t: any) => !t)} />
            <MdOutlineDarkMode className={`swap-on fill-current w-6 h-6`} />
            <MdOutlineLightMode className={`swap-off fill-current w-6 h-6`} />
          </label>
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}

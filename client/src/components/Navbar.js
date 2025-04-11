import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="text-white font-bold font-mono text-lg">ToDo</div>
        <div>
          <ul className="flex text-sm font-semibold space-x-6 text-white">
            <li>
              <Link href="#" className="hover:text-green-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-green-400">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

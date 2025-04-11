// components/Footer.jsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-lg font-semibold mb-4 md:mb-0">
          ToDo Application © {new Date().getFullYear()}
        </div>

        <ul className="flex space-x-6 text-sm font-semibold">
          <li>
            <Link href="/" className="hover:text-green-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/profile" className="hover:text-green-400">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-green-400">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

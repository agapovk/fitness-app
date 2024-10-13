import Link from "next/link";
import { PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";

function Header() {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <Link href="/">
        <div className="flex items-center gap-3 hover:opacity-60">
          <Image
            src="/bw-ural.png"
            alt="Logo"
            width={28}
            height={28}
            className="h-auto w-auto"
          />
          <span className="text-2xl font-semibold">FitnessApp</span>
        </div>
      </Link>
      <Link href="/admin" className="rounded-full p-2 hover:bg-muted">
        <PersonIcon className="h-5 w-5" />
      </Link>
    </header>
  );
}

export default Header;

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import clsx from "clsx";

// interface Props {
//   href: string;
//   children: React.ReactNode;
// }

// function MyLink({ href, children }: Props) {
//   return (
//     <Link href={href}>
//       <a className="hover:underline">{children}</a>
//     </Link>
//   );
// }

const navigation = [
  { href: "/", name: "Home" },
  { href: "/about", name: "About" },
  { href: "/blog", name: "Blog" },
];

export function Header() {
  const router = useRouter();

  return (
    <header className="bg-slate-700 text-slate-50 p-6 flex justify-between">
      My header
      <nav className="flex gap-4">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href}>
            <a
              className={clsx(
                "hover:underline",
                item.href === router.asPath && "text-red-500 underline"
              )}
            >
              {item.name}
            </a>
          </Link>
        ))}
      </nav>
    </header>
  );
}

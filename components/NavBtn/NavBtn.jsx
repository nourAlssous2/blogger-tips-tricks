import Link from "../LinkElement/LinkElement";

export default function NavBtn({ href, children }) {
    return <Link href={href} className='p-2 rounded-md border border-white text-white transition hover:bg-white hover:text-sky-400'>{children}</Link>
}

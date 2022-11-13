import Image from "next/image";
import Link from "next/link";
import logo from "../public/disneyplus.png"

export const Navbar = ({ account }) => {
    return (
        <nav className="navbar">
            <Link href={"/"}>
                <Image
                    src={logo}
                    alt="Disney Logo"
                    width={120}
                    height={80}
                    priority={false}
                />
            </Link>
            <div className="navbar__account">
                <p>Welcome {account.username}</p>
                <img className="navbar__avatar" src={account.avatar.url} alt={account.username} />
            </div>
        </nav>
    )
}
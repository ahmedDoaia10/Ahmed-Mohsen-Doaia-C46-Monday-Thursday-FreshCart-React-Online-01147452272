"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import {
  Truck,
  Gift,
  Phone,
  Mail,
  User,
  LogOut,
  Search,
  Heart,
  CircleUser,
  ChevronDown,
  Menu,
  MapPin,
  Settings,
  Package,
  Headset,
  UserPlus,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { CartContext } from "@/provider/cart-provider";
import { WishlistContext } from "@/provider/wishlist-provider";

const categories = [
  { label: "All Categories", href: "/categories" },
  { label: "Electronics", href: "/products?category=6439d2d167d9aa4ca970649f" },
  {
    label: "Women's Fashion",
    href: "/products?category=6439d58a0049ad0b52b9003f",
  },
  {
    label: "Men's Fashion",
    href: "/products?category=6439d5b90049ad0b52b90048",
  },
  {
    label: "Beauty & Health",
    href: "/products?category=6439d40367d9aa4ca97064a8",
  },
];

const profileMenuItems = [
  {
    href: "/profile",
    label: "My Profile",
    icon: <User className="w-4 text-gray-400" />,
  },
  {
    href: "/orders",
    label: "My Orders",
    icon: <Package className="w-4 text-gray-400" />,
  },
  {
    href: "/wishlist",
    label: "My Wishlist",
    icon: <Heart className="w-4 text-gray-400" />,
  },
  {
    href: "/profile/addresses",
    label: "Addresses",
    icon: <MapPin className="w-4 text-gray-400" />,
  },
  {
    href: "/profile/settings",
    label: "Settings",
    icon: <Settings className="w-4 text-gray-400" />,
  },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const { noOfCartItems, Loading } = useContext(CartContext);
  const { noOfWishlistItems } = useContext(WishlistContext);
  console.log(noOfWishlistItems, "noOfWishlistItems in navbar");

  function handleLogout() {
    signOut({ callbackUrl: "/login" });
  }

  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block text-sm border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-10">
            <div className="flex items-center gap-6 text-gray-500">
              <span className="flex items-center gap-2">
                <Truck className="text-green-600 w-3.5 h-3.5" />
                <span>Free Shipping on Orders 500 EGP</span>
              </span>
              <span className="flex items-center gap-2">
                <Gift className="text-green-600 w-3.5 h-3.5" />
                <span>New Arrivals Daily</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-gray-500">
                <a
                  href="tel:+18001234567"
                  className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+1 (800) 123-4567</span>
                </a>
                <a
                  href="mailto:support@freshcart.com"
                  className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>support@freshcart.com</span>
                </a>
              </div>
              <span className="w-px h-4 bg-gray-200" />
              {/* Top bar auth - hidden while loading */}
              <div className="flex items-center gap-4 min-w-35 justify-end">
                {isLoading ? null : session ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>{session.user?.name}</span>
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="flex items-center gap-1.5 text-gray-600 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 bg-white ${scrolled ? "shadow-md" : "shadow-sm"} transition-shadow`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-18 gap-4 lg:gap-8">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src="/freshcart-logo.svg"
                alt="FreshCart"
                width={160}
                height={31}
                className="h-6 lg:h-8 w-auto"
              />
            </Link>

            {/* Search */}
            <div className="hidden lg:flex flex-1 max-w-2xl">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  className="w-full px-5 py-3 pr-12 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm"
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors cursor-pointer">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="hidden xl:flex items-center gap-6">
              <Link
                href="/"
                className={`font-medium transition-colors ${pathname === "/" ? "text-green-600" : "text-gray-700 hover:text-green-600"}`}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={`font-medium transition-colors ${pathname === "/products" ? "text-green-600" : "text-gray-700 hover:text-green-600"}`}
              >
                Shop
              </Link>

              <div className="relative group">
                <button className="flex items-center gap-1.5 text-gray-700 hover:text-green-600 font-medium transition-colors py-2 cursor-pointer">
                  Categories{" "}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2 min-w-50">
                    {categories.map((cat) => (
                      <Link
                        key={cat.label}
                        href={cat.href}
                        className="block px-4 py-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors text-[16px] font-medium"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/brands"
                className={`font-medium transition-colors ${pathname === "/brands" ? "text-green-600" : "text-gray-700 hover:text-green-600"}`}
              >
                Brands
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1 lg:gap-2">
              {/* Support */}
              <Link
                href="/contact"
                className="hidden lg:flex items-center gap-2 pr-3 mr-2 border-r border-gray-200 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <Headset className="text-green-600 w-4.5 h-4.5" />
                </div>
                <div className="text-xs">
                  <div className="text-gray-400">Support</div>
                  <div className="font-semibold text-gray-700 text-[12px]">
                    24/7 Help
                  </div>
                </div>
              </Link>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
                title="Wishlist"
              >
                <svg
                  data-prefix="far"
                  data-icon="heart"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                  width="25"
                  height="20"
                  className="transition-colors text-gray-500 group-hover:text-green-600"
                >
                  <path
                    fill="currentColor"
                    d="M378.9 80c-27.3 0-53 13.1-69 35.2l-34.4 47.6c-4.5 6.2-11.7 9.9-19.4 9.9s-14.9-3.7-19.4-9.9l-34.4-47.6c-16-22.1-41.7-35.2-69-35.2-47 0-85.1 38.1-85.1 85.1 0 49.9 32 98.4 68.1 142.3 41.1 50 91.4 94 125.9 120.3 3.2 2.4 7.9 4.2 14 4.2s10.8-1.8 14-4.2c34.5-26.3 84.8-70.4 125.9-120.3 36.2-43.9 68.1-92.4 68.1-142.3 0-47-38.1-85.1-85.1-85.1zM271 87.1c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 68.6-42.9 128.9-79.1 172.8-44.1 53.6-97.3 100.1-133.8 127.9-12.3 9.4-27.5 14.1-43.1 14.1s-30.8-4.7-43.1-14.1C176.4 438 123.2 391.5 79.1 338 42.9 294.1 0 233.7 0 165.1 0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1l15 20.7 15-20.7z"
                  />
                </svg>
                {session && noOfWishlistItems > 0 && (
                  <span className="absolute start-full bottom-full -translate-x-1/1 translate-y-1/1 size-4.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    {noOfWishlistItems}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
                title="Cart"
              >
                <svg
                  data-prefix="fas"
                  data-icon="cart-shopping"
                  viewBox="0 0 640 512"
                  aria-hidden="true"
                  width="25"
                  height="20"
                  className="transition-colors text-gray-500 group-hover:text-green-600"
                >
                  <path
                    fill="currentColor"
                    d="M24-16C10.7-16 0-5.3 0 8S10.7 32 24 32l45.3 0c3.9 0 7.2 2.8 7.9 6.6l52.1 286.3c6.2 34.2 36 59.1 70.8 59.1L456 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-255.9 0c-11.6 0-21.5-8.3-23.6-19.7l-5.1-28.3 303.6 0c30.8 0 57.2-21.9 62.9-52.2L568.9 69.9C572.6 50.2 557.5 32 537.4 32l-412.7 0-.4-2c-4.8-26.6-28-46-55.1-46L24-16zM208 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm224 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
                  />
                </svg>
                {session && (
                  <span className="absolute start-full bottom-full -translate-x-1/1 translate-y-1/1 size-4.5 rounded-full bg-green-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    {Loading ? (
                      <svg
                        className="animate-spin w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-40"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                    ) : (
                      noOfCartItems
                    )}
                  </span>
                )}
              </Link>

              {/* Profile / Sign In */}
              <div className="hidden lg:block relative" ref={profileRef}>
                {isLoading ? (
                  // Skeleton while loading
                  <div className="w-9 h-9 rounded-full bg-gray-100 animate-pulse" />
                ) : session ? (
                  <>
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="relative p-2.5 -mt-0.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                      title="Account"
                    >
                      <svg
                        data-prefix="far"
                        data-icon="circle-user"
                        viewBox="0 0 512 512"
                        aria-hidden="true"
                        width="25"
                        height="20"
                        className={`transition-colors ${profileOpen ? "text-green-600" : "text-gray-500"}`}
                      >
                        <path
                          fill="currentColor"
                          d="M406.5 399.6C387.4 352.9 341.5 320 288 320l-64 0c-53.5 0-99.4 32.9-118.5 79.6-35.6-37.3-57.5-87.9-57.5-143.6 0-114.9 93.1-208 208-208s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3l64 0c38.8 0 71.2 27.6 78.5 64.3zM256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z"
                        />
                      </svg>
                    </button>

                    {profileOpen && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl z-50">
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <CircleUser className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-800 truncate">
                                {session.user?.name}
                              </p>
                              <p className="text-xs text-gray-400 truncate">
                                {session.user?.email}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="py-2">
                          {profileMenuItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                            >
                              {item.icon}
                              {item.label}
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-gray-100 py-2">
                          <button
                            onClick={() => handleLogout()}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left cursor-pointer"
                          >
                            <LogOut className="w-4 text-red-500" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="hidden lg:flex items-center gap-2 ml-2 px-5 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors shadow-sm shadow-green-600/20"
                  >
                    <User className="w-4 h-4" />
                    Sign In
                  </Link>
                )}
              </div>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden ml-1 w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-medium"
            >
              Shop
            </Link>
            <Link
              href="/categories"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-medium"
            >
              Categories
            </Link>
            <Link
              href="/brands"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-medium"
            >
              Brands
            </Link>
            {isLoading ? null : session ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 font-medium"
                >
                  {session.user?.name}
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="text-left text-red-500 font-medium cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
}

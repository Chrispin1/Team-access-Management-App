"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { User } from "@/app/types";

interface HeaderProps {
  user: User | null;
}

const Header = ({ user }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user1 = true;

  const navigation = [
    { name: "Home", href: "/", show: true },
    { name: "Dashboard", href: "/dashboard", show: true },
  ].filter((item) => item.show);

  const pathName = usePathname();
  const getNavItemClass = (href: string) => {
    const isActive =
      href === "/" ? pathName === "/" : pathName.startsWith(href);
    return `px-4 py-1 rounded-lg font-medium transition-all duration-300 font-jost ${
      isActive
        ? "bg-primary text-white"
        : "text-gray-600 hover:bg-primary hover:text-white"
    }`;
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background shadow-md">
      {/* Top Header Bar */}
      <div className="w-full max-w-4xl mx-auto px-4 md:px-0 py-4">
        <div className="flex items-center justify-between">
          {/* logo */}
          <Link
            href="/"
            className="font-inter font-bold text-primary text-2xl md:text-3xl">
            RBAC
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={getNavItemClass(item.href)}>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}>
              {isMobileMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </Button>
          </div>

          {/* user info */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-2">
              {user1 ? (
                <>
                  <div className="flex items-center gap-2">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-primary text-sm font-medium font-jost">
                        CR
                      </span>
                    </div>
                    <div>
                      <Link href="/logout">
                        <Button
                          size="lg"
                          className="bg-primary text-white font-jost hover:cursor-pointer">
                          Logout
                        </Button>
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/register">
                    <Button className="text-sm font-medium font-jost hover:cursor-pointer">
                      Register
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="text-sm font-medium text-primary hover:cursor-pointer">
                      Login
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay & Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop overlay strictly below the header */}
          <div
            className="fixed inset-x-0 bottom-0 top-[65px] bg-black/30 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Floating Mobile Menu */}
          <nav className="md:hidden absolute top-full left-0 right-0 w-full bg-background border-b border-border shadow-xl px-4 py-4 z-50">
            <div className="max-w-4xl mx-auto flex flex-col gap-2">
              {navigation.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathName === "/"
                    : pathName.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-center border-b font-jost pointer-cursor pb-3 text-lg hover:text-primary transition-all duration-300 font-medium ${
                      isActive ? "text-primary font-semibold" : "text-gray-600"
                    }`}>
                    {item.name}
                  </Link>
                );
              })}

              {/* Mobile User Info & Auth Actions */}
              <div className="pt-3 flex flex-col items-center gap-3">
                {user ? (
                  <div className="w-full flex flex-col items-center gap-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-primary text-sm font-medium font-jost">
                          CK
                        </span>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-semibold font-jost text-foreground">
                          Chris
                        </span>
                        <span className="text-xs text-muted-foreground font-jost">
                          Logged in
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/logout"
                      className="w-full"
                      onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        size="lg"
                        className="w-full bg-primary text-white font-jost hover:cursor-pointer">
                        Logout
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="w-full flex flex-col gap-2">
                    <Link
                      href="/register"
                      className="w-full"
                      onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        size="lg"
                        className="w-full text-sm font-medium font-jost hover:cursor-pointer">
                        Register
                      </Button>
                    </Link>
                    <Link
                      href="/login"
                      className="w-full"
                      onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full text-sm font-medium text-primary hover:cursor-pointer">
                        Login
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;

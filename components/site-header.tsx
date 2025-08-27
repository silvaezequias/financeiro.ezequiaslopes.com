"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { garamond, jetmono } from "@/lib/fonts";
import brand from "@/lib/brand";

export default function SiteHeader() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  const links = isAuthenticated
    ? [
        { href: "/", label: "Início" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "/group", label: "Grupo" },
      ]
    : [
        { href: "/", label: "Início" },
        { href: "/login", label: "Entrar" },
      ];

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-900/60 bg-black/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group inline-flex items-baseline gap-4">
          <span
            className={`${garamond.className} text-xl font-semibold text-neutral-100`}
          >
            {brand.brandName}
          </span>
          <span
            className={`${jetmono.className} text-[10px] tracking-widest uppercase text-neutral-500 group-hover:text-amber-300 transition-colors`}
          >
            controle • economia
          </span>
        </Link>
        <nav
          aria-label="Primária"
          className="hidden md:flex items-center gap-8"
        >
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors relative ${
                  active
                    ? "text-amber-300"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-amber-300" />
                )}
              </Link>
            );
          })}

          {isAuthenticated && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-amber-300 text-black text-xs font-semibold">
                      {getInitials(user.name || "")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-neutral-900 border-neutral-950"
                align="end"
                forceMount
              >
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-neutral-200">{user.name}</p>
                    <p className="w-[200px] truncate text-sm text-neutral-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-neutral-700" />
                <DropdownMenuItem
                  asChild
                  className="text-neutral-200 hover:bg-neutral-800"
                >
                  <Link href="/dashboard">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-neutral-200 hover:bg-neutral-800"
                >
                  <Link href="/group">
                    <User className="mr-2 h-4 w-4" />
                    Grupo
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-neutral-700" />
                <DropdownMenuItem
                  className="text-neutral-200 hover:bg-neutral-800 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menu">
                <Menu className="h-5 w-5 text-neutral-300" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-neutral-900">
              <SheetHeader className="flex flex-row items-center justify-between">
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-amber-300 text-black hover:bg-amber-200 rounded-full"
                    aria-label="Fechar menu"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
              </SheetHeader>

              {isAuthenticated && user && (
                <div className="mt-6 p-4 bg-neutral-900/30 rounded-lg border border-neutral-800">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-amber-300 text-black text-sm font-semibold">
                        {getInitials(user.name || "")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-neutral-200">
                        {user.name}
                      </p>
                      <p className="text-sm text-neutral-400">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 grid gap-0">
                {links.map((l, index) => {
                  const active = pathname === l.href;
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`py-4 px-2 text-base transition-colors border-b border-neutral-900/60 ${
                        active
                          ? "text-amber-300 bg-amber-300/5"
                          : "text-neutral-300 hover:text-neutral-100 hover:bg-neutral-900/30"
                      } ${index === links.length - 1 ? "border-b-0" : ""}`}
                    >
                      {l.label}
                    </Link>
                  );
                })}

                {isAuthenticated && (
                  <>
                    <Link
                      href="/profile"
                      className="py-4 px-2 text-base transition-colors border-b border-neutral-900/60 text-neutral-300 hover:text-neutral-100 hover:bg-neutral-900/30"
                    >
                      Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="py-4 px-2 text-base transition-colors text-neutral-300 hover:text-neutral-100 hover:bg-neutral-900/30 text-left"
                    >
                      Sair <LogOut className="inline-block ml-2 h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

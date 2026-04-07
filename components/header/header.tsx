"use client";


import Link from "next/link";
import Logo from "./logo";
import { cn } from "@/lib/utils";
import NovoServicoModal from "../modals/NovoServicoModal";
import { Button } from "../ui/button";
import { LogOut, Plus, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Ordens", path: "/painel-principal" },
  { label: "Clientes", path: "/clientes" },
  { label: "Técnicos", path: "/tecnicos" },
  { label: "Orçamentos", path: "/orcamentos" },
  { label: "Configurações", path: "/configuracoes" },
];


const Header = () => {


  const router = useRouter();
  const pathname = usePathname();


  return (
    <header className="fixed top-0 w-full h-16 bg-white border-b border-slate-200 z-50 px-6">
      {/* Header Superior Fixo com Logo Operon */}
      <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link
            href="/painel-principal"
            className="shrink-0 hover:opacity-90 transition-opacity"
          >
            <Logo textSize="text-lg" iconSize={16} />
          </Link>

          <nav className="hidden lg:flex items-center gap-1 shrink-0">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "px-4 py-2 text-sm font-semibold rounded-md transition-colors",
                  pathname === item.path
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <NovoServicoModal>
            <Button className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs gap-2 hidden sm:flex">
              <Plus size={16} /> Nova Ordem
            </Button>
          </NovoServicoModal>

          <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block" />

          <DropdownMenu>
            <DropdownMenuContent align="end" className="w-56 mt-1">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push("/configuracoes")}
                className="gap-2 cursor-pointer"
              >
                <UserIcon size={14} /> Meu Perfil
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push("/login")}
                className="text-red-600 gap-2 cursor-pointer"
              >
                <LogOut size={14} /> Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;

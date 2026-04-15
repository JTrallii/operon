"use client";

import Link from "next/link";
import Logo from "./logo";
import { Button } from "../ui/button";
import {
  Bell,
  ChevronDown,
  ClipboardList,
  DollarSign,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  Wrench,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";

const navigation = [
  {
    name: "Ordens",
    href: "/painel-principal",
    icon: LayoutDashboard,
  },
  { name: "Clientes", href: "/clientes", icon: Users },
  { name: "Técnicos", href: "/tecnicos", icon: Wrench },
  {
    name: "Orçamentos",
    href: "/orcamentos",
    icon: FileText,
  },
  {
    name: "Serviços",
    href: "/servicos",
    icon: ClipboardList,
  },
  {
    name: "Financeiro",
    href: "/financeiro",
    icon: DollarSign,
  },
];

type Props = {
  usuario: {
    id: string;
    nome: string;
    role: string;
  } | null;
};

const Header = ({ usuario }: Props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className=" bg-slate-50 flex flex-col">
      <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <Logo textSize="text-lg md:text-xl" iconSize={20} />

          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <item.icon size={16} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-blue-600 relative hidden sm:flex"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </Button>

          <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden lg:block"></div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 md:gap-3 pl-2 pr-1 py-1 h-auto hover:bg-slate-50 rounded-full transition-all group"
              >
                <Avatar className="h-8 w-8 border-2 border-white shadow-sm group-hover:border-blue-100 transition-colors">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-blue-600 text-white text-[10px] font-black">
                    {usuario?.nome.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col items-start mr-1">
                  <span className="text-sm font-bold text-slate-900 leading-none">
                    {usuario?.nome}
                  </span>
                </div>
                <ChevronDown
                  size={14}
                  className="text-slate-400 group-hover:text-slate-600 transition-colors"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 mt-2 p-2 rounded-xl border-slate-200 shadow-xl"
            >
              <DropdownMenuLabel className="px-2 py-1.5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Minha Conta
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-100" />
              <DropdownMenuItem
                onClick={() => router.push("/configuracoes")}
                className="rounded-lg cursor-pointer py-2.5 font-bold text-slate-600 focus:bg-blue-50 focus:text-blue-600"
              >
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="rounded-lg cursor-pointer py-2.5 font-bold text-red-600 focus:bg-red-50 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair do Sistema
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 space-y-2 animate-in slide-in-from-top duration-300">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;

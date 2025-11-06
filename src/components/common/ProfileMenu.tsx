"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { translate } from "@/locales";
import { logout, useAuthUser } from "@/lib/auth-store";
import { getInitials } from "@/lib/ui/initials";
import { LogOut, Settings, PlusCircle, CalendarDays } from "lucide-react";

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const user = useAuthUser();
  const initials = getInitials(user);

  // Zamykanie po kliknięciu poza
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  // ESC zamyka
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={translate("aria.open_profile_menu")}
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      >
        {initials}
      </button>

      {open && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2"
        >
          {/* mobile-only nav links */}
          <div className="block md:hidden border-b border-gray-100">
            <Link
              href="/events"
              onClick={() => setOpen(false)}
              role="menuitem"
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              <CalendarDays className="h-4 w-4 text-gray-500" />
              {translate("nav.my_events")}
            </Link>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              role="menuitem"
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              <PlusCircle className="h-4 w-4 text-gray-500" />
              {translate("nav.create_new")}
            </Link>
          </div>

          <Link
            href="/account"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            <Settings className="h-4 w-4 text-gray-500" />
            {translate("menu.settings")}
          </Link>

          <button
            role="menuitem"
            onClick={handleLogout}
            className="cursor-pointer flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            <LogOut className="h-4 w-4 text-gray-500" />
            {translate("menu.logout")}
          </button>
        </div>
      )}
    </div>
  );
}

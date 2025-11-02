"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { translate } from "@/locales";
import { logout, useAuthUser } from "@/lib/auth-store";
import { getInitials } from "@/lib/ui/initials";

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const user = useAuthUser();
  const initials = getInitials(user);

  // zamykanie po kliknięciu poza
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
        className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {initials}
      </button>

      {open && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-black/5 bg-white shadow-lg ring-1 ring-black/5"
        >
          <Link
            href="/account"
            role="menuitem"
            className="block w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            {translate("menu.settings")}
          </Link>
          <button
            role="menuitem"
            onClick={handleLogout}
            className="cursor-pointer block w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            {translate("menu.logout")}
          </button>
        </div>
      )}
    </div>
  );
}

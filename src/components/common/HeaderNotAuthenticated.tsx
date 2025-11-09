import { AppLogo } from "./AppLogo";

export const HeaderNotAuthenticated = () => {
  return (
    <header className="w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <AppLogo />
        <nav aria-label="secondary" className="hidden sm:block">
          {/* Rezerwujemy miejsce np. na politykę, ale footer jest globalny -> nic tutaj */}
        </nav>
      </div>
    </header>
  );
};

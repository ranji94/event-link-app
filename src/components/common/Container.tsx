import * as React from "react";

type Props = React.PropsWithChildren<{ className?: string }>;

export function Container({ children, className = "" }: Props) {
  return (
    <div
      className={[
        // szerokość + responsywne marginesy boczne
        "mx-auto w-full max-w-screen-2xl",
        // większe guttery na dużych ekranach
        "px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ConfirmOptions = {
  title?: string;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  // opcjonalnie: ikonka, dodatkowe akcje itd.
};

type ConfirmContextValue = (options?: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = React.createContext<ConfirmContextValue | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [resolver, setResolver] = React.useState<
    ((value: boolean) => void) | null
  >(null);
  const [opts, setOpts] = React.useState<ConfirmOptions>({});

  const confirm = React.useCallback<ConfirmContextValue>((options) => {
    setOpts(options ?? {});
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  }, []);

  const handleClose = (value: boolean) => {
    setOpen(false);
    resolver?.(value);
    setResolver(null);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <Dialog open={open} onOpenChange={(v) => !v && handleClose(false)}>
        <DialogContent
          /* klasy dla klasycznego, wyśrodkowanego modala */
          className="
      sm:max-w-lg w-[min(92vw,640px)] rounded-2xl p-0
      focus:outline-none
    "
        >
          <div className="flex w-full flex-col">
            <DialogHeader className="px-6 py-4">
              <DialogTitle className="text-2xl">
                {opts.title ?? "Potwierdź akcję"}
              </DialogTitle>
              {opts.description ? (
                <DialogDescription className="mt-2 text-base">
                  {opts.description}
                </DialogDescription>
              ) : null}
            </DialogHeader>

            <div className="flex-1 overflow-auto px-6 pb-4" />

            <DialogFooter className="gap-2 px-6 py-4">
              <Button variant="outline" onClick={() => handleClose(false)}>
                {opts.cancelText ?? "Anuluj"}
              </Button>
              <Button
                variant={opts.danger ? "destructive" : "default"}
                onClick={() => handleClose(true)}
              >
                {opts.confirmText ?? "Potwierdź"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = React.useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used within ConfirmProvider");
  return ctx;
}

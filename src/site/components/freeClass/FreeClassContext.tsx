import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import FreeClassModal from "./FreeClassModal";

/**
 * Site-wide "Book a Free Class" popup: rendered once in the root layout, so the menu and the
 * footer can open it with `useFreeClass()()`. (The homepage keeps its own copy for its buttons.)
 */
const FreeClassContext = createContext<() => void>(() => {});

export function FreeClassProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openPopup = useCallback(() => setOpen(true), []);
  return (
    <FreeClassContext.Provider value={openPopup}>
      {children}
      <FreeClassModal open={open} onOpenChange={setOpen} />
    </FreeClassContext.Provider>
  );
}

/** Returns a function that opens the "Book a Free Class" popup. */
export const useFreeClass = () => useContext(FreeClassContext);

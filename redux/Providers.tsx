"use client";

import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "./store";

const StoreProvider = ({ children }: { children: ReactNode }) => {
const storeRef = useRef<AppStore | undefined>(undefined);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    // here we can give configuration to persist data even after page refresh
  }
  return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider;

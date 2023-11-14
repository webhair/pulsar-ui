"use client"

import { useRef } from "react";
import { StoreApi, UseBoundStore } from "zustand";

interface StoreInitializerProps<T> {
  readonly state: Partial<T>;
  readonly store: UseBoundStore<StoreApi<T>>;
}

export function StoreInitializer<T>(props: StoreInitializerProps<T>) {
  const initialized = useRef(false);

  if(!initialized.current) {
    props.store.setState(props.state);
    initialized.current = true;
  }

  return null;
}
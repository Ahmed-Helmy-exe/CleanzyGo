import { useState } from "react";

export interface AdminPricing {
  hourlyRate: number;
  cleaningMaterialsFee: number;
  serviceBasePrices: Record<string, number>;
  extraPrices: Record<string, number>;
}

export interface AdminContact {
  phone: string;
  email: string;
}

export interface AdminSettings {
  onlinePaymentEnabled: boolean;
}

// key format: "buildingId:date" to block whole day, "buildingId:date:time" for specific slot
let blockedSlots: Set<string> = new Set();

export function getBlockedSlots() {
  return blockedSlots;
}

export function toggleBlockedSlot(key: string) {
  if (blockedSlots.has(key)) {
    blockedSlots.delete(key);
  } else {
    blockedSlots.add(key);
  }
  blockedSlots = new Set(blockedSlots);
  notify();
}

export function isSlotBlocked(buildingId: string, date: string, time?: string): boolean {
  if (blockedSlots.has(`${buildingId}:${date}`)) return true;
  if (time && blockedSlots.has(`${buildingId}:${date}:${time}`)) return true;
  return false;
}

// Simple global store (replace with DB later)
let globalPricing: AdminPricing = {
  hourlyRate: 50,
  cleaningMaterialsFee: 30,
  serviceBasePrices: {
    room: 80,
    apartment: 200,
    deep: 350,
  },
  extraPrices: {
    laundry: 50,
    ironing: 40,
    sanitization: 60,
    kitchen: 70,
  },
};

let globalContact: AdminContact = {
  phone: "+971 50 123 4567",
  email: "info@cleanzygo.com",
};

let globalSettings: AdminSettings = {
  onlinePaymentEnabled: false,
};

let listeners: (() => void)[] = [];

function notify() {
  listeners.forEach((l) => l());
}

export function getAdminPricing() {
  return globalPricing;
}

export function setAdminPricing(p: AdminPricing) {
  globalPricing = { ...p };
  notify();
}

export function getAdminContact() {
  return globalContact;
}

export function setAdminContact(c: AdminContact) {
  globalContact = { ...c };
  notify();
}

export function getAdminSettings() {
  return globalSettings;
}

export function setAdminSettings(s: AdminSettings) {
  globalSettings = { ...s };
  notify();
}

export function useAdminStore() {
  const [, setTick] = useState(0);

  // Subscribe on mount — simplified reactive hook
  const subscribe = () => {
    const listener = () => setTick((t) => t + 1);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  return {
    pricing: globalPricing,
    contact: globalContact,
    settings: globalSettings,
    blockedSlots,
    setPricing: (p: AdminPricing) => { setAdminPricing(p); setTick((t) => t + 1); },
    setContact: (c: AdminContact) => { setAdminContact(c); setTick((t) => t + 1); },
    setSettings: (s: AdminSettings) => { setAdminSettings(s); setTick((t) => t + 1); },
    toggleBlock: (key: string) => { toggleBlockedSlot(key); setTick((t) => t + 1); },
    subscribe,
  };
}

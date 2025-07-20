"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSiteSettingsData } from '@/lib/firestoreService';
import type { SiteSettingsData } from '@/types/landingPageAdmin';
import { defaultSiteSettingsData } from '@/types/landingPageAdmin';

interface SiteSettingsContextType {
  siteSettings: SiteSettingsData;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData>(defaultSiteSettingsData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSiteSettings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const settings = await getSiteSettingsData();
      setSiteSettings(settings);
    } catch (err) {
      console.error("Error fetching site settings:", err);
      setError(err instanceof Error ? err.message : 'Failed to load site settings');
      setSiteSettings(defaultSiteSettingsData);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteSettings();
  }, []);

  const refetch = async () => {
    await fetchSiteSettings();
  };

  return (
    <SiteSettingsContext.Provider value={{ siteSettings, isLoading, error, refetch }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
} 
// src/components/ui/LanguageSwitcher.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LANGS = ['en', 'ro', 'ru'] as const;

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const cycleLanguage = () => {
    const current = i18n.language as typeof LANGS[number];
    const idx = LANGS.indexOf(current);
    const next = LANGS[(idx + 1) % LANGS.length];
    i18n.changeLanguage(next);
  };

  return (
    <div className="fixed right-4 top-1/4 z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={cycleLanguage}
        className="flex items-center gap-2 bg-white/80 backdrop-blur-md hover:bg-white"
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase text-xs">{i18n.language}</span>
      </Button>
    </div>
  );
}

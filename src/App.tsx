import { Button } from '@/components/ui/button';
import { SignatureForm } from '@/components/signature-form';
import { PreviewPanel } from '@/components/preview-panel';
import { useTranslation, type Language } from '@/lib/i18n';
import { useSignatureForm } from '@/hooks/use-signature-form';
import { useBrowserTheme } from '@/hooks/use-theme';
import { Languages } from 'lucide-react';
import { useState } from 'react';

const getBrowserLanguage = (): Language => {
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith('fr') ? 'fr' : 'en';
};

export default function App() {
  const [language, setLanguage] = useState<Language>(getBrowserLanguage());
  const { t } = useTranslation(language);
  const selectedTemplate = 'compactVertical';
  const { formData, updateField, handleInputChange } = useSignatureForm();
  useBrowserTheme(); // Apply browser theme

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-left md:text-center space-y-2 relative overflow-hidden">
          <div className="absolute right-0 top-0 flex items-center gap-2 z-10">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Languages className="h-4 w-4" />
              {language === 'en' ? 'FR' : 'EN'}
            </Button>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight pr-20 break-words">
            {t('title')}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base break-words">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <SignatureForm
            formData={formData}
            onChange={updateField}
            onInputChange={handleInputChange}
            t={t}
          />

          <PreviewPanel
            selectedTemplate={selectedTemplate}
            formData={formData}
            t={t}
          />
        </div>
      </div>
    </div>
  );
}

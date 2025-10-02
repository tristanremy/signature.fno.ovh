import { useState, useCallback } from 'react';
import type { SignatureData } from '@/lib/signature-templates';

const DEFAULT_FORM_DATA: SignatureData = {
  name: 'Elodie Remy',
  title: '',
  company: '',
  email: 'contact@gwarell.fr',
  phone: '06 06 06 06 06',
  website: 'www.gwarell.fr',
  logoUrl: 'https://www.gwarell.fr/gwarell-logo-light@2x.png',
  logoDarkUrl: 'https://www.gwarell.fr/gwarell-logo-dark@2x.png',
  textColor: '#005a70',
  textColorDark: '#d3f1f8',
  linkColor: '#007e9e',
  linkColorDark: '#54bfd9',
};

export function useSignatureForm() {
  const [formData, setFormData] = useState<SignatureData>(DEFAULT_FORM_DATA);

  const updateField = useCallback((field: keyof SignatureData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateField(e.target.name as keyof SignatureData, e.target.value);
    },
    [updateField]
  );

  return {
    formData,
    updateField,
    handleInputChange,
  };
}

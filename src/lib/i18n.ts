export type Language = 'en' | 'fr';

export const translations = {
  en: {
    title: 'Email Signature Builder',
    subtitle: 'Create professional email signatures with dark mode support',
    template: 'Template',
    information: 'Information',
    preview: 'Preview',
    colors: 'Colors',
    name: 'Name',
    title_field: 'Title',
    company: 'Company',
    email: 'Email',
    phone: 'Phone',
    website: 'Website',
    logoLight: 'Logo URL (Light)',
    logoDark: 'Logo URL (Dark)',
    text: 'Text',
    link: 'Link',
    textDark: 'Text (Dark)',
    linkDark: 'Link (Dark)',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    copy: 'Copy',
    html: 'HTML',
    copied: 'Copied!',
    copyTip: 'Use <strong>Copy</strong> to paste directly into email clients, or <strong>HTML</strong> for raw code.',

    // Template names
    'Minimal Pro': 'Minimal Pro',
    'Modern Gradient': 'Modern Gradient',
    'Compact Horizontal': 'Compact Horizontal',
    'Compact Vertical': 'Compact Vertical',
  },
  fr: {
    title: 'Générateur de Signature Email',
    subtitle: 'Créez des signatures email professionnelles avec support du mode sombre',
    template: 'Modèle',
    information: 'Informations',
    preview: 'Aperçu',
    colors: 'Couleurs',
    name: 'Nom',
    title_field: 'Titre',
    company: 'Entreprise',
    email: 'Email',
    phone: 'Téléphone',
    website: 'Site web',
    logoLight: 'URL du logo (Clair)',
    logoDark: 'URL du logo (Sombre)',
    text: 'Texte',
    link: 'Lien',
    textDark: 'Texte (Sombre)',
    linkDark: 'Lien (Sombre)',
    lightMode: 'Mode Clair',
    darkMode: 'Mode Sombre',
    copy: 'Copier',
    html: 'HTML',
    copied: 'Copié !',
    copyTip: 'Utilisez <strong>Copier</strong> pour coller directement dans les clients email, ou <strong>HTML</strong> pour le code brut.',

    // Template names
    'Minimal Pro': 'Minimaliste Pro',
    'Modern Gradient': 'Gradient Moderne',
    'Compact Horizontal': 'Compact Horizontal',
    'Compact Vertical': 'Compact Vertical',
  },
};

export function useTranslation(lang: Language) {
  return {
    t: (key: keyof typeof translations.en) => translations[lang][key],
    lang,
  };
}

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation, type Language } from '@/lib/i18n';
import {
  generatePreviewHTML,
  getContrastRatio,
  templates,
  type SignatureData,
} from '@/lib/signature-templates';
import { Copy, Download, Languages, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

const getBrowserLanguage = (): Language => {
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith('fr') ? 'fr' : 'en';
};

export default function App() {
  const [language, setLanguage] = useState<Language>(getBrowserLanguage());
  const { t } = useTranslation(language);
  const [selectedTemplate, setSelectedTemplate] = useState('compactVertical');
  const [darkMode, setDarkMode] = useState(false);
  const [appDarkMode, setAppDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedPlain, setCopiedPlain] = useState(false);

  const [formData, setFormData] = useState<SignatureData>({
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateHTML = () => {
    return templates[selectedTemplate].generate(formData);
  };

  const copyToClipboard = () => {
    const html = generateHTML();
    navigator.clipboard.writeText(html).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const copyAsRendered = async () => {
    try {
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = generatePreviewHTML(
        selectedTemplate,
        formData,
        false
      );
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      document.body.appendChild(tempContainer);

      const range = document.createRange();
      range.selectNodeContents(tempContainer);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);

      const html = tempContainer.innerHTML;
      const text = tempContainer.innerText;

      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([text], { type: 'text/plain' }),
        }),
      ]);

      document.body.removeChild(tempContainer);
      selection?.removeAllRanges();

      setCopiedPlain(true);
      setTimeout(() => setCopiedPlain(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      alert(
        'Copy failed. Please use "Copy HTML" and paste into your email client.'
      );
    }
  };

  const downloadHTML = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-signature.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const textContrastLight = getContrastRatio(formData.textColor, '#ffffff');
  const linkContrastLight = getContrastRatio(formData.linkColor, '#ffffff');
  const textContrastDark = getContrastRatio(formData.textColorDark, '#1a1a1a');
  const linkContrastDark = getContrastRatio(formData.linkColorDark, '#1a1a1a');

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  const toggleAppDarkMode = () => {
    setAppDarkMode(!appDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-left md:text-center space-y-2 relative overflow-hidden">
          <div className="absolute right-0 top-0 flex items-center gap-2 z-10">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAppDarkMode}
              className="flex items-center gap-2"
            >
              {appDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
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
          <Card>
            <CardHeader>
              <CardTitle>{t('information')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('name')}</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{t('title_field')}</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">{t('company')}</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone')}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">{t('website')}</Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logoUrl">{t('logoLight')}</Label>
                {formData.logoUrl && (
                  <div className="mb-2 p-3 border border-border rounded-lg bg-white flex items-center justify-center min-h-[80px]">
                    <img
                      src={formData.logoUrl}
                      alt="Logo preview"
                      width="90"
                      style={{ height: 'auto', maxWidth: '100%' }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <Input
                  id="logoUrl"
                  name="logoUrl"
                  type="url"
                  value={formData.logoUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logoDarkUrl">{t('logoDark')}</Label>
                {formData.logoDarkUrl && (
                  <div className="mb-2 p-3 border border-border rounded-lg bg-neutral-900 flex items-center justify-center min-h-[80px]">
                    <img
                      src={formData.logoDarkUrl}
                      alt="Dark logo preview"
                      width="90"
                      style={{ height: 'auto', maxWidth: '100%' }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <Input
                  id="logoDarkUrl"
                  name="logoDarkUrl"
                  type="url"
                  value={formData.logoDarkUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="pt-4 border-t border-border space-y-4">
                <Label>{t('colors')}</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="textColor" className="text-xs">
                      {t('text')}
                    </Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        id="textColor"
                        name="textColor"
                        value={formData.textColor}
                        onChange={handleChange}
                        className="size-9 rounded-md cursor-pointer p-0"
                      />
                      <Input
                        value={formData.textColor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            textColor: e.target.value,
                          })
                        }
                        className="flex-1 font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkColor" className="text-xs">
                      {t('link')}
                    </Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        id="linkColor"
                        name="linkColor"
                        value={formData.linkColor}
                        onChange={handleChange}
                        className="size-9 rounded-md cursor-pointer p-0"
                      />
                      <Input
                        value={formData.linkColor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            linkColor: e.target.value,
                          })
                        }
                        className="flex-1 font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="textColorDark" className="text-xs">
                      {t('textDark')}
                    </Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        id="textColorDark"
                        name="textColorDark"
                        value={formData.textColorDark}
                        onChange={handleChange}
                        className="size-9 rounded-md cursor-pointer p-0"
                      />
                      <Input
                        value={formData.textColorDark}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            textColorDark: e.target.value,
                          })
                        }
                        className="flex-1 font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkColorDark" className="text-xs">
                      {t('linkDark')}
                    </Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        id="linkColorDark"
                        name="linkColorDark"
                        value={formData.linkColorDark}
                        onChange={handleChange}
                        className="size-9 rounded-md cursor-pointer p-0"
                      />
                      <Input
                        value={formData.linkColorDark}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            linkColorDark: e.target.value,
                          })
                        }
                        className="flex-1 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                  <div className="space-y-1">
                    <div className="font-medium mb-1">{t('lightMode')}</div>
                    <div className="flex justify-between">
                      <span>{t('text')}:</span>
                      <span
                        className={
                          textContrastLight >= 4.5
                            ? 'text-green-600 font-medium'
                            : 'text-red-600 font-medium'
                        }
                      >
                        {textContrastLight.toFixed(1)}:1{' '}
                        {textContrastLight >= 4.5 ? '✓' : '✗'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('link')}:</span>
                      <span
                        className={
                          linkContrastLight >= 4.5
                            ? 'text-green-600 font-medium'
                            : 'text-red-600 font-medium'
                        }
                      >
                        {linkContrastLight.toFixed(1)}:1{' '}
                        {linkContrastLight >= 4.5 ? '✓' : '✗'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="font-medium mb-1">{t('darkMode')}</div>
                    <div className="flex justify-between">
                      <span>{t('text')}:</span>
                      <span
                        className={
                          textContrastDark >= 4.5
                            ? 'text-green-600 font-medium'
                            : 'text-red-600 font-medium'
                        }
                      >
                        {textContrastDark.toFixed(1)}:1{' '}
                        {textContrastDark >= 4.5 ? '✓' : '✗'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('link')}:</span>
                      <span
                        className={
                          linkContrastDark >= 4.5
                            ? 'text-green-600 font-medium'
                            : 'text-red-600 font-medium'
                        }
                      >
                        {linkContrastDark.toFixed(1)}:1{' '}
                        {linkContrastDark >= 4.5 ? '✓' : '✗'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('template')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(templates).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTemplate(key)}
                    className={`p-2 text-left rounded-lg border-2 transition-all ${
                      selectedTemplate === key
                        ? 'border-primary bg-card'
                        : 'border-border hover:border-muted-foreground bg-card'
                    }`}
                  >
                    <div className="font-medium text-xs">
                      {t(template.name as any)}
                    </div>
                  </button>
                ))}
              </div>

              <div className="border-t border-border pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{t('preview')}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    {darkMode ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div
                  className={`border rounded-lg p-6 min-h-[200px] transition-colors ${
                    darkMode
                      ? 'bg-neutral-950 border-neutral-700'
                      : 'bg-white border-border'
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: generatePreviewHTML(
                      selectedTemplate,
                      formData,
                      darkMode
                    ),
                  }}
                />

                <div className="flex gap-2">
                  <Button onClick={copyAsRendered} className="flex-1">
                    <Copy className="h-4 w-4" />
                    {copiedPlain ? t('copied') : t('copy')}
                  </Button>
                  <Button onClick={copyToClipboard} variant="outline">
                    <Copy className="h-4 w-4" />
                    {copied ? t('copied') : t('html')}
                  </Button>
                  <Button onClick={downloadHTML} variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <p
                  className="text-xs text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: t('copyTip') }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

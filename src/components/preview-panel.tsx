import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download, Moon, Sun } from 'lucide-react';
import {
  generatePreviewHTML,
  templates,
  type SignatureData,
} from '@/lib/signature-templates';
import type { TFunction } from '@/lib/i18n';

interface PreviewPanelProps {
  selectedTemplate: string;
  formData: SignatureData;
  onTemplateChange: (template: string) => void;
  t: TFunction;
}

export function PreviewPanel({
  selectedTemplate,
  formData,
  onTemplateChange,
  t,
}: PreviewPanelProps) {
  const [previewDarkMode, setPreviewDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedPlain, setCopiedPlain] = useState(false);

  const generateHTML = useCallback(() => {
    return templates[selectedTemplate].generate(formData);
  }, [selectedTemplate, formData]);

  const copyToClipboard = useCallback(async () => {
    const html = generateHTML();
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }, [generateHTML]);

  const copyAsRendered = useCallback(async () => {
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
  }, [selectedTemplate, formData]);

  const downloadHTML = useCallback(() => {
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
  }, [generateHTML]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preview')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewDarkMode(!previewDarkMode)}
          >
            {previewDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div
          className={`border rounded-lg p-6 min-h-[200px] transition-colors ${
            previewDarkMode
              ? 'bg-neutral-950 border-neutral-700'
              : 'bg-white border-border'
          }`}
          dangerouslySetInnerHTML={{
            __html: generatePreviewHTML(
              selectedTemplate,
              formData,
              previewDarkMode
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
      </CardContent>
    </Card>
  );
}

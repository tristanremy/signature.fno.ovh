import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ColorPicker } from '@/components/color-picker';
import { getContrastRatio, type SignatureData } from '@/lib/signature-templates';
import type { TFunction } from '@/lib/i18n';

interface SignatureFormProps {
  formData: SignatureData;
  onChange: (field: keyof SignatureData, value: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  t: TFunction;
}

export function SignatureForm({
  formData,
  onChange,
  onInputChange,
  t,
}: SignatureFormProps) {
  const textContrastLight = getContrastRatio(formData.textColor, '#ffffff');
  const linkContrastLight = getContrastRatio(formData.linkColor, '#ffffff');
  const textContrastDark = getContrastRatio(formData.textColorDark, '#1a1a1a');
  const linkContrastDark = getContrastRatio(formData.linkColorDark, '#1a1a1a');

  return (
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
            onChange={onInputChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t('title_field')}</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={onInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">{t('company')}</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={onInputChange}
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
            onChange={onInputChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">{t('phone')}</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">{t('website')}</Label>
            <Input
              id="website"
              name="website"
              value={formData.website}
              onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
          />
        </div>

        <div className="pt-4 border-t border-border space-y-4">
          <Label>{t('colors')}</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ColorPicker
              id="textColor"
              label={t('text')}
              value={formData.textColor}
              onChange={(value) => onChange('textColor', value)}
            />

            <ColorPicker
              id="linkColor"
              label={t('link')}
              value={formData.linkColor}
              onChange={(value) => onChange('linkColor', value)}
            />

            <ColorPicker
              id="textColorDark"
              label={t('textDark')}
              value={formData.textColorDark}
              onChange={(value) => onChange('textColorDark', value)}
            />

            <ColorPicker
              id="linkColorDark"
              label={t('linkDark')}
              value={formData.linkColorDark}
              onChange={(value) => onChange('linkColorDark', value)}
            />
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
  );
}

# Email Signature Builder

A minimalistic email signature builder with dark mode support, built with Vite, React, TypeScript, and shadcn/ui.

## Features

- 5 professional signature templates
- Dark mode support with separate colors for light/dark themes
- Logo support with automatic image swapping for dark mode
- WCAG AA accessibility compliance with contrast checking
- Copy signature directly to clipboard or download as HTML
- Mobile responsive designs

## Templates

1. **Minimal Pro** - Clean & accessible, WCAG AA compliant
2. **Professional Plus** - Logo support with image swapping for dark mode
3. **Modern Gradient** - Bold design with adaptive gradient separator
4. **Compact Horizontal** - Logo on left, info on right - space-efficient
5. **Compact Vertical** - Stacked layout - logo on top

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Tech Stack

- **Vite** - Fast build tool
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **lucide-react** - Icons

## Usage

1. Select a template
2. Fill in your information
3. Customize colors for light and dark modes
4. Preview the signature in both modes
5. Copy directly to clipboard or download as HTML
6. Paste into your email client's signature settings

## Email Client Support

- ✅ Apple Mail (iOS/macOS) - Full dark mode support
- ✅ Outlook.com - Dark mode via [data-ogsc]
- ✅ Outlook app (iOS/Android) - Full dark mode support
- ⚠️ Gmail - UI only (follows OS settings)
- ⚠️ Yahoo Mail - Limited support

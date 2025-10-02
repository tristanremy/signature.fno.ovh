import {
  CheckCircle,
  Copy,
  Download,
  Info,
  Moon,
  Palette,
  Sun,
} from 'lucide-react';
import { useState } from 'react';

// Advanced signature templates with separate light/dark mode colors
const templates = {
  minimal: {
    name: 'Minimal Pro',
    description: 'Clean & accessible, WCAG AA compliant',
    generate: (data) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    :root { color-scheme: light dark; supported-color-schemes: light dark; }
    @media (prefers-color-scheme: dark) {
      .dark-text { color: ${data.textColorDark} !important; }
      .dark-link { color: ${data.linkColorDark} !important; }
    }
    [data-ogsc] .dark-text { color: ${data.textColorDark} !important; }
    [data-ogsc] .dark-link { color: ${data.linkColorDark} !important; }
  </style>
</head>
<body>
<table role="presentation" style="font-family: Arial, sans-serif; font-size: 14px; color: ${
      data.textColor
    }; line-height: 1.5; border-collapse: collapse;">
  <tr>
    <td style="padding: 0;">
      <div style="font-weight: bold; font-size: 16px; margin-bottom: 4px; color: ${
        data.textColor
      };" class="dark-text">${data.name}</div>
      ${
        data.title
          ? `<div style="color: ${data.textColor}; margin-bottom: 2px;" class="dark-text">${data.title}</div>`
          : ''
      }
      ${
        !data.logoUrl && data.company
          ? `<div style="color: ${data.textColor}; margin-bottom: 10px;" class="dark-text">${data.company}</div>`
          : ''
      }
      <div style="margin-bottom: 4px;">
        <a href="mailto:${data.email}" style="color: ${
      data.linkColor
    }; text-decoration: underline;" class="dark-link" aria-label="Email ${
      data.name
    }">${data.email}</a>
      </div>
      ${
        data.phone
          ? `<div><a href="tel:${data.phone.replace(
              /\s/g,
              ''
            )}" style="color: ${
              data.linkColor
            }; text-decoration: underline;" class="dark-link" aria-label="Call ${
              data.name
            }">${data.phone}</a></div>`
          : ''
      }
    </td>
  </tr>
</table>
</body>
</html>`,
  },

  professional: {
    name: 'Professional Plus',
    description: 'Logo support with image swapping for dark mode',
    generate: (data) => `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    :root { color-scheme: light dark; supported-color-schemes: light dark; }
    @media (prefers-color-scheme: dark) {
      .dark-text { color: ${data.textColorDark} !important; }
      .dark-link { color: ${data.linkColorDark} !important; }
      .dark-img { display: block !important; max-height: inherit !important; visibility: inherit !important; }
      .light-img { display: none !important; }
      .logo-shadow { filter: drop-shadow(0px 0px 6px rgba(255,255,255,0.5)); }
    }
    [data-ogsc] .dark-text { color: ${data.textColorDark} !important; }
    [data-ogsc] .dark-link { color: ${data.linkColorDark} !important; }
    [data-ogsc] .dark-img { display: block !important; visibility: inherit !important; }
    [data-ogsc] .light-img { display: none !important; }
  </style>
</head>
<body>
<table role="presentation" style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; color: ${
      data.textColor
    }; border-collapse: collapse;">
  <tr>
    ${
      data.logoUrl
        ? `<td style="padding-right: 20px; vertical-align: top;">
      <img class="light-img logo-shadow" src="${data.logoUrl}" alt="${
            data.company
          } logo" width="120" style="display: block; border: 0; max-width: 120px; height: auto;">
      <!--[if !mso]><!-->
      <div class="dark-img" style="display: none; overflow: hidden; max-height: 0px;">
        <img src="${data.logoDarkUrl || data.logoUrl}" alt="${
            data.company
          } logo" width="120" style="display: block; border: 0; max-width: 120px; height: auto;">
      </div>
      <!--<![endif]-->
    </td>`
        : ''
    }
    <td style="vertical-align: top;">
      <div style="font-weight: bold; font-size: 17px; margin-bottom: 4px; color: ${
        data.textColor
      };" class="dark-text">${data.name}</div>
      ${
        data.title
          ? `<div style="font-size: 13px; color: ${data.textColor}; margin-bottom: 2px;" class="dark-text">${data.title}</div>`
          : ''
      }
      ${
        !data.logoUrl && data.company
          ? `<div style="font-size: 13px; color: ${data.textColor}; margin-bottom: 12px; font-weight: 600;" class="dark-text">${data.company}</div>`
          : ''
      }
      ${
        data.logoUrl && data.company
          ? '<div style="margin-bottom: 12px;"></div>'
          : ''
      }
      <div style="margin-bottom: 4px;">
        <span style="color: ${
          data.textColor
        };" class="dark-text" aria-hidden="true">📧</span> <a href="mailto:${
      data.email
    }" style="color: ${
      data.linkColor
    }; text-decoration: underline;" class="dark-link" aria-label="Email ${
      data.name
    }">${data.email}</a>
      </div>
      ${
        data.phone
          ? `<div style="margin-bottom: 4px;"><span style="color: ${
              data.textColor
            };" class="dark-text" aria-hidden="true">📞</span> <a href="tel:${data.phone.replace(
              /\s/g,
              ''
            )}" style="color: ${
              data.linkColor
            }; text-decoration: underline;" class="dark-link" aria-label="Call ${
              data.name
            }">${data.phone}</a></div>`
          : ''
      }
      ${
        data.website
          ? `<div style="margin-bottom: 4px;"><span style="color: ${data.textColor};" class="dark-text" aria-hidden="true">🌐</span> <a href="https://${data.website}" style="color: ${data.linkColor}; text-decoration: underline;" class="dark-link" aria-label="Visit website">${data.website}</a></div>`
          : ''
      }
    </td>
  </tr>
</table>
</body>
</html>`,
  },

  modern: {
    name: 'Modern Gradient',
    description: 'Bold design with adaptive gradient separator',
    generate: (data) => {
      // Build the title/company line with conditional separators
      let titleCompanyLine = '';
      if (data.title && data.company && !data.logoUrl) {
        titleCompanyLine = `${data.title} · ${data.company}`;
      } else if (data.title && !data.company) {
        titleCompanyLine = data.title;
      } else if (!data.title && data.company && !data.logoUrl) {
        titleCompanyLine = data.company;
      } else if (data.title && data.logoUrl) {
        titleCompanyLine = data.title;
      }

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    :root { color-scheme: light dark; supported-color-schemes: light dark; }
    @media (prefers-color-scheme: dark) {
      .dark-text { color: ${data.textColorDark} !important; }
      .dark-link { color: ${data.linkColorDark} !important; }
      .gradient-line { background: linear-gradient(90deg, ${
        data.linkColorDark
      } 0%, transparent 100%) !important; }
    }
    [data-ogsc] .dark-text { color: ${data.textColorDark} !important; }
    [data-ogsc] .dark-link { color: ${data.linkColorDark} !important; }
    [data-ogsc] .gradient-line { background: linear-gradient(90deg, ${
      data.linkColorDark
    } 0%, transparent 100%) !important; }
  </style>
</head>
<body>
<table role="presentation" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; color: ${
        data.textColor
      }; border-collapse: collapse;">
  <tr>
    <td style="padding: 0;">
      <div style="font-weight: 700; font-size: 18px; margin-bottom: 2px; letter-spacing: -0.5px; color: ${
        data.textColor
      };" class="dark-text">${data.name}</div>
      ${
        titleCompanyLine
          ? `<div style="color: ${data.textColor}; font-size: 13px; margin-bottom: 1px;" class="dark-text">${titleCompanyLine}</div>`
          : ''
      }
      <div class="gradient-line" style="height: 2px; background: linear-gradient(90deg, ${
        data.linkColor
      } 0%, transparent 100%); width: 60px; margin: 12px 0;"></div>
      <div style="font-size: 13px; line-height: 1.8;">
        <div><a href="mailto:${data.email}" style="color: ${
        data.linkColor
      }; text-decoration: underline;" class="dark-link" aria-label="Email ${
        data.name
      }">${data.email}</a></div>
        ${
          data.phone
            ? `<div><a href="tel:${data.phone.replace(
                /\s/g,
                ''
              )}" style="color: ${
                data.linkColor
              }; text-decoration: underline;" class="dark-link" aria-label="Call ${
                data.name
              }">${data.phone}</a></div>`
            : ''
        }
        ${
          data.website
            ? `<div><a href="https://${data.website}" style="color: ${data.linkColor}; text-decoration: underline;" class="dark-link" aria-label="Visit website">${data.website}</a></div>`
            : ''
        }
      </div>
    </td>
  </tr>
</table>
</body>
</html>`;
    },
  },

  compact: {
    name: 'Compact Horizontal',
    description: 'Logo on left, info on right - space-efficient',
    generate: (data) => {
      // Build the title/company line with conditional separators
      let titleCompanyLine = [];
      if (data.title) titleCompanyLine.push(data.title);
      if (!data.logoUrl && data.company) titleCompanyLine.push(data.company);
      const titleCompanyText =
        titleCompanyLine.length > 0 ? ` · ${titleCompanyLine.join(' · ')}` : '';

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    :root { color-scheme: light dark; supported-color-schemes: light dark; }
    @media (prefers-color-scheme: dark) {
      .dark-text { color: ${data.textColorDark} !important; }
      .dark-link { color: ${data.linkColorDark} !important; }
      .dark-img { display: block !important; max-height: inherit !important; visibility: inherit !important; }
      .light-img { display: none !important; }
    }
    [data-ogsc] .dark-text { color: ${data.textColorDark} !important; }
    [data-ogsc] .dark-link { color: ${data.linkColorDark} !important; }
    @media only screen and (max-width: 480px) {
      .mobile-stack { display: block !important; }
      .mobile-logo { margin-bottom: 12px !important; }
    }
  </style>
</head>
<body>
<table role="presentation" style="font-family: Arial, sans-serif; font-size: 13px; color: ${
        data.textColor
      }; border-collapse: collapse;">
  <tr>
    ${
      data.logoUrl
        ? `<td class="mobile-stack mobile-logo" style="padding-right: 15px; vertical-align: middle;">
      <img class="light-img" src="${data.logoUrl}" alt="${
            data.company
          } logo" width="80" style="display: block; border: 0; max-width: 80px; height: auto;">
      <!--[if !mso]><!-->
      <div class="dark-img" style="display: none; overflow: hidden; max-height: 0px;">
        <img src="${data.logoDarkUrl || data.logoUrl}" alt="${
            data.company
          } logo" width="80" style="display: block; border: 0; max-width: 80px; height: auto;">
      </div>
      <!--<![endif]-->
    </td>`
        : ''
    }
    <td class="mobile-stack" style="vertical-align: middle;">
      <div style="margin-bottom: 3px;">
        <span style="font-weight: bold; font-size: 14px; color: ${
          data.textColor
        };" class="dark-text">${data.name}</span>
        ${
          titleCompanyText
            ? `<span style="color: ${data.textColor};" class="dark-text">${titleCompanyText}</span>`
            : ''
        }
      </div>
      <div>
        <a href="mailto:${data.email}" style="color: ${
        data.linkColor
      }; text-decoration: underline;" class="dark-link" aria-label="Email ${
        data.name
      }">${data.email}</a>
        ${
          data.phone
            ? ` · <a href="tel:${data.phone.replace(
                /\s/g,
                ''
              )}" style="color: ${
                data.linkColor
              }; text-decoration: underline;" class="dark-link" aria-label="Call ${
                data.name
              }">${data.phone}</a>`
            : ''
        }
        ${
          data.website
            ? ` · <a href="https://${data.website}" style="color: ${data.linkColor}; text-decoration: underline;" class="dark-link" aria-label="Visit website">${data.website}</a>`
            : ''
        }
      </div>
    </td>
  </tr>
</table>
</body>
</html>`;
    },
  },

  compactVertical: {
    name: 'Compact Vertical',
    description: 'Stacked layout - logo on top',
    generate: (data) => {
      // Build the title/company line with conditional separators
      let titleCompanyLine = [];
      if (data.title) titleCompanyLine.push(data.title);
      if (!data.logoUrl && data.company) titleCompanyLine.push(data.company);
      const titleCompanyText =
        titleCompanyLine.length > 0 ? ` · ${titleCompanyLine.join(' · ')}` : '';

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    :root { color-scheme: light dark; supported-color-schemes: light dark; }
    @media (prefers-color-scheme: dark) {
      .dark-text { color: ${data.textColorDark} !important; }
      .dark-link { color: ${data.linkColorDark} !important; }
      .dark-img { display: block !important; max-height: inherit !important; visibility: inherit !important; }
      .light-img { display: none !important; }
    }
    [data-ogsc] .dark-text { color: ${data.textColorDark} !important; }
    [data-ogsc] .dark-link { color: ${data.linkColorDark} !important; }
    @media only screen and (max-width: 480px) {
      .mobile-block { display: block !important; margin-bottom: 4px !important; }
    }
  </style>
</head>
<body>
<table role="presentation" style="font-family: Arial, sans-serif; font-size: 13px; color: ${
        data.textColor
      }; border-collapse: collapse;">
  <tr>
    <td style="padding: 0;">
      ${
        data.logoUrl
          ? `<img class="light-img" src="${data.logoUrl}" alt="${
              data.company
            } logo" width="90" style="display: block; margin-bottom: 12px; border: 0; max-width: 90px; height: auto;">
      <!--[if !mso]><!-->
      <div class="dark-img" style="display: none; overflow: hidden; max-height: 0px;">
        <img src="${data.logoDarkUrl || data.logoUrl}" alt="${
              data.company
            } logo" width="90" style="display: block; border: 0; max-width: 90px; height: auto;">
      </div>
      <!--<![endif]-->`
          : ''
      }
      <div style="margin-bottom: 3px;" class="mobile-block">
        <span style="font-weight: bold; font-size: 14px; color: ${
          data.textColor
        };" class="dark-text">${data.name}</span>
        ${
          titleCompanyText
            ? `<span style="color: ${data.textColor};" class="dark-text">${titleCompanyText}</span>`
            : ''
        }
      </div>
      <div>
        <a href="mailto:${data.email}" style="color: ${
        data.linkColor
      }; text-decoration: underline;" class="dark-link mobile-block" aria-label="Email ${
        data.name
      }">${data.email}</a>
        ${
          data.phone
            ? ` <span class="mobile-block" style="display: inline;">· <a href="tel:${data.phone.replace(
                /\s/g,
                ''
              )}" style="color: ${
                data.linkColor
              }; text-decoration: underline;" class="dark-link" aria-label="Call ${
                data.name
              }">${data.phone}</a></span>`
            : ''
        }
        ${
          data.website
            ? ` <span class="mobile-block" style="display: inline;">· <a href="https://${data.website}" style="color: ${data.linkColor}; text-decoration: underline;" class="dark-link" aria-label="Visit website">${data.website}</a></span>`
            : ''
        }
      </div>
    </td>
  </tr>
</table>
</body>
</html>`;
    },
  },
};

export default function EmailSignatureBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState('compact');
  const [formData, setFormData] = useState({
    name: 'Elodie Remy',
    title: '',
    company: 'Gwarell',
    email: 'contact@gwarell.fr',
    phone: '06 06 06 06 06',
    website: 'www.gwarell.fr',
    logoUrl: 'https://www.gwarell.fr/gwarell-logo-light@2x.png',
    logoDarkUrl: 'https://www.gwarell.fr/gwarell-logo-dark@2x.png',
    textColor: '#002C37',
    textColorDark: '#FFFFFF',
    linkColor: '#0086A7',
    linkColorDark: '#0086A7',
  });

  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedPlain, setCopiedPlain] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showColorMode, setShowColorMode] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateHTML = () => {
    return templates[selectedTemplate].generate(formData);
  };

  const generatePreviewHTML = () => {
    let html = templates[selectedTemplate].generate(formData);

    // If dark mode is active in preview, inject inline styles to simulate it
    if (darkMode) {
      // Replace color values with dark mode equivalents
      html = html.replace(
        new RegExp(`color: ${formData.textColor}`, 'g'),
        `color: ${formData.textColorDark}`
      );
      html = html.replace(
        new RegExp(`color: ${formData.linkColor}`, 'g'),
        `color: ${formData.linkColorDark}`
      );

      // Handle gradient replacements for modern template
      html = html.replace(
        new RegExp(
          `linear-gradient\\(90deg, ${formData.linkColor.replace(
            '#',
            '\\#'
          )} 0%, transparent 100%\\)`,
          'g'
        ),
        `linear-gradient(90deg, ${formData.linkColorDark} 0%, transparent 100%)`
      );

      // Show dark logo, hide light logo - fix the display logic
      html = html.replace(
        /class="light-img logo-shadow"/g,
        'class="light-img logo-shadow" style="display:none !important;"'
      );
      html = html.replace(
        /class="light-img"/g,
        'class="light-img" style="display:none !important;"'
      );
      html = html.replace(
        /style="display: none; overflow: hidden; max-height: 0px;"/g,
        'style="display: block; overflow: visible; max-height: none;"'
      );
      html = html.replace(
        /style="display: block; border: 0;"/g,
        'style="display: block; border: 0; max-width: 100%;"'
      );
    }

    return html;
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
      // Create a temporary container
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = generatePreviewHTML();
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      document.body.appendChild(tempContainer);

      // Select the content
      const range = document.createRange();
      range.selectNodeContents(tempContainer);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      // Copy to clipboard using the modern Clipboard API with HTML
      const html = tempContainer.innerHTML;
      const text = tempContainer.innerText;

      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([text], { type: 'text/plain' }),
        }),
      ]);

      // Clean up
      document.body.removeChild(tempContainer);
      selection.removeAllRanges();

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

  // Calculate contrast ratio for accessibility
  const getContrastRatio = (color1, color2) => {
    const getLuminance = (hex) => {
      const rgb = parseInt(hex.slice(1), 16);
      const r = ((rgb >> 16) & 0xff) / 255;
      const g = ((rgb >> 8) & 0xff) / 255;
      const b = (rgb & 0xff) / 255;
      const [rs, gs, bs] = [r, g, b].map((c) =>
        c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
      );
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };

  const textContrastLight = getContrastRatio(formData.textColor, '#ffffff');
  const textContrastDark = getContrastRatio(formData.textColorDark, '#1a1a1a');
  const linkContrastLight = getContrastRatio(formData.linkColor, '#ffffff');
  const linkContrastDark = getContrastRatio(formData.linkColorDark, '#1a1a1a');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-2">
                Email Signature Builder 2025
              </h1>
              <p className="text-neutral-600">
                Professional templates with adaptive colors for light/dark modes
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 px-4 py-2 rounded-lg self-start">
              <Palette size={16} />
              <span>Dual Mode Colors</span>
            </div>
          </div>

          {/* Template Selection */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-neutral-700 mb-3">
              Choose Your Template
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(templates).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTemplate(key)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedTemplate === key
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-neutral-200 hover:border-blue-300 bg-white'
                  }`}
                >
                  <div className="font-semibold text-neutral-800 mb-1">
                    {template.name}
                  </div>
                  <div className="text-xs text-neutral-600">
                    {template.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2025 Features Info */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
            <h3 className="font-semibold text-indigo-900 mb-2 text-sm">
              ✨ 2025 Features Included:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-indigo-800">
              <div>• Separate colors for light/dark modes</div>
              <div>• @media (prefers-color-scheme) support</div>
              <div>• [data-ogsc] Outlook.com targeting</div>
              <div>• Dual logo support (light + dark versions)</div>
              <div>• WCAG AA/AAA accessibility checks</div>
              <div>• Mobile-responsive breakpoints</div>
              <div>• Image swapping for dark mode</div>
              <div>• CSS filter drop-shadows for visibility</div>
              <div>• Under 100KB optimized file size</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-semibold text-neutral-700 mb-6">
              Your Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 555 123 4567"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="www.example.com"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Light Mode Logo URL
                  <span className="text-xs text-neutral-500 ml-2">
                    (transparent PNG recommended)
                  </span>
                </label>

                <input
                  type="url"
                  name="logoUrl"
                  value={formData.logoUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/logo-dark.png"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Dark Mode Logo URL
                  <span className="text-xs text-neutral-500 ml-2">
                    (optional, uses light version if empty)
                  </span>
                </label>
                <input
                  type="url"
                  name="logoDarkUrl"
                  value={formData.logoDarkUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/logo-light.png"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Color Mode Settings - Collapsible */}
              <button
                onClick={() => setShowColorMode(!showColorMode)}
                className="w-full text-left px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Palette size={18} className="text-purple-600" />
                    <span className="text-sm font-semibold text-purple-900">
                      Light/Dark Mode Colors
                    </span>
                  </div>
                  <span className="text-xs text-purple-600">
                    {showColorMode ? '▼ Hide' : '▶ Show'}
                  </span>
                </div>
              </button>

              {showColorMode && (
                <div className="space-y-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg">
                  <p className="text-xs text-purple-800 mb-3">
                    Set different colors for light and dark modes. Dark mode
                    colors activate when users have dark mode enabled.
                  </p>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white p-3 rounded-lg">
                      <h4 className="text-xs font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                        <Sun size={14} /> Light Mode Colors
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-neutral-700 mb-1">
                            Text Color
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              name="textColor"
                              value={formData.textColor}
                              onChange={handleChange}
                              className="w-10 h-10 border border-neutral-300 rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={formData.textColor}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  textColor: e.target.value,
                                })
                              }
                              className="flex-1 px-2 py-1 border border-neutral-300 rounded text-xs font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-neutral-700 mb-1">
                            Link Color
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              name="linkColor"
                              value={formData.linkColor}
                              onChange={handleChange}
                              className="w-10 h-10 border border-neutral-300 rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={formData.linkColor}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  linkColor: e.target.value,
                                })
                              }
                              className="flex-1 px-2 py-1 border border-neutral-300 rounded text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-neutral-800 p-3 rounded-lg">
                      <h4 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
                        <Moon size={14} /> Dark Mode Colors
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-neutral-200 mb-1">
                            Text Color
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              name="textColorDark"
                              value={formData.textColorDark}
                              onChange={handleChange}
                              className="w-10 h-10 border border-neutral-600 rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={formData.textColorDark}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  textColorDark: e.target.value,
                                })
                              }
                              className="flex-1 px-2 py-1 bg-neutral-700 border border-neutral-600 rounded text-xs font-mono text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-neutral-200 mb-1">
                            Link Color
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              name="linkColorDark"
                              value={formData.linkColorDark}
                              onChange={handleChange}
                              className="w-10 h-10 border border-neutral-600 rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={formData.linkColorDark}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  linkColorDark: e.target.value,
                                })
                              }
                              className="flex-1 px-2 py-1 bg-neutral-700 border border-neutral-600 rounded text-xs font-mono text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-800">
                    <strong>💡 Recommendations:</strong>
                    <ul className="mt-1 space-y-1 ml-4 list-disc">
                      <li>
                        Light mode: Use #333333 for text, #1A73E8 for links
                      </li>
                      <li>
                        Dark mode: Use #f5f5f5 for text, #91ADD4 for links
                      </li>
                      <li>Avoid pure black (#000) and pure white (#fff)</li>
                      <li>Ensure 4.5:1 contrast ratio minimum (7:1 ideal)</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Accessibility Check */}
              <button
                onClick={() => setShowAccessibility(!showAccessibility)}
                className="w-full text-left px-4 py-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">
                    🔍 Accessibility Check
                  </span>
                  <span className="text-xs text-neutral-500">
                    {showAccessibility ? '▼' : '▶'}
                  </span>
                </div>
              </button>

              {showAccessibility && (
                <div className="p-4 bg-neutral-50 rounded-lg space-y-3 text-xs">
                  <div className="bg-white p-3 rounded border border-neutral-200">
                    <div className="font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                      <Sun size={14} /> Light Mode Contrast
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Text on white:</span>
                        <span
                          className={`font-semibold ${
                            textContrastLight >= 4.5
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {textContrastLight.toFixed(2)}:1{' '}
                          {textContrastLight >= 7
                            ? '(AAA ✓)'
                            : textContrastLight >= 4.5
                            ? '(AA ✓)'
                            : '(Fail ✗)'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Links on white:</span>
                        <span
                          className={`font-semibold ${
                            linkContrastLight >= 4.5
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {linkContrastLight.toFixed(2)}:1{' '}
                          {linkContrastLight >= 7
                            ? '(AAA ✓)'
                            : linkContrastLight >= 4.5
                            ? '(AA ✓)'
                            : '(Fail ✗)'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800 p-3 rounded border border-neutral-600">
                    <div className="font-semibold text-white mb-2 flex items-center gap-2">
                      <Moon size={14} /> Dark Mode Contrast
                    </div>
                    <div className="space-y-2 text-neutral-200">
                      <div className="flex items-center justify-between">
                        <span>Text on dark:</span>
                        <span
                          className={`font-semibold ${
                            textContrastDark >= 4.5
                              ? 'text-green-400'
                              : 'text-red-400'
                          }`}
                        >
                          {textContrastDark.toFixed(2)}:1{' '}
                          {textContrastDark >= 7
                            ? '(AAA ✓)'
                            : textContrastDark >= 4.5
                            ? '(AA ✓)'
                            : '(Fail ✗)'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Links on dark:</span>
                        <span
                          className={`font-semibold ${
                            linkContrastDark >= 4.5
                              ? 'text-green-400'
                              : 'text-red-400'
                          }`}
                        >
                          {linkContrastDark.toFixed(2)}:1{' '}
                          {linkContrastDark >= 7
                            ? '(AAA ✓)'
                            : linkContrastDark >= 4.5
                            ? '(AA ✓)'
                            : '(Fail ✗)'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-neutral-600 pt-2 border-t">
                    <strong>WCAG Standards:</strong> AA requires 4.5:1, AAA is
                    7:1. Aim for 7:1+ for optimal accessibility.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-700">
                  Live Preview
                </h2>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors"
                >
                  {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                  {darkMode ? 'Light' : 'Dark'}
                </button>
              </div>

              <div
                className={`border rounded-xl p-6 transition-all duration-300 ${
                  darkMode
                    ? 'bg-neutral-900 border-neutral-700'
                    : 'bg-white border-neutral-200'
                }`}
                style={{ minHeight: '250px' }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: generatePreviewHTML() }}
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={copyAsRendered}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md font-medium"
                >
                  <Copy size={18} />
                  {copiedPlain ? 'Copied! ✓' : 'Copy Signature'}
                </button>

                <button
                  onClick={copyToClipboard}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors font-medium"
                >
                  <Copy size={18} />
                  {copied ? 'Copied! ✓' : 'Copy HTML'}
                </button>

                <button
                  onClick={downloadHTML}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors font-medium"
                >
                  <Download size={18} />
                </button>
              </div>

              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>💡 Tip:</strong> Use "Copy Signature" (green) to paste
                  directly into most email clients. Use "Copy HTML" (blue) if
                  you need the raw code.
                </p>
              </div>
            </div>

            {/* Best Practices */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <CheckCircle size={18} />
                2025 Best Practices Applied
              </h3>
              <ul className="text-sm text-green-800 space-y-2">
                <li className="flex gap-2">
                  <span>✓</span>{' '}
                  <span>Separate colors for light and dark modes</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>{' '}
                  <span>Color-scheme meta tags for native support</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>{' '}
                  <span>@media (prefers-color-scheme: dark) CSS</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>{' '}
                  <span>[data-ogsc] for Outlook.com dark mode</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>{' '}
                  <span>Dual logo support with image swapping</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>{' '}
                  <span>ARIA labels for screen reader accessibility</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>{' '}
                  <span>Semantic HTML with role="presentation"</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>{' '}
                  <span>Mobile-responsive at 480px breakpoint</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span> <span>Optimized under 100KB file size</span>
                </li>
              </ul>
            </div>

            {/* Installation Guide */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Info size={18} />
                Installation Guide
              </h3>
              <ol className="text-sm text-blue-800 space-y-2">
                <li className="flex gap-2">
                  <span className="font-semibold">1.</span>{' '}
                  <span>Click "Copy Signature" (green button) above</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">2.</span>{' '}
                  <span>
                    Open your email client and go to signature settings
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">3.</span>{' '}
                  <span>
                    Paste directly (Ctrl/Cmd+V) - formatting included!
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">4.</span>{' '}
                  <span>
                    If that doesn't work, use "Copy HTML" and paste in HTML mode
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">5.</span>{' '}
                  <span>Test by sending email to yourself in both modes</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">6.</span>{' '}
                  <span>Verify across Gmail, Apple Mail, and Outlook</span>
                </li>
              </ol>

              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs text-blue-700 font-semibold mb-2">
                  Dark Mode Support:
                </p>
                <div className="text-xs text-blue-700 space-y-1">
                  <div>• Apple Mail (iOS/macOS): ✓ Full @media support</div>
                  <div>• Outlook.com: ✓ [data-ogsc] attribute</div>
                  <div>• Outlook app (iOS/Android): ✓ @media support</div>
                  <div>
                    • Gmail: ⚠ UI only (email stays same unless OS-level)
                  </div>
                  <div>• Yahoo Mail: ⚠ Limited support</div>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
              <h3 className="font-semibold text-purple-900 mb-3">
                🔧 How It Works
              </h3>
              <div className="text-xs text-purple-800 space-y-2">
                <p>
                  <strong>Adaptive Colors:</strong> Uses CSS media queries and
                  data attributes to detect user preference and apply
                  appropriate color palette.
                </p>
                <p>
                  <strong>Image Swapping:</strong> Shows/hides logo images based
                  on mode using display:none/block with !important to override
                  inline styles.
                </p>
                <p>
                  <strong>Email Client Coverage:</strong> 41.86% support @media
                  (prefers-color-scheme). Outlook.com uses [data-ogsc]. Gmail
                  follows OS settings.
                </p>
                <p>
                  <strong>Accessibility:</strong> WCAG 2.1 AA/AAA compliant with
                  separate contrast checks for each mode. European Accessibility
                  Act (June 2025) ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

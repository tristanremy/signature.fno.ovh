export interface SignatureData {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  logoUrl: string;
  logoDarkUrl: string;
  textColor: string;
  textColorDark: string;
  linkColor: string;
  linkColorDark: string;
}

export interface Template {
  name: string;
  description: string;
  generate: (data: SignatureData) => string;
}

export const templates: Record<string, Template> = {
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

  modern: {
    name: 'Modern Gradient',
    description: 'Bold design with adaptive gradient separator',
    generate: (data) => {
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
      <div class="dark-img" style="display: none; overflow: hidden; max-height: 0px; margin-bottom: 12px;">
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

export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (hex: string) => {
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
}

export function generatePreviewHTML(
  template: string,
  data: SignatureData,
  darkMode: boolean
): string {
  let html = templates[template].generate(data);

  if (darkMode) {
    html = html.replace(
      new RegExp(`color: ${data.textColor}`, 'g'),
      `color: ${data.textColorDark}`
    );
    html = html.replace(
      new RegExp(`color: ${data.linkColor}`, 'g'),
      `color: ${data.linkColorDark}`
    );

    html = html.replace(
      new RegExp(
        `linear-gradient\\(90deg, ${data.linkColor.replace(
          '#',
          '\\#'
        )} 0%, transparent 100%\\)`,
        'g'
      ),
      `linear-gradient(90deg, ${data.linkColorDark} 0%, transparent 100%)`
    );

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
      /style="display: none; overflow: hidden; max-height: 0px; margin-bottom: 12px;"/g,
      'style="display: block; overflow: visible; max-height: none; margin-bottom: 12px;"'
    );
    html = html.replace(
      /style="display: block; border: 0;"/g,
      'style="display: block; border: 0; max-width: 100%;"'
    );
  }

  return html;
}

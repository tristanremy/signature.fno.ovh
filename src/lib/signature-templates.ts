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
  compactVertical: {
    name: 'Compact Vertical',
    description: 'Stacked layout - logo on top',
    generate: (data) => {
      let titleCompanyLine = [];
      if (data.title) titleCompanyLine.push(data.title);
      if (data.company) titleCompanyLine.push(data.company);
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
    [data-ogsc] .dark-img { display: block !important; max-height: inherit !important; visibility: inherit !important; }
    [data-ogsc] .light-img { display: none !important; }
    [data-ogsb] .dark-text { color: ${data.textColorDark} !important; }
    [data-ogsb] .dark-link { color: ${data.linkColorDark} !important; }
    [data-ogsb] .dark-img { display: block !important; max-height: inherit !important; visibility: inherit !important; }
    [data-ogsb] .light-img { display: none !important; }
    @media only screen and (max-width: 480px) {
      .mobile-block { display: block !important; margin-bottom: 4px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: transparent;">
<table role="presentation" style="font-family: Arial, sans-serif; font-size: 13px; color: ${
        data.textColor
      }; border-collapse: collapse; background-color: transparent;">
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

  // Remove all CSS rules that could interfere with preview mode
  html = html.replace(
    /@media \(prefers-color-scheme: dark\) \{[^}]*\}/g,
    ''
  );
  html = html.replace(
    /\[data-ogsc\] \.dark-text \{[^}]*\}/g,
    ''
  );
  html = html.replace(
    /\[data-ogsc\] \.dark-link \{[^}]*\}/g,
    ''
  );
  html = html.replace(
    /\[data-ogsc\] \.dark-img \{[^}]*\}/g,
    ''
  );
  html = html.replace(
    /\[data-ogsc\] \.light-img \{[^}]*\}/g,
    ''
  );
  html = html.replace(
    /\[data-ogsb\] \.dark-text \{[^}]*\}/g,
    ''
  );
  html = html.replace(
    /\[data-ogsb\] \.dark-link \{[^}]*\}/g,
    ''
  );
  html = html.replace(
    /\[data-ogsb\] \.dark-img \{[^}]*\}/g,
    ''
  );
  html = html.replace(
    /\[data-ogsb\] \.light-img \{[^}]*\}/g,
    ''
  );
  html = html.replace(
    /\[data-ogsb\] \.gradient-line \{[^}]*\}/g,
    ''
  );

  if (darkMode) {
    // Apply dark mode colors
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

    // Hide light images (remove all spacing), show dark images with proper margin
    html = html.replace(
      /<img class="light-img" src="[^"]*" alt="[^"]*" width="\d+" style="display: block; margin-bottom: 12px; border: 0; max-width: \d+px; height: auto;">/g,
      (match) => match.replace(/style="[^"]*"/, 'style="display:none !important; margin:0 !important; padding:0 !important; height:0 !important;"')
    );
    html = html.replace(
      /class="dark-img" style="display: none; overflow: hidden; max-height: 0px; margin-bottom: 12px;"/g,
      'class="dark-img" style="display: block; overflow: visible; max-height: none; margin-bottom: 12px;"'
    );
    html = html.replace(
      /class="dark-img" style="display: none; overflow: hidden; max-height: 0px;"/g,
      'class="dark-img" style="display: block; overflow: visible; max-height: none;"'
    );
  } else {
    // Force light mode - show light images, completely hide dark image containers, remove dark classes
    html = html.replace(
      /<img class="light-img" src="[^"]*" alt="[^"]*" width="\d+" style="display: block; margin-bottom: 12px; border: 0; max-width: \d+px; height: auto;">/g,
      (match) => match.replace(/style="[^"]*"/, 'style="display: block !important; margin-bottom: 12px; border: 0; max-width: 90px; height: auto;"')
    );
    html = html.replace(
      /class="dark-img" style="display: none; overflow: hidden; max-height: 0px; margin-bottom: 12px;"/g,
      'class="dark-img" style="display:none !important; height:0 !important; max-height:0 !important; margin:0 !important; padding:0 !important; overflow:hidden !important;"'
    );
    html = html.replace(
      /class="dark-img" style="display: none; overflow: hidden; max-height: 0px;"/g,
      'class="dark-img" style="display:none !important; height:0 !important; max-height:0 !important; margin:0 !important; padding:0 !important; overflow:hidden !important;"'
    );
    // Remove dark-link and dark-text classes to prevent CSS from overriding inline styles
    html = html.replace(/class="dark-link mobile-block"/g, 'class="mobile-block"');
    html = html.replace(/class="dark-link"/g, '');
    html = html.replace(/class="dark-text"/g, '');
  }

  return html;
}

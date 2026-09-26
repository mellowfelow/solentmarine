import { SITE, REPLY } from '../config/site';

export interface EmailLineItem {
  name: string;
  qty: number;
  price: number;
  shaft?: string;
  currency?: string;
}

export interface EmailRow {
  label: string;
  value?: string;
  html?: string;
  mono?: boolean;
  heading?: boolean;
  highlight?: boolean;
  block?: boolean;
  /** Renders a properly column-aligned Item / Qty / Line Total table instead of a plain value. */
  items?: EmailLineItem[];
}

export interface BuildEmailOptions {
  title: string;
  preheader?: string;
  intro?: string;
  refBadge?: string;
  rows: EmailRow[];
  afterRows?: string;
  cta?: { label: string; url: string };
  secondaryCta?: { label: string; url: string };
  footer?: string;
  primaryColor?: string;
  headerDark?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Builds table-based inline CSS Light Shell Email for 100% email client compatibility
 */
export function buildEmailHtml(opts: BuildEmailOptions): string {
  const accent = opts.primaryColor || REPLY.brand.primary || '#0284c7';
  const headerBg = opts.headerDark || REPLY.brand.headerDark || '#0f172a';

  // Render table rows
  const renderedRows = opts.rows
    .map((row) => {
      if (row.items) {
        const currency = row.items[0]?.currency || REPLY.currency.symbol;
        const itemRows = row.items
          .map(
            (it) => `
          <tr>
            <td style="padding: 8px 4px 8px 0; font-size: 13px; color: #0f172a; border-bottom: 1px solid #f1f5f9; vertical-align: top;">
              ${escapeHtml(it.name)}${it.shaft ? `<br/><span style="font-size: 11px; color: #94a3b8;">${escapeHtml(it.shaft)}</span>` : ''}
            </td>
            <td style="padding: 8px 4px; font-size: 13px; color: #334155; text-align: center; border-bottom: 1px solid #f1f5f9; vertical-align: top; white-space: nowrap;">
              ${it.qty}
            </td>
            <td style="padding: 8px 0 8px 4px; font-size: 13px; font-weight: 700; color: #0f172a; text-align: right; border-bottom: 1px solid #f1f5f9; vertical-align: top; white-space: nowrap; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
              ${currency}${(it.price * it.qty).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
          </tr>
        `
          )
          .join('');

        return `
          <tr>
            <td colspan="2" style="padding: 4px 0 12px 0;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 0 4px 6px 0; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; border-bottom: 1px solid #e2e8f0;">Item</td>
                  <td style="padding: 0 4px 6px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; text-align: center; border-bottom: 1px solid #e2e8f0; width: 44px;">Qty</td>
                  <td style="padding: 0 0 6px 4px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; text-align: right; border-bottom: 1px solid #e2e8f0; width: 100px;">Line Total</td>
                </tr>
                ${itemRows}
              </table>
            </td>
          </tr>
        `;
      }

      if (row.heading) {
        return `
          <tr>
            <td colspan="2" style="padding: 16px 0 8px 0; border-bottom: 2px solid ${accent}; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: ${accent};">
              ${escapeHtml(row.label)}
            </td>
          </tr>
        `;
      }

      if (row.block) {
        return `
          <tr>
            <td colspan="2" style="padding: 12px 0; font-size: 13px; line-height: 1.6; color: #1e293b; background-color: #f8fafc; border-radius: 8px; padding: 14px; border: 1px solid #e2e8f0; font-family: monospace; white-space: pre-wrap;">
              ${row.html ? row.html : escapeHtml(row.value || '')}
            </td>
          </tr>
        `;
      }

      if (row.highlight) {
        return `
          <tr>
            <td style="padding: 14px 0; font-size: 14px; font-weight: 700; color: #0f172a; border-top: 2px solid ${accent}; border-bottom: 2px solid #e2e8f0;">
              ${escapeHtml(row.label)}
            </td>
            <td style="padding: 14px 0; font-size: 20px; font-weight: 800; color: ${accent}; text-align: right; border-top: 2px solid ${accent}; border-bottom: 2px solid #e2e8f0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
              ${row.html ? row.html : escapeHtml(row.value || '')}
            </td>
          </tr>
        `;
      }

      const valContent = row.html 
        ? row.html 
        : escapeHtml(row.value || '');
      const monoStyle = row.mono 
        ? 'font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; font-weight: 600; color: #0f172a;' 
        : 'font-size: 13px; color: #0f172a; font-weight: 500;';

      return `
        <tr>
          <td style="padding: 10px 0; font-size: 13px; color: #64748b; border-bottom: 1px solid #f1f5f9; width: 40%; vertical-align: top;">
            ${escapeHtml(row.label)}
          </td>
          <td style="padding: 10px 0; text-align: right; border-bottom: 1px solid #f1f5f9; width: 60%; vertical-align: top; ${monoStyle}">
            ${valContent}
          </td>
        </tr>
      `;
    })
    .join('');

  // CTAs
  let ctaHtml = '';
  if (opts.cta || opts.secondaryCta) {
    ctaHtml = `
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0 8px 0;">
        <tr>
          <td align="center" style="padding: 8px 0;">
            ${
              opts.cta
                ? `<a href="${opts.cta.url}" target="_blank" style="display: inline-block; background-color: ${accent}; color: #ffffff; padding: 12px 28px; border-radius: 8px; font-size: 13px; font-weight: 700; text-decoration: none; text-align: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">${escapeHtml(opts.cta.label)}</a>`
                : ''
            }
            ${
              opts.secondaryCta
                ? `<a href="${opts.secondaryCta.url}" target="_blank" style="display: inline-block; background-color: #ffffff; color: ${accent}; border: 1px solid ${accent}; padding: 11px 24px; border-radius: 8px; font-size: 13px; font-weight: 600; text-decoration: none; margin-left: 8px;">${escapeHtml(opts.secondaryCta.label)}</a>`
                : ''
            }
          </td>
        </tr>
      </table>
    `;
  }

  const bizInfo = REPLY.bizNumber 
    ? `${REPLY.bizNumber.label}: ${REPLY.bizNumber.value} · ` 
    : '';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(opts.title)}</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #334155; line-height: 1.5;">
  ${
    opts.preheader
      ? `<div style="display: none; max-height: 0px; overflow: hidden;">${escapeHtml(opts.preheader)}</div>`
      : ''
  }
  
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
    
    <!-- DARK BRAND HEADER BAND -->
    <tr>
      <td style="background-color: ${headerBg}; padding: 28px 32px; border-bottom: 3px solid ${accent};">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td>
              <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
                ${escapeHtml(SITE.name)}
              </h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #94a3b8;">
                ${escapeHtml(REPLY.headerTagline || SITE.tagline)}
              </p>
            </td>
            ${
              opts.refBadge
                ? `<td align="right" style="vertical-align: middle;">
                    <span style="display: inline-block; background-color: rgba(255, 255, 255, 0.1); border: 1px solid ${accent}; color: #ffffff; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-family: monospace; font-weight: 700;">
                      ${escapeHtml(opts.refBadge)}
                    </span>
                  </td>`
                : ''
            }
          </tr>
        </table>
      </td>
    </tr>

    <!-- EMAIL BODY -->
    <tr>
      <td style="padding: 32px 32px 16px 32px;">
        <h2 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 700; color: #0f172a; letter-spacing: -0.01em;">
          ${escapeHtml(opts.title)}
        </h2>
        ${
          opts.intro
            ? `<p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #475569;">${opts.intro}</p>`
            : ''
        }

        <!-- DATA ROWS TABLE -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
          ${renderedRows}
        </table>

        <!-- AFTER ROWS TRUSTED CONTENT (e.g. Terms list) -->
        ${opts.afterRows ? opts.afterRows : ''}

        <!-- ACTION BUTTONS -->
        ${ctaHtml}
      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center; line-height: 1.6;">
        <p style="margin: 0 0 4px 0; font-weight: 600; color: #475569;">
          ${escapeHtml(SITE.name)} · Marine Dealership & Rigging Workshop
        </p>
        <p style="margin: 0;">
          ${bizInfo}Support: <a href="mailto:${REPLY.channels.email}" style="color: ${accent}; text-decoration: none;">${REPLY.channels.email}</a> ${REPLY.channels.whatsapp ? `· Tel: ${REPLY.channels.whatsapp}` : ''}
        </p>
        ${
          opts.footer
            ? `<p style="margin: 8px 0 0 0; color: #94a3b8;">${escapeHtml(opts.footer)}</p>`
            : ''
        }
      </td>
    </tr>

  </table>
</body>
</html>
  `;
}

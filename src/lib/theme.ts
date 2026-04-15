import { prisma } from './prisma';

export interface ThemeToken {
  tokenName: string;
  tokenValue: string;
}

export async function getThemeTokens(): Promise<ThemeToken[]> {
  const tokens = await prisma.themeSetting.findMany({
    select: { tokenName: true, tokenValue: true },
  });
  return tokens.length > 0 ? tokens : getDefaultTokens();
}

export function generateCSSVariables(tokens: ThemeToken[]): string {
  return tokens
    .map((t) => `--color-${t.tokenName}: ${t.tokenValue};`)
    .join('\n  ');
}

export function getDefaultTokens(): ThemeToken[] {
  return [
    { tokenName: 'primary', tokenValue: '#000000' },
    { tokenName: 'primary-container', tokenValue: '#131b2e' },
    { tokenName: 'on-primary', tokenValue: '#ffffff' },
    { tokenName: 'on-primary-container', tokenValue: '#7c839b' },
    { tokenName: 'on-primary-fixed', tokenValue: '#131b2e' },
    { tokenName: 'on-primary-fixed-variant', tokenValue: '#3f465c' },
    { tokenName: 'primary-fixed', tokenValue: '#dae2fd' },
    { tokenName: 'primary-fixed-dim', tokenValue: '#bec6e0' },
    { tokenName: 'secondary', tokenValue: '#006591' },
    { tokenName: 'secondary-container', tokenValue: '#39b8fd' },
    { tokenName: 'on-secondary', tokenValue: '#ffffff' },
    { tokenName: 'on-secondary-container', tokenValue: '#004666' },
    { tokenName: 'on-secondary-fixed', tokenValue: '#001e2f' },
    { tokenName: 'on-secondary-fixed-variant', tokenValue: '#004c6e' },
    { tokenName: 'secondary-fixed', tokenValue: '#c9e6ff' },
    { tokenName: 'secondary-fixed-dim', tokenValue: '#89ceff' },
    { tokenName: 'tertiary', tokenValue: '#000000' },
    { tokenName: 'tertiary-container', tokenValue: '#002113' },
    { tokenName: 'tertiary-fixed', tokenValue: '#4a90d9' },
    { tokenName: 'tertiary-fixed-dim', tokenValue: '#3578c2' },
    { tokenName: 'on-tertiary', tokenValue: '#ffffff' },
    { tokenName: 'on-tertiary-container', tokenValue: '#009668' },
    { tokenName: 'on-tertiary-fixed', tokenValue: '#002113' },
    { tokenName: 'on-tertiary-fixed-variant', tokenValue: '#005236' },
    { tokenName: 'surface', tokenValue: '#f7f9fb' },
    { tokenName: 'surface-dim', tokenValue: '#d8dadc' },
    { tokenName: 'surface-bright', tokenValue: '#f7f9fb' },
    { tokenName: 'surface-container', tokenValue: '#eceef0' },
    { tokenName: 'surface-container-low', tokenValue: '#f2f4f6' },
    { tokenName: 'surface-container-lowest', tokenValue: '#ffffff' },
    { tokenName: 'surface-container-high', tokenValue: '#e6e8ea' },
    { tokenName: 'surface-container-highest', tokenValue: '#e0e3e5' },
    { tokenName: 'surface-variant', tokenValue: '#e0e3e5' },
    { tokenName: 'surface-tint', tokenValue: '#565e74' },
    { tokenName: 'on-surface', tokenValue: '#191c1e' },
    { tokenName: 'on-surface-variant', tokenValue: '#45464d' },
    { tokenName: 'on-background', tokenValue: '#191c1e' },
    { tokenName: 'background', tokenValue: '#f7f9fb' },
    { tokenName: 'outline', tokenValue: '#76777d' },
    { tokenName: 'outline-variant', tokenValue: '#c6c6cd' },
    { tokenName: 'error', tokenValue: '#ba1a1a' },
    { tokenName: 'error-container', tokenValue: '#ffdad6' },
    { tokenName: 'on-error', tokenValue: '#ffffff' },
    { tokenName: 'on-error-container', tokenValue: '#93000a' },
    { tokenName: 'inverse-surface', tokenValue: '#2d3133' },
    { tokenName: 'inverse-on-surface', tokenValue: '#eff1f3' },
    { tokenName: 'inverse-primary', tokenValue: '#bec6e0' },
  ];
}

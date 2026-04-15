import { getThemeTokens, generateCSSVariables } from '@/lib/theme';

export default async function ThemeProvider() {
  const tokens = await getThemeTokens();
  const cssVars = generateCSSVariables(tokens);

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `:root { ${cssVars} }`,
      }}
    />
  );
}

export function applyTheme(theme: {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
}) {
  if (!theme) return;

  const root = document.documentElement;

  root.style.setProperty("--primary-color", theme.primaryColor);
  root.style.setProperty("--secondary-color", theme.secondaryColor);
  root.style.setProperty("--background-color", theme.backgroundColor);
  root.style.setProperty("--text-color", theme.textColor);
}
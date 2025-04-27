import { createContext, useState, useEffect, PropsWithChildren } from 'react';
import { themeBalham } from 'ag-grid-community';
import { colorSchemeLight, colorSchemeDarkWarm } from 'ag-grid-community';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  agTheme: typeof themeBalham;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider = ({ children } : PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'dark' ? 'dark' : 'light';
  });

  const [agTheme, setAgTheme] = useState<typeof themeBalham>(
    themeBalham.withPart(colorSchemeLight));
  useEffect(() => {
    if (theme === 'dark') {
      setAgTheme(themeBalham.withPart(colorSchemeDarkWarm));
    } else {
      setAgTheme(themeBalham.withPart(colorSchemeLight));
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  });

  return (
    <ThemeContext.Provider value={{ theme, agTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };

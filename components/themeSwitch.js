// import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon } from "@heroicons/react/outline";

const ThemeSwitch = () => {
  //   const [mounted, setMounted] = useState(false);
  //   const { resolvedTheme, setTheme } = useTheme();
  const { theme, setTheme } = useTheme();
  // useEffect only runs on the client, so now we can safely show the UI
  //   useEffect(() => {
  //     setMounted(true);
  //   }, []);

  //   if (!mounted) {
  //     return null;
  //   }

  return (
    <div className="inline-flex items-center">
      <SunIcon className="w-4 h-4 mr-2" />
      <select
        name="themeSwitch"
        value={theme}
        onChange={e => setTheme(e.target.value)}>
        <option value="system">Sistem</option>
        <option value="dark">Karanlık</option>
        <option value="light">Aydınlık</option>
      </select>
    </div>
  );
};

export default ThemeSwitch;

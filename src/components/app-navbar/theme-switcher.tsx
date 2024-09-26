"use client";

import { Switch } from "@nextui-org/react";
import { IconMoon, IconSun } from "@tabler/icons-react";

import useSystemTheme from "@/hooks/use-system-theme";

export function ThemeSwitcher({ showLabel }: { showLabel?: boolean }) {
  const { theme, setTheme } = useSystemTheme();

  return (
    <Switch
      isSelected={theme === "light"}
      onValueChange={() =>
        theme === "dark" ? setTheme("light") : setTheme("dark")
      }
      size="lg"
      color="success"
      startContent={<IconSun />}
      endContent={<IconMoon />}
    >
      {showLabel && "Theme"}
    </Switch>
  );
}

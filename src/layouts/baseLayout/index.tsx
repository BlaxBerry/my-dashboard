import {
  memo,
  useCallback,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";

import { ThemeProvider } from "@/components/providers";
import BaseLayoutHeader from "./BaseLayoutHeader";
import BaseLayoutMainContent from "./BaseLayoutMainContent";
import BaseLayoutNavDrawer from "./BaseLayoutNavDrawer";

const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
  // breakpoint < md
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState<boolean>(false);
  const toggleNavDrawer = useCallback(
    () => setIsNavDrawerOpen((s) => !s),
    [setIsNavDrawerOpen],
  );
  const closeNavDrawer = useCallback(
    () => setIsNavDrawerOpen(false),
    [setIsNavDrawerOpen],
  );

  return (
    <ThemeProvider>
      <BaseLayoutHeader toggleNavDrawer={toggleNavDrawer} />

      <BaseLayoutMainContent>{children}</BaseLayoutMainContent>

      <BaseLayoutNavDrawer {...{ isNavDrawerOpen, closeNavDrawer }} />
    </ThemeProvider>
  );
};

const BaseLayoutMemo = memo(BaseLayout);
export default BaseLayoutMemo;

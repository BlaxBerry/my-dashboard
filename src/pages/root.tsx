import { PageLoading } from "@/components/common";
import { BaseLayout } from "@/layouts";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function RootPage() {
  return (
    <BaseLayout>
      <Suspense fallback={<PageLoading />}>
        <Outlet />
      </Suspense>
    </BaseLayout>
  );
}

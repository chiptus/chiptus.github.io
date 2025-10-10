import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";

import { dataFn } from "@/server-fns/data.fn";

export const Route = createFileRoute("/")({
  loader: () => dataFn(),
  component: Index,
});

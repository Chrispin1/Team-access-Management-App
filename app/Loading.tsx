import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

function Loading({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-background",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading">
      <LoaderCircle
        className="size-10 animate-spin text-primary"
        strokeWidth={2.5}
      />
      <div className="flex items-center gap-1.5">
        <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
        <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
        <span className="size-2 animate-bounce rounded-full bg-primary" />
      </div>
      <p className="font-jost text-sm md:text-base text-muted-foreground capitalize">
        Loading, please wait...
      </p>
    </div>
  );
}

export default Loading;

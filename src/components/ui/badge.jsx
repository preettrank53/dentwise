import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-[4px] border px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[#EDF5F8] text-[#4A7D96] border border-[#BAD7E1] rounded-[4px] px-2 py-0.5 text-xs font-medium",
        secondary:
          "bg-[#F5F5F5] text-[#6B7280] border border-[#D0D0D0] rounded-[4px] px-2 py-0.5 text-xs font-medium",
        destructive:
          "bg-[#FDF2F2] text-[#C0392B] border border-[#E8A09A] rounded-[4px] px-2 py-0.5 text-xs font-medium",
        outline:
          "bg-transparent text-[#4A6572] border border-[#E2EDF2] rounded-[4px] px-2 py-0.5 text-xs font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps({
      className: cn(badgeVariants({ variant }), className),
    }, props),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants }

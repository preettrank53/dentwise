import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[#619BB6] text-white hover:bg-[#4A7D96] rounded-[6px] border-0 font-medium text-sm transition-colors duration-150",
        destructive:
          "bg-transparent text-[#C0392B] border border-[#C0392B] hover:bg-[#FDF2F2] rounded-[6px] font-medium text-sm",
        outline:
          "bg-transparent text-[#4A6572] border border-[#E2EDF2] hover:bg-[#EDF5F8] hover:text-[#1A2832] rounded-[6px] font-medium text-sm",
        secondary:
          "bg-transparent text-[#619BB6] border border-[#619BB6] hover:bg-[#EDF5F8] rounded-[6px] font-medium text-sm transition-colors duration-150",
        ghost:
          "bg-transparent text-[#4A6572] hover:bg-[#EDF5F8] hover:text-[#1A2832] rounded-[6px] font-medium text-sm",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-5 py-2.5",
        sm: "h-8 px-4 py-2 text-xs",
        lg: "h-11 px-6 py-3",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : ButtonPrimitive
  
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }

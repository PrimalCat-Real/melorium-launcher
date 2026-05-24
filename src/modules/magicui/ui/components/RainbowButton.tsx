import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"

import { cn } from "@/modules/shadcn/lib/utils"

const rainbowButtonVariants = cva(
  cn(
    "relative border-2 cursor-pointer",
    "inline-flex items-center justify-center gap-2 shrink-0 rounded-md",
    "font-medium whitespace-nowrap",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "before:content-[''] before:absolute before:bottom-[-20%] before:left-1/2 before:z-0",
    "before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:pointer-events-none",
    "before:animate-rainbow before:bg-[length:200%] before:[filter:blur(0.75rem)]",
    "before:bg-[linear-gradient(90deg,var(--color-1),var(--color-2),var(--color-3),var(--color-4),var(--color-5))]",
    "before:opacity-0 hover:before:opacity-100",
    "hover:border-transparent hover:animate-rainbow hover:bg-[length:200%]",
    "hover:[background-clip:padding-box,border-box,border-box]",
    "hover:[background-origin:border-box]",
  ),
  {
    variants: {
      variant: {
        default: cn(
          "bg-foreground text-background border-transparent",
          "hover:bg-[linear-gradient(var(--foreground),var(--foreground)),linear-gradient(var(--foreground)_50%,color-mix(in_oklch,var(--foreground)_60%,transparent)_80%,transparent),linear-gradient(90deg,var(--color-1),var(--color-2),var(--color-3),var(--color-4),var(--color-5))]",
        ),
        outline: cn(
          "bg-secondary/10 text-foreground border-border",
          "hover:bg-[linear-gradient(var(--background),var(--background)),linear-gradient(var(--background)_50%,color-mix(in_oklch,var(--background)_60%,transparent)_80%,transparent),linear-gradient(90deg,var(--color-1),var(--color-2),var(--color-3),var(--color-4),var(--color-5))]",
        ),
      },
      size: {
        default: "h-9 px-4 py-2 text-sm",
        sm: "h-7 px-3 text-xs",
        lg: "h-11 px-8 text-base",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

interface RainbowButtonProps
  extends ComponentProps<typeof ButtonPrimitive>,
  VariantProps<typeof rainbowButtonVariants> { }

function RainbowButton({ className, size, variant, ...props }: RainbowButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(rainbowButtonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

RainbowButton.displayName = "RainbowButton"

export { RainbowButton, rainbowButtonVariants, type RainbowButtonProps }

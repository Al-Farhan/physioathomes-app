import { cn } from "@/src/lib/utils";
import { forwardRef } from "react";
import { Pressable, Text, View } from "react-native";

type ButtonProps = {
  text: string;
  type?: "outline" | "filled";
} & React.ComponentPropsWithRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, type = "filled", className, disabled, ...pressableProps }, ref) => {
    return (
      <Pressable
        ref={ref}
        accessibilityRole="button"
        accessibilityState={{ disabled: !!disabled }}
        disabled={disabled}
        {...pressableProps}
        className={cn(
          "min-h-12 items-center justify-center rounded-btn px-6",
          type === "filled" &&
            (disabled ? "bg-line" : "bg-primary-600 active:bg-primary-700"),
          type === "outline" &&
            "border border-line bg-surface active:bg-surface-alt",
          className,
        )}
      >
        <Text
          className={cn(
            "text-body font-sans-semibold",
            type === "filled" &&
              (disabled ? "text-ink-secondary" : "text-surface"),
            type === "outline" && "text-ink",
          )}
        >
          {text}
        </Text>
      </Pressable>
    );
  },
);

Button.displayName = "Button";

export default Button;

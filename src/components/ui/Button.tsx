import { forwardRef } from "react";
import { Pressable, Text, View } from "react-native";

type ButtonProps = {
  text: string;
  type?: "outline" | "filled";
} & React.ComponentPropsWithRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, type = "filled", ...pressableProps }, ref) => {
    return (
      <Pressable
        ref={ref}
        {...pressableProps}
        className={`${type === "filled" ? "bg-black" : "bg-white border"} p-2 rounded-md`}
      >
        <Text
          className={`${type === "filled" ? "text-white" : "text-black"}  text-lg`}
        >
          {text}
        </Text>
      </Pressable>
    );
  }
);

export default Button;

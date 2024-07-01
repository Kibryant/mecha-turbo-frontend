import { Link } from "expo-router";
import { Pressable, Text } from "react-native";

interface ButtonProps {
  text: string;
  href: string;
}

export default function Button({ text, href }: ButtonProps) {
  return (
    <Link
      href={`/inicio/${href}`}
      className="p-4 w-full bg-blue-500 rounded-md mt-2"
      asChild
    >
      <Pressable>
        <Text className="text-white font-bold text-center">{text}</Text>
      </Pressable>
    </Link>
  );
}

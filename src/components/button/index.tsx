import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, Text } from "react-native";

interface ButtonProps {
  text: string;
  href: string;
}

export default function Button({ text, href }: ButtonProps) {
  const { t } = useTranslation();

  return (
    <Link
      href={`/${href}`}
      className="p-4 w-full  bg-primary rounded-md mt-2"
      asChild
    >
      <Pressable>
        <Text className="text-gray-100 font-headingBold text-center">
          {t(text)}
        </Text>
      </Pressable>
    </Link>
  );
}

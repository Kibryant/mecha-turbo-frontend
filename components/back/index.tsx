import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

interface BackProps {
  to: string;
}

export default function Back({ to }: BackProps) {
  return (
    <Link href={to}>
      <Ionicons name="chevron-back" size={40} color="#d1d5db" />
    </Link>
  );
}

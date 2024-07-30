import { Image } from "expo-image";

const esFlagImage = require("@/assets/images/flags/es.png");

export default function Es() {
  return <Image source={esFlagImage} style={{ width: 30, height: 20 }} />;
}

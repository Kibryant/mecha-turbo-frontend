import { Image } from "expo-image";

const brFlagImage = require("@/assets/images/flags/br.png");

export default function Br() {
  return <Image source={brFlagImage} style={{ width: 30, height: 20 }} />;
}

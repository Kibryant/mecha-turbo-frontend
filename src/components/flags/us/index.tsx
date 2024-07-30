import { Image } from "expo-image";

const usFlagImage = require("@/assets/images/flags/us.png");

export default function Us() {
  return <Image source={usFlagImage} style={{ width: 30, height: 20 }} />;
}

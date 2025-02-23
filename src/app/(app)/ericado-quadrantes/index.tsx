import { useCallback } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import * as ScreenOrientation from "expo-screen-orientation";
import Back from "@/components/back";
import { useTranslation } from "react-i18next";
import Button from "@/components/button";

export default function EriçadoQuadrantes() {
  const { width } = useWindowDimensions();

  const { t } = useTranslation();

  const VIDEO_WIDTH = width - 16 * 2;

  const onFullScreenChange = useCallback((isFullScreen: boolean) => {
    if (isFullScreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, []);

  return (
    <View className="bg-secondary flex-1 items-center">
      <View className="w-full mt-2">
        <Back to="/" />
      </View>

      <Text className="text-primary text-3xl font-headingBold mt-10 text-center">
        {t("Eriçados e Quadrantes")}
      </Text>
      <View className="w-full px-4 justify-center items-center mt-8">
        <YoutubeIframe
          videoId="Oro4Z3_0x3s"
          height={200}
          width={VIDEO_WIDTH}
          onFullScreenChange={onFullScreenChange}
        />

        <View className="mt-2 w-full">
          <Button
            href="tecnicas-especialistas?url=/ericado-quadrantes"
            text="Assistir mais aulas"
          />
        </View>
      </View>
    </View>
  );
}

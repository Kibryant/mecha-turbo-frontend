import { useState, useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { firebaseStorage } from "@/lib/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useFirebaseImageCache(imagePath: string) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      setLoading(true);
      setError(null);

      try {
        const cachedUrl = await AsyncStorage.getItem(imagePath);

        if (cachedUrl) {
          setUrl(cachedUrl);
          setLoading(false);
          return;
        }

        const imageRef = ref(firebaseStorage, imagePath);

        const downloadUrl = await getDownloadURL(imageRef);

        await AsyncStorage.setItem(imagePath, downloadUrl);
        setUrl(downloadUrl);
      } catch (err) {
        console.error(err);
        setError(err as Error);
        setUrl(null);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [imagePath]);

  const onRetry = () => {
    setUrl(null);
  };

  return { url, loading, error, onRetry };
}

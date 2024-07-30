import * as SecureStore from "expo-secure-store";

async function saveToken(key: string, token: string) {
  await SecureStore.setItemAsync(key, token);
}

async function getToken(key: string) {
  return await SecureStore.getItemAsync(key);
}

async function removeToken(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export { saveToken, getToken, removeToken };

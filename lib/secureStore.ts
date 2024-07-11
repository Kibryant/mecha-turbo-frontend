import * as SecureStore from "expo-secure-store";

async function saveToken(token: string) {
  await SecureStore.setItemAsync("adminToken", token);
}

async function getToken() {
  return await SecureStore.getItemAsync("adminToken");
}

async function removeToken() {
  await SecureStore.deleteItemAsync("adminToken");
}

export { saveToken, getToken, removeToken };

import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = AsyncStorage;

export async function getItem(key: string) {
  return await storage.getItem(key);
}

export async function setItem(key: string, value: any) {
  const jsonValue = JSON.stringify(value);
  await storage.setItem(key, jsonValue);
}

export async function deleteItem(key: string) {
  await storage.removeItem(key);
}

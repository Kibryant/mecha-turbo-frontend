import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = AsyncStorage;

export async function getItem(key: string) {
  const jsonValue = await storage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
}

export async function setItem(key: string, value: any) {
  const jsonValue = JSON.stringify(value);
  await storage.setItem(key, jsonValue);
}

export async function deleteItem(key: string) {
  await storage.removeItem(key);
}

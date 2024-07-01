import AsyncStorage from "@react-native-async-storage/async-storage";

export function getItem(key: string) {
  return AsyncStorage.getItem(key);
}

export function setItem(key: string, value: string) {
  const jsonValue = JSON.stringify(value);
  return AsyncStorage.setItem(key, jsonValue);
}

import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "AIONODJUNTA_TOKEN";
const USER_KEY = "AIONODJUNTA_USER";

export async function saveToken(token: string): Promise<void> {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function removeToken(): Promise<void> {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

export async function saveUser(user: unknown): Promise<void> {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getUser<T>(): Promise<T | null> {
  const data = await AsyncStorage.getItem(USER_KEY);

  if (!data) {
    return null;
  }

  return JSON.parse(data) as T;
}

export async function removeUser(): Promise<void> {
  await AsyncStorage.removeItem(USER_KEY);
}

export async function clearStorage(): Promise<void> {
  await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
}

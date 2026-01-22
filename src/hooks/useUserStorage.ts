import { useCallback } from "react";
import type { User } from "@/modules/users/utils/types";

const STORAGE_KEY_PREFIX = "lendsqr_user_";
const STORAGE_KEY_CURRENT = "lendsqr_current_user_id";

const getUserStorageKey = (userId: string): string => {
  return `${STORAGE_KEY_PREFIX}${userId}`;
};

const serializeUser = (user: User): string => {
  try {
    return JSON.stringify(user);
  } catch (error) {
    console.error("Failed to serialize user:", error);
    throw new Error("Failed to serialize user data");
  }
};

const deserializeUser = (data: string): User => {
  try {
    return JSON.parse(data) as User;
  } catch (error) {
    console.error("Failed to deserialize user:", error);
    throw new Error("Failed to parse user data");
  }
};

export interface UseStoreUserReturn {
  storeUser: (user: User) => void;
  isStored: (userId: string) => boolean;
}

export function useStoreUser(): UseStoreUserReturn {
  const storeUser = useCallback((user: User) => {
    try {
      const key = getUserStorageKey(user.id);
      const serialized = serializeUser(user);

      localStorage.setItem(key, serialized);

      localStorage.setItem(STORAGE_KEY_CURRENT, user.id);
    } catch (error) {
      console.error("Failed to store user:", error);
      throw error;
    }
  }, []);

  const isStored = useCallback((userId: string): boolean => {
    const key = getUserStorageKey(userId);
    return localStorage.getItem(key) !== null;
  }, []);

  return { storeUser, isStored };
}

export interface UseRetrieveUserReturn {
  retrieveUser: (userId: string) => User | null;
  getCurrentUserId: () => string | null;
}

export function useRetrieveUser(): UseRetrieveUserReturn {
  const retrieveUser = useCallback((userId: string): User | null => {
    try {
      const key = getUserStorageKey(userId);
      const data = localStorage.getItem(key);

      if (!data) {
        console.warn(`No user found with ID: ${userId}`);
        return null;
      }

      return deserializeUser(data);
    } catch (error) {
      console.error(`Failed to retrieve user ${userId}:`, error);
      return null;
    }
  }, []);

  const getCurrentUserId = useCallback((): string | null => {
    return localStorage.getItem(STORAGE_KEY_CURRENT);
  }, []);

  return { retrieveUser, getCurrentUserId };
}

export interface UseRemoveUserReturn {
  removeUser: (userId: string) => void;
  clearCurrentUser: () => void;
  clearAllUsers: () => void;
}

export function useRemoveUser(): UseRemoveUserReturn {
  const removeUser = useCallback((userId: string) => {
    try {
      const key = getUserStorageKey(userId);
      localStorage.removeItem(key);

      // If this was the current user, clear that too
      const currentUserId = localStorage.getItem(STORAGE_KEY_CURRENT);
      if (currentUserId === userId) {
        localStorage.removeItem(STORAGE_KEY_CURRENT);
      }
    } catch (error) {
      console.error(`Failed to remove user ${userId}:`, error);
    }
  }, []);

  const clearCurrentUser = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY_CURRENT);
  }, []);

  const clearAllUsers = useCallback(() => {
    try {
      const keys = Object.keys(localStorage);
      const userKeys = keys.filter((key) => key.startsWith(STORAGE_KEY_PREFIX));

      userKeys.forEach((key) => localStorage.removeItem(key));
      localStorage.removeItem(STORAGE_KEY_CURRENT);
    } catch (error) {
      console.error("Failed to clear users:", error);
    }
  }, []);

  return { removeUser, clearCurrentUser, clearAllUsers };
}

export interface UseUserStorageReturn {
  storeUser: (user: User) => void;
  retrieveUser: (userId: string) => User | null;
  removeUser: (userId: string) => void;
  isStored: (userId: string) => boolean;
  getCurrentUserId: () => string | null;
  clearCurrentUser: () => void;
  clearAllUsers: () => void;
}

export function useUserStorage(): UseUserStorageReturn {
  const { storeUser, isStored } = useStoreUser();
  const { retrieveUser, getCurrentUserId } = useRetrieveUser();
  const { removeUser, clearCurrentUser, clearAllUsers } = useRemoveUser();

  return {
    storeUser,
    retrieveUser,
    removeUser,
    isStored,
    getCurrentUserId,
    clearCurrentUser,
    clearAllUsers,
  };
}

export default useUserStorage;

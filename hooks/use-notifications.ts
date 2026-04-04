import { createContext, useCallback, useContext, useState } from "react";

export type NotificationVariant = "info" | "success" | "warning" | "error";

export interface Notification {
  body?: string;
  duration?: number;
  id: string;
  persistent?: boolean;
  read: boolean;
  timestamp: number;
  title: string;
  variant: NotificationVariant;
}

export interface NotificationsContextValue {
  clear: () => void;
  dismiss: (id: string) => void;
  markRead: (id: string) => void;
  notifications: Notification[];
  notify: (options: Omit<Notification, "id" | "read" | "timestamp">) => string;
}

let counter = 0;

export const NotificationsContext = createContext<NotificationsContextValue>({
  clear: () => {
    /* noop */
  },
  dismiss: () => {
    /* noop */
  },
  markRead: () => {
    /* noop */
  },
  notifications: [],
  notify: () => "",
});

export const useNotifications = (): NotificationsContextValue =>
  useContext(NotificationsContext);

export const useNotificationsProvider = (): NotificationsContextValue => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = useCallback(
    (options: Omit<Notification, "id" | "read" | "timestamp">) => {
      const id = `notif-${(counter += 1)}`;
      setNotifications((current) => [
        ...current,
        {
          ...options,
          id,
          read: false,
          timestamp: Date.now(),
        },
      ]);
      return id;
    },
    []
  );

  const dismiss = useCallback((id: string) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id)
    );
  }, []);

  const markRead = useCallback((id: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);

  const clear = useCallback(() => setNotifications([]), []);

  return { clear, dismiss, markRead, notifications, notify };
};

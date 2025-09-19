import { createContext, useContext, type ReactNode } from 'react';
import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationContextProps {
  openNotification: (
    type: NotificationType,
    title: string,
    description: string
  ) => void;
}

interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationContext = createContext<NotificationContextProps | null>(
  null
);

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: NotificationType, title: string, description: string) => {
    api[type]({
      message: title,
      description,
    });
  };

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotify = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotify must be used within NotificationProvider')
  }
  return context.openNotification;
};

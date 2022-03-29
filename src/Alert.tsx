import React, { useEffect } from 'react';
import { IItem, IAlert } from './types';

interface ListProps {
  alert: IAlert;
  list: IItem[];
  removeAlert: any;
}

const Alert: React.FC<ListProps> = ({ alert, removeAlert, list }) => {
  useEffect(() => {
    const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [list, removeAlert]);

  return <p className={`alert alert-${alert.typ}`}>{alert.msg}</p>;
};

export default Alert;

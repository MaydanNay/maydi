import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import DataRoomModal from '../components/DataRoomModal';

const DataRoomModalContext = createContext(null);

export function DataRoomModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openDataRoom = useCallback(() => setOpen(true), []);
  const closeDataRoom = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openDataRoom, closeDataRoom }),
    [open, openDataRoom, closeDataRoom],
  );

  return (
    <DataRoomModalContext.Provider value={value}>
      {children}
      <DataRoomModal open={open} onClose={closeDataRoom} />
    </DataRoomModalContext.Provider>
  );
}

export function useDataRoomModal() {
  const ctx = useContext(DataRoomModalContext);
  if (!ctx) {
    throw new Error('useDataRoomModal must be used within DataRoomModalProvider');
  }
  return ctx;
}

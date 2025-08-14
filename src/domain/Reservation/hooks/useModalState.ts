import { useCallback, useState } from 'react';

export const useModalState = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<
    'pending' | 'confirmed' | 'declined'
  >('pending');

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    isOpen,
    setIsOpen,
    activeTab,
    setActiveTab,
    handleClose,
    handleOpen,
  };
};

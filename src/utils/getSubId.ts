const LOCAL_STORAGE_KEY = 'cat_app_sub_id';

export const getOrCreateSubId = (): string => {
  try {
    const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (existing) return existing;

    const newId = crypto.randomUUID();
    localStorage.setItem(LOCAL_STORAGE_KEY, newId);
    return newId;
  } catch (error) {
    console.error('Unable to access localStorage:', error);
    return crypto.randomUUID();
  }
};


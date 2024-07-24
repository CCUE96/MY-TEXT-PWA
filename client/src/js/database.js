import { openDB } from 'idb';

// Initialize the database
const initDb = async () => {
  try {
    const db = await openDB('jate', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('jate')) {
          db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
          console.log('jate database created');
        }
      },
    });
    console.log('jate database initialized');
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Add or update content in the database
export const putDb = async (content) => {
  console.log('Adding to the database:', content);

  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.put({id:1, value:content});
    await tx.complete;
    console.log('Data added to IndexedDB:', content);
  } catch (error) {
    console.error('Error adding to database:', error);
    throw error;
  }
};

// Fetch all content from the database
export const getDb = async () => {
  console.log('Fetching data from the database');

  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const data = await store.getAll();
    return data;
  } catch (error) {
    console.error('Error fetching from database:', error);
    throw error;
  }
};

import { openDB } from 'idb';

// Function to initialize the IndexedDB database
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

// Function to add content to the IndexedDB
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

// Function to retrieve all content from the IndexedDB
export const getDb = async () => {
  console.log('Fetching data from the database');

  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const data = await store.getAll();
    console.log('Data fetched from IndexedDB:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data from database:', error);
    throw error;
  }
};

// Initialize the database when the script runs
initDb();

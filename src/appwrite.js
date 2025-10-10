import { Client, Databases, ID, Query } from 'appwrite';

// ✅ Environment variables (must be defined before use)
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;

const COLLECTION_SEARCHES = import.meta.env.VITE_SEARCHES_COLLECTION_ID;
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const KEY = import.meta.env.VITE_APPWRITE_API_KEY;

// ✅ Appwrite client setup
const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(PROJECT_ID);
  // .setKey(KEY);

// ✅ Initialize Appwrite services
const database = new Databases(client);

// ✅ Update search count or create a new record
export const updateSearchCount = async (searchTerm, movie) => {
  try {
    // Check if the search term already exists
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_SEARCHES, [
      Query.equal('searchTerm', searchTerm),
    ]);

    if (result.documents.length > 0) {
      // If it exists, increment count
      const doc = result.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_SEARCHES, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      // If not, create a new record
      await database.createDocument(DATABASE_ID, COLLECTION_SEARCHES, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error('Error updating search count:', error);
  }
};

// ✅ Fetch top trending movies (by search count)
export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_SEARCHES, [
      Query.orderDesc('count'),
      Query.limit(6),
    ]);
    return result.documents;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

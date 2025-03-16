import { Query } from "react-native-appwrite";
import { database } from "./appwrite";

const databaseService = {
  //list documents
  async listDocuments(databaseId: string, collectionId: string) {
    try {
      const response = await database.listDocuments(databaseId, collectionId);
      return response.documents || [];
    } catch (error) {
      console.log("Error fetching documents", error);
      return {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  },

  //create document
  async createDocument(
    databaseId: string,
    collectionId: string,
    data: any,
    id: string | null = null
  ) {
    try {
      return await database.createDocument(
        databaseId,
        collectionId,
        id || "",
        data
      );
    } catch (error) {
      console.log("Error creating document", error);
      return {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  },

  //update document
  async updateDocument(
    databaseId: string,
    collectionId: string,
    documentId: string,
    data: any
  ) {
    try {
      return await database.updateDocument(
        databaseId,
        collectionId,
        documentId,
        data
      );
    } catch (error) {
      console.log("Error updating document", error);
      return {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  },
};

export { databaseService };

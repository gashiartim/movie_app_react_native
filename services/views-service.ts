// export const updateSearchCount = async (query: string, movie: Movie) => {
//     try {
//       const result = await database.listDocuments(config.db, config.col.views, [
//         Query.equal("searchTerm", query),
//       ]);

//       if (result.documents.length > 0) {
//         const existingMovie = result.documents[0];
//         await database.updateDocument(
//           config.db,
//           config.col.views,
//           existingMovie.$id,
//           {
//             count: existingMovie.count + 1,
//           }
//         );
//       } else {
//         await database.createDocument(config.db, config.col.views, ID.unique(), {
//           searchTerm: query,
//           movie_id: movie.id,
//           title: movie.title,
//           count: 1,
//           poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//         });
//       }
//     } catch (error) {
//       console.error("Error updating search count:", error);
//       throw error;
//     }
//   };

//   export const getTrendingMovies = async () => {
//     try {
//       console.log("DATABASE_ID", config.db);
//       console.log("COLLECTION_ID", config.col.views);
//       const result = await database.listDocuments(config.db, config.col.views, [
//         Query.limit(5),
//         Query.orderDesc("count"),
//       ]);

//       return (result.documents as unknown as TrendingMovie[]) || [];
//     } catch (error) {
//       console.error(error);
//       return undefined;
//     }
//   };

import { ID, Query } from "react-native-appwrite";
import { config } from "./appwrite";
import { databaseService } from "./database-service";

const viewsService = {
  //get notes
  async getViews() {
    const response = await databaseService.listDocuments(
      config.db,
      config.col.views
    );

    if ((response as { error: string }).error) {
      return {
        error: (response as { error: string }).error,
      };
    }

    return {
      data: response,
    };
  },

  //create note
  async createView(view: TrendingMovie) {
    if (!view) {
      return {
        error: "View is required",
      };
    }

    const data = {
      ...view,
      createdAt: new Date().toISOString(),
    };

    const response = await databaseService.createDocument(
      config.db,
      config.col.views,
      data,
      ID.unique()
    );

    if ((response as { error: string }).error) {
      return {
        error: (response as { error: string }).error,
      };
    }

    return {
      data: response,
    };
  },

  async updateView(query: string) {
    return;
    if (!query) {
      return {
        error: "Query and movie are required",
      };
    }

    const result = (await databaseService.listDocuments(
      config.db,
      config.col.views
    )) as unknown as TrendingMovie[];

    const movie = result?.[0];

    if (!movie) {
      return {
        error: "Movie not found",
      };
    }

    const response = await databaseService.updateDocument(
      config.db,
      config.col.views,
      movie.movie_id.toString(),
      {
        count: movie.count + 1,
      }
    );

    if ((response as { error: string }).error) {
      return {
        error: (response as { error: string }).error,
      };
    }

    return {
      data: response,
    };
  },

  async getTrendingMovies() {
    const response = await databaseService.listDocuments(
      config.db,
      config.col.views
    );

    if ((response as { error: string }).error) {
      return {
        error: (response as { error: string }).error,
      };
    }

    return {
      data: response,
    };
  },
};
export { viewsService };

import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/movie-card";
import { useFetch } from "@/services/use-fetch";
import { fetchMovies } from "@/services/api";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/search-bar";
import { updateSearchCount } from "@/services/appwrite";

const Search = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: laodMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchTerm }), false);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchTerm.trim()) {
        await laodMovies();
      } else {
        reset();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (movies?.results.length > 0 && movies?.results[0]) {
      updateSearchCount(searchTerm, movies?.results[0]);
    }
  }, [movies]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies?.results}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchTerm}
                onChangeText={handleSearch}
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator size="large" color="#0000FF" />
            )}
            {moviesError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {moviesError?.message}
              </Text>
            )}

            {!moviesLoading &&
              !moviesError &&
              searchTerm.trim() &&
              movies?.results.length !== 0 && (
                <Text className="text-white px-5 my-3">
                  Search results for:{" "}
                  <Text className="text-accent">{searchTerm}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchTerm.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;

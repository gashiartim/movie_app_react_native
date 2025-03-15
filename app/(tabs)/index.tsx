import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useFetch } from "@/services/use-fetch";
import { fetchMovies } from "@/services/api";
import { Fragment, useState } from "react";
import MovieCard from "@/components/movie-card";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/trending-card";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies, true);

  const {
    data: movies,
    loading: movieLoading,
    error: movieError,
  } = useFetch(() => fetchMovies({ query: "" }), true);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {movieLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000FF"
            className="mt-10 self-center"
          />
        ) : movieError || trendingError ? (
          <Text className="text-red-500 text-center text-lg">
            Error: {movieError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
              </View>
            )}

            <FlatList
              horizontal
              className="mb-4 mt-3"
              keyExtractor={(item) => item.movie_id.toString()}
              data={trendingMovies}
              renderItem={({ item, index }) => (
                <TrendingCard index={index} movie={item} />
              )}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="w-4" />}
            />

            <Fragment>
              <Text className="text-lg text-white font-bold mt-5 mb -3">
                Latest Movies
              </Text>
            </Fragment>

            <FlatList
              keyExtractor={({ id }) => id.toString()}
              data={movies?.results}
              renderItem={({ item }) => <MovieCard {...item} />}
              columnWrapperClassName="flex-row justify-between"
              numColumns={3}
              contentContainerStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

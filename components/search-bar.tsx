import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface SearchBarProps {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({
  onPress,
  placeholder,
  value,
  onChangeText,
}: SearchBarProps) => {
  return (
    <View className="flex-row items-center justify-between bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#ab8bff"
        onPress={onPress}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;

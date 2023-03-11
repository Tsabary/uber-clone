import { Text, FlatList, TouchableOpacity, View } from "react-native";
import React from "react";
import { HomeIcon, BriefcaseIcon } from "react-native-heroicons/solid";

const data = [
  {
    id: "123",
    icon: <HomeIcon size={18} color="white" />,
    location: "Home",
    destination: "34 Happardes Street, Gannot, Israel",
  },
  {
    id: "456",
    icon: <BriefcaseIcon size={18} color="white" />,
    location: "Work",
    destination: "12 Alenbi Street, Tel-Aviv, Israel",
  },
];

const NavFavourites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => {
        return <View className="bg-gray-200" style={{ height: 0.5 }} />;
      }}
      renderItem={({ item: { location, destination, icon } }) => {
        return (
          <TouchableOpacity className="flex-row items-center p-5">
            <View className="mr-4 rounded-full bg-gray-300 p-3">{icon}</View>

            <View>
              <Text className="font-semibold text-lg">{location}</Text>
              <Text className="text-gray-500">{destination}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default NavFavourites;

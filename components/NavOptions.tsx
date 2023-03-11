import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ArrowRightCircleIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../redux/hooks";
import { selectOrigin } from "../redux/slices/navSlice";

const data = [
  {
    id: "123",
    title: "Get a Ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order Food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useAppSelector(selectOrigin);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("MapScreen" as never)}
          className="p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-30"
          disabled={!origin}
        >
          <View className={`${!origin && "opacity-20"}`}>
            <Image
              source={{
                uri: item.image,
              }}
              style={{ width: 100, height: 100, resizeMode: "contain" }}
            />
            <Text className="mt-2 text-lg font-semibold mb-4">
              {item.title}
            </Text>
            <ArrowRightCircleIcon size={38} color="black" />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;

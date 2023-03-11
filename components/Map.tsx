import React, { useRef, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../redux/slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_API_KEY } from "@env";

const Map = () => {
  const dispatch = useAppDispatch();
  const origin = useAppSelector(selectOrigin);
  const destination = useAppSelector(selectDestination);
  const mapRef = useRef<any | null>(null);

  useEffect(() => {
    if (!origin || !destination) return;
    // Zoom & fit to markers
    let timeout = setTimeout(() => {
      mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { top: 75, right: 75, bottom: 75, left: 75 },
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) =>
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
        );
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_API_KEY]);

  if (!origin?.location?.lat || !origin?.location?.lng) return <></>;

  return (
    <MapView
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      mapType="mutedStandard"
      className="flex-1"
      ref={mapRef}
    >
      <Marker
        coordinate={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
        }}
        title="Origin"
        description={origin.description}
        identifier="origin"
      />

      {destination && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destionation"
          description={destination.description}
          identifier="destination"
        />
      )}

      {destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
    </MapView>
  );
};

export default Map;

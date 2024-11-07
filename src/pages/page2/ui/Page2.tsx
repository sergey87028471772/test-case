import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";

import { LatLng, LeafletMouseEvent } from "leaflet";

import "leaflet/dist/leaflet.css";

type IGeoSearchResult = {
  lat: number;
  lng: number;
  lon: number;
  display_name: string;
};

export function Page2() {
  const { t } = useTranslation();

  const [position, setPosition] = useState<LatLng | null>(null);
  const [address, setAddress] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IGeoSearchResult[]>([]);
  const [controller, setController] = useState<AbortController | null>(null);

  useEffect(() => {
    if (position) {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data?.display_name) {
            setAddress(data.display_name);
          }
        })
        .catch((error) => {
          console.error("Ошибка при выполнении запроса:", error);
        });
    }
  }, [position]);

  const handleInputClick = useCallback(() => {
    setAddress("");
  }, []);

  const handleSearch = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const query = e.target.value;

        setAddress("");
        setSearchQuery(query);

        if (query.trim().length < 4) {
          setSearchResults([]);
          return;
        }

        if (controller) {
          controller.abort();
        }

        const newController = new AbortController();

        setController(newController);

        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json`;

        const response = await fetch(url, {
          signal: newController.signal,
        });

        const results = await response.json();

        if (Array.isArray(results)) {
          setSearchResults(results.slice(0, 10));
        } else {
          console.error("Invalid response structure:", results);
        }
      } catch (error: unknown) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Запрос был отменен");
        } else {
          console.error("An unknown error occurred");
        }
      }
    },
    [controller]
  );

  const handleSelectResult = useCallback((result: IGeoSearchResult) => {
    setSearchQuery("");
    setSearchResults([]);
    setAddress(result.display_name);
    setPosition(new LatLng(result.lat, result.lon));
  }, []);

  return (
    <div>
      <input
        type="text"
        value={searchQuery.length ? searchQuery : address}
        onClick={handleInputClick}
        onChange={handleSearch}
        placeholder={t("addressPlaceholder")}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      {searchResults.length > 0 && (
        <ul style={{ padding: 0, margin: 0, listStyleType: "none" }}>
          {searchResults.map((result, index) => (
            <li
              key={index}
              onClick={handleSelectResult.bind(null, result)}
              style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor: "#f4f4f4",
                marginBottom: "5px",
              }}
            >
              {result.display_name}
            </li>
          ))}
        </ul>
      )}

      {useMemo(
        () => (
          <MapContainer
            center={[51.505, -0.09]}
            zoom={10}
            style={{ height: "500px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {position && (
              <Marker position={position}>
                <Popup>{address}</Popup>
              </Marker>
            )}

            <MapEvents position={position} setPosition={setPosition} />
          </MapContainer>
        ),
        [position]
      )}
    </div>
  );
}

function MapEvents({
  position,
  setPosition,
}: {
  position: LatLng | null;
  setPosition: React.Dispatch<React.SetStateAction<LatLng | null>>;
}) {
  const minimap = useMap();

  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      setPosition(e.latlng);
    },
  });

  minimap.setView(position || [51.505, -0.09], 10);

  return null;
}

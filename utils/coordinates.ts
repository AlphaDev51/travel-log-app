// utils/coordinates.ts

export async function getUserLocation(): Promise<{ coordinates: [number, number]; zoom: number }> {
  try {
    const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
    if (!response.ok)
      throw new Error(`Erreur API : ${response.status}`);

    const data = await response.json();

    const lng = Number.parseFloat(data.longitude);
    const lat = Number.parseFloat(data.latitude);

    if (Number.isNaN(lng) || Number.isNaN(lat))
      throw new Error("Invalid Data");

    return {
      coordinates: [lng, lat],
      zoom: 6,
    };
  }
  catch (error) {
    console.error("Error API: ", error);

    return {
      coordinates: [2.3522, 48.8566],
      zoom: 4,
    };
  }
}

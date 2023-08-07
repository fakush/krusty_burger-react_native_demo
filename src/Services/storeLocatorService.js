// Function to calculate distance between two coordinates (using Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Earth's radius in kilometers

    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c; // Distance in kilometers
    return distance;

}

// Function to find the closest location
function findClosestLocation(userLatitude, userLongitude, locationsData, searchRadius) {
    let closestLocation = null;
    let closestDistance = Infinity;

    for (const locationKey in locationsData) {
        const location = locationsData[locationKey];
        const locationLatitude = location.coordinates.latitude;
        const locationLongitude = location.coordinates.longitude;

        const distance = calculateDistance(
            userLatitude,
            userLongitude,
            locationLatitude,
            locationLongitude
        );

        if (distance < closestDistance) {
            closestLocation = location;
            closestDistance = distance;
        }
    }

    if (closestLocation) {
        return closestLocation;
    } else {
        // No location found in the current searchRadius
        if (searchRadius < 200) {
            // Expand the search radius and try again
            const expandedRadius = searchRadius === 5 ? 50 : 200;
            return findClosestLocation(userLatitude, userLongitude, locationsData, expandedRadius);
        } else {
            // No location found even with a 200-kilometer search radius
            return null;
        }
    }
}

// Sample usage
const userLatitude = -27.5; // Replace with user's latitude
const userLongitude = -55.8; // Replace with user's longitude

// Calculate initial bounding box coordinates with a 5-kilometer radius
const initialSearchRadius = 5;
const latitudeDelta = initialSearchRadius / 111.2;
const longitudeDelta = initialSearchRadius / (111.2 * Math.cos(userLatitude * (Math.PI / 180)));

// Define the initial bounding box coordinates
const minLatitude = userLatitude - latitudeDelta;
const maxLatitude = userLatitude + latitudeDelta;
const minLongitude = userLongitude - longitudeDelta;
const maxLongitude = userLongitude + longitudeDelta;

// Replace this URL with your actual Firebase Realtime Database URL and 'locations' with your data path
const firebaseDatabaseUrl = `${process.env.EXPO_PUBLIC_REALTIME_DB_URL}locations.json?orderBy="coordinates/latitude"&startAt=${minLatitude}&endAt=${maxLatitude}`;

fetch(firebaseDatabaseUrl)
    .then((response) => response.json())
    .then((data) => {
        // Filter the locations within the initial bounding box
        const locationsWithinRadius = Object.values(data).filter((location) => {
            const locationLatitude = location.coordinates.latitude;
            const locationLongitude = location.coordinates.longitude;

            return (
                locationLatitude >= minLatitude &&
                locationLatitude <= maxLatitude &&
                locationLongitude >= minLongitude &&
                locationLongitude <= maxLongitude
            );
        });

        const closestLocation = findClosestLocation(
            userLatitude,
            userLongitude,
            locationsWithinRadius,
            initialSearchRadius
        );

        if (closestLocation) {
            console.log("Closest location:", closestLocation);
        } else {
            console.log("No location found within 200 kilometers.");
        }
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });

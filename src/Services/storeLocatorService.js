import { EXPO_PUBLIC_REALTIME_DB_URL } from "@env";

const firebaseDatabaseUrl = EXPO_PUBLIC_REALTIME_DB_URL;
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

export async function getClosestLocation(userLatitude, userLongitude) {
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
    const firebaseDatabase = `${firebaseDatabaseUrl}krusty_locales.json?orderBy="coordinates/latitude"&startAt=${minLatitude}&endAt=${maxLatitude}`;

    const response = fetch(firebaseDatabase)
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

            const dataList = Object.values(data);

            if (closestLocation) {
                return { closestLocation: closestLocation, storeList: dataList };
            } else {
                return {
                    closestLocation: {
                        name: 'Krusty Oil Rig Store',
                        description: 'There is a Krusty Store near you!',
                        latitude: -34.452026,
                        longitude: -58.468837,
                        address: 'Krusty Oil Rig Store, first floor, Krusty Oil Rig, Kru',
                        city: 'Caiman Islands',
                    }, storeList: dataList
                };
            }
        })
        .catch((error) => {
            throw error;
        });

    return response;
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export function getDistance(lat1, lon1, lat2, lon2) {
    console.log('lat1', lat1, 'lon1', lon1, 'lat2', lat2, 'lon2', lon2);
    const earthRadiusKm = 6371; // Radius of the Earth in kilometers
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusKm * c;
    console.log('distance', Number(distance.toFixed(2)));
    return distance.toFixed(2);
}
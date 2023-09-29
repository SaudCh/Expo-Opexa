import * as Location from 'expo-location';

export function useLocation() {

    const getLocationPrm = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return false;
        } else {
            return true;
        }
    }

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return false;
        }

        let location = await Location.getCurrentPositionAsync({});

        return location

    }

    return { getLocationPrm, getLocation }
}

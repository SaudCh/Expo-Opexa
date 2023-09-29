import { StyleSheet, Text } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
const lookup = require("country-data").lookup;

import { Colors } from "../../constants/colors";

export default function LocationPicker({
    setCity,
    setCountry,
    setCountryCode,
    placeholder = "Search Location",
}) {
    const googleMapsApiKey = "AIzaSyAAiHAxjFI2ffpILQjeKNosK4qiypuePDs";

    return (
        <GooglePlacesAutocomplete
            placeholder={placeholder}
            onPress={(data, details = null) => {
                const { main_text, secondary_text } = data.structured_formatting;

                // TODO - find better way to get country code
                let country = lookup.countries({ name: secondary_text })[0];

                setCity(main_text);
                setCountry(secondary_text);
                setCountryCode(country?.alpha2 ? country?.alpha2 : "");
            }}
            query={{
                key: googleMapsApiKey,
                language: "en",
                types: "(cities)",
            }}
            styles={{
                textInputContainer: styles.placesTextInputContainer,
                textInput: styles.placesTextInput,
            }}
        />
    );
}

const styles = StyleSheet.create({
    placesTextInputContainer: {
        borderWidth: 2,
        borderColor: Colors.grey,
        borderRadius: 18,
        paddingHorizontal: 10,
        height: 50,
        width: "100%",
    },
    placesTextInput: {
        fontSize: 16,
        backgroundColor: "transparent",
        fontFamily: "Circular",
        color: '#000',
    },
});

import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Button } from 'react-native-paper';
import { Colors } from '../../constants/colors';
import { useLocation } from '../../hooks/useLocation';


const live = require("../../assets/currentLocation.png")

export default function Location({
    setLocation,
    location,
    editable = false
}) {

    const [visible, setIsVisible] = useState(false)

    const { getLocation } = useLocation()

    const mapView = useRef()

    const onRegionChange = region => {
        setLocation(region)
    }

    useEffect(() => {
        const getLocations = async () => {



            setLocation({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            })


        }

        getLocations()
    }, [])

    return (
        <View>
            <View>
                <TouchableOpacity
                    onPress={() => {
                        setIsVisible(true)
                    }}
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        height: 150,
                        position: 'absolute',
                        zIndex: 12,
                        width: '100%',
                    }}
                />
                <MapView
                    showsUserLocation={true}
                    style={{
                        width: '100%',
                        height: 150
                    }}
                    region={location}

                >
                    <Marker
                        coordinate={location ? location : {
                            latitude: 0,
                            longitude: 0
                        }
                        }
                    ></Marker>
                </MapView>
            </View>

            <Modal
                visible={visible}
                onDismiss={() => {
                    setIsVisible(false)
                }}
                contentContainerStyle={{
                    backgroundColor: 'white',
                    padding: 20,
                    marginTop: 200,
                    paddingTop: 200,
                    borderRadius: 10,
                    zIndex: 10
                }}
                transparent={true}
            >
                <View style={{
                    flex: 1
                }}>
                    <View
                        style={{
                            zIndex: 100,
                            width: "95%",
                            position: "absolute",
                            top: Platform.OS == 'ios' ? 39 : 10,
                            left: 10,
                        }}
                    >
                        <GooglePlacesAutocomplete
                            placeholder=" 🔍 Search Location"
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                console.log(data, details);
                                setLocation({
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01
                                })
                                mapView.current.animateToRegion({
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01
                                })

                            }}

                            query={{
                                key: 'AIzaSyCGUIMlKCFppWibe8WcvISdzsErTiHmquE',
                                language: 'en',
                            }}

                        />

                    </View>
                    <MapView
                        ref={mapView}
                        style={{
                            width: '100%',
                            flex: 1
                        }}
                        initialRegion={location}
                        onRegionChangeComplete={onRegionChange}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        // followsUserLocation={true}
                        showsCompass={true}
                        scrollEnabled={true}
                        zoomEnabled={true}
                        pitchEnabled={true}
                        rotateEnabled={true}

                    >

                        {/* <Marker
                        coordinate={location}
                    >
                        <Image source={live} style={{ height: 50, width: 50, resizeMode: 'contain' }} />
                    </Marker> */}

                    </MapView>

                    {/* Final pointer */}
                    <View style={styles.markerFixed}>
                        <Image style={styles.marker} source={live} />
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginTop: 10,
                            position: 'absolute',
                            bottom: 0,
                            paddingVertical: 15,
                            width: '100%',
                            backgroundColor: 'rgba(255,255,255,0.5)'
                        }}
                    >
                        <Button
                            onPress={() => {
                                setIsVisible(false)
                            }}
                            mode="outlined"
                            style={{
                                borderColor: Colors.primary
                            }}
                        >
                            Close
                        </Button>
                        <Button
                            onPress={() => {
                                setIsVisible(false)
                            }}
                            mode="contained"
                            style={{
                                backgroundColor: Colors.primary
                            }}
                        >
                            Add Location
                        </Button>
                    </View>
                </View>
            </Modal >
        </View >
    )
}

const styles = StyleSheet.create({
    markerFixed: {
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '50%',
    },
    marker: {
        height: 40,
        width: 40
    },
})
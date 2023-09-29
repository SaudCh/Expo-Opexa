import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, Platform, Linking } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Button } from 'react-native-paper';
import { Colors } from '../../constants/colors';
import { useLocation } from '../../hooks/useLocation';


const live = require("../../assets/currentLocation.png")

export default function LocationInfo({
    location
}) {

    const [visible, setIsVisible] = useState(false)

    const mapView = useRef()

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
                    <MapView
                        ref={mapView}
                        style={{
                            width: '100%',
                            flex: 1
                        }}
                        initialRegion={location}
                        showsUserLocation={true}
                    >

                        <Marker
                            coordinate={location ? location : {
                                latitude: 0,
                                longitude: 0
                            }
                            }

                        ></Marker>

                    </MapView>

                    {/* Final pointer */}
                    {/* <View style={styles.markerFixed}>
                        <Image style={styles.marker} source={live} />
                    </View> */}

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
                                Linking.openURL(
                                    Platform.select({
                                        ios: `maps:0,0?q=${location.latitude},${location.longitude}`,
                                        android: `geo:0,0?q=${location.latitude},${location.longitude}`,
                                    })
                                )
                            }
                            }
                            mode="contained"
                        >
                            Get Directions
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
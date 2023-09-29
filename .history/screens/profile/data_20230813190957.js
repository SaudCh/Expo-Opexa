import { Ionicons, MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';

export const options = [
    {
        title: 'Wallet',
        screen: 'Wallet',
        private: true,
        icon: <Ionicons name="wallet-outline" size={24} color="black" />
    },
    // {
    //     title: 'My Orders',
    //     screen: 'MyOrders',
    //     icon: <Ionicons name="receipt-outline" size={24} color="black" />
    // },
    {
        title: 'Biding Requests',
        screen: 'BidingRequest',
        private: true,
        icon: <Ionicons name="receipt-outline" size={24} color="black" />
    },
    {
        title: 'Expert Options',
        screen: 'ExpertOption',
        private: true,
        icon: <Entypo name="star-outlined" size={24} color="black" />
    },
    // {
    //     title: 'Barter Requests',
    //     screen: 'BarterRequest',
    //     icon: <FontAwesome name="handshake-o" size={24} color="black" />
    // },
    {
        line: true,
        private: true,

    },
    {
        title: 'Language',
        screen: 'LanguageScreen',
        icon: <Ionicons name="language-outline" size={24} color="black" />
    },
    {
        title: 'Location',
        screen: 'LocationScreen',
        icon: <Ionicons name="location-outline" size={24} color="black" />
    },
    {
        title: 'Privacy',
        screen: 'Privacy',
        icon: <Ionicons name="shield-checkmark-sharp" size={24} color="black" />
    },
    {
        line: true
    },
    {
        title: 'Help',
        screen: 'Help',
        icon: <Ionicons name="help-circle-outline" size={24} color="black" />
    }
]
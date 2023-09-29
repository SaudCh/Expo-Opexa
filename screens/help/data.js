import { Ionicons, Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export const options = [
    {
        title: 'Help Center',
        screen: 'HelpCenter',
        icon: <AntDesign name="customerservice" size={24} color="black" />
    },
    {
        title: 'Feedback',
        screen: 'Feedback',
        icon: <MaterialIcons name="feedback" size={24} color="black" />
    },
    {
        title: 'Terms & Conditions',
        screen: 'Terms',
        icon: <Ionicons name="newspaper-outline" size={24} color="black" />
    },
    {
        title: 'Privacy Policy',
        screen: 'PrivacyPolicy',
        icon: <MaterialIcons name="policy" size={24} color="black" />
    }
]
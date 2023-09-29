import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
    <Svg
        width={52}
        height={53}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M10.74 26.15c0-11.2 7.84-16.52 15.47-16.52 7.7 0 15.54 5.32 15.54 16.52s-7.84 16.52-15.54 16.52c-7.63 0-15.47-5.32-15.47-16.52Zm-10.01.07c0 15.96 12.04 25.83 25.48 25.83 13.51 0 25.55-9.87 25.55-25.83 0-16.03-12.04-25.9-25.55-25.9C12.77.32.73 10.19.73 26.22Z"
            fill="#10B981"
        />
    </Svg>
)

export default SvgComponent

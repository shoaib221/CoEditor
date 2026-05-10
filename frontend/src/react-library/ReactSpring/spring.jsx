import React from "react";
import { useSpring, animated } from "@react-spring/web";


export const FadeInBox = () => {

    const styles = useSpring({
        from: { opacity: 0, transform: "translateY(-500px)" },
        to: { opacity: 1, transform: "translateY(0)" },
        config: { tension: 120, friction: 14 }, // controls the "spring feel"
    });

    return <animated.div style={styles} className="w-32 h-32 bg-blue-500 rounded-lg" />;
}





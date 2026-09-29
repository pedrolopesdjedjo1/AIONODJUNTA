import * as SplashScreen from "expo-splash-screen";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  Keyframe,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const DURATION = 700;

const splashKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 1 }],
    opacity: 1,
  },
  20: {
    opacity: 1,
  },
  70: {
    opacity: 0,
    easing: Easing.out(Easing.ease),
  },
  100: {
    opacity: 0,
    transform: [{ scale: 1.05 }],
    easing: Easing.out(Easing.ease),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 0.7 }],
    opacity: 0,
  },
  45: {
    transform: [{ scale: 1.08 }],
    opacity: 1,
    easing: Easing.out(Easing.ease),
  },
  100: {
    transform: [{ scale: 1 }],
    opacity: 1,
  },
});

const backgroundKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 0.8 }],
    opacity: 0,
  },
  100: {
    transform: [{ scale: 1 }],
    opacity: 1,
    easing: Easing.out(Easing.ease),
  },
});

export function AnimatedSplashOverlay() {
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  const logo = (
    <View style={styles.logoCircle}>
      <Text style={styles.logoLetter}>A</Text>
    </View>
  );

  if (!animate) {
    return (
      <View
        onLayout={() => {
          SplashScreen.hideAsync().finally(() => {
            setAnimate(true);
          });
        }}
        style={styles.splashOverlay}
      >
        <Animated.View
          entering={backgroundKeyframe.duration(DURATION)}
          style={styles.backgroundCircle}
        />

        <Animated.View
          entering={logoKeyframe.duration(DURATION)}
          style={styles.logoContainer}
        >
          {logo}
        </Animated.View>

        <Text style={styles.appName}>AIONÔDJUNTA</Text>
        <Text style={styles.tagline}>Serviços financeiros</Text>
      </View>
    );
  }

  return (
    <Animated.View
      entering={splashKeyframe
        .duration(DURATION)
        .withCallback((finished) => {
          "worklet";

          if (finished) {
            scheduleOnRN(setVisible, false);
          }
        })}
      style={styles.splashOverlay}
    >
      <View style={styles.backgroundCircle} />

      <View style={styles.logoContainer}>
        {logo}
      </View>

      <Text style={styles.appName}>AIONÔDJUNTA</Text>
      <Text style={styles.tagline}>Serviços financeiros</Text>
    </Animated.View>
  );
}

export function AnimatedIcon() {
  return (
    <View style={styles.iconContainer}>
      <Animated.View
        entering={backgroundKeyframe.duration(DURATION)}
        style={styles.iconBackground}
      />

      <Animated.View
        entering={logoKeyframe.duration(DURATION)}
        style={styles.iconLogoContainer}
      >
        <View style={styles.iconLogoCircle}>
          <Text style={styles.iconLogoLetter}>A</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  splashOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#F5F8F6",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },

  backgroundCircle: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: "#D9F2E5",
  },

  logoContainer: {
    width: 112,
    height: 112,
    borderRadius: 32,
    backgroundColor: "#087A55",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#075B40",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  logoCircle: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  logoLetter: {
    color: "#087A55",
    fontSize: 46,
    fontWeight: "900",
  },

  appName: {
    color: "#14251F",
    fontSize: 21,
    fontWeight: "900",
    letterSpacing: 1.1,
    marginTop: 22,
  },

  tagline: {
    color: "#6B7C74",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
  },

  iconContainer: {
    width: 128,
    height: 128,
    alignItems: "center",
    justifyContent: "center",
  },

  iconBackground: {
    position: "absolute",
    width: 128,
    height: 128,
    borderRadius: 38,
    backgroundColor: "#087A55",
  },

  iconLogoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  iconLogoCircle: {
    width: 78,
    height: 78,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  iconLogoLetter: {
    color: "#087A55",
    fontSize: 48,
    fontWeight: "900",
  },
});


import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const COLORS = {
  background: "#F5F8F6",
  primary: "#087A55",
  primaryDark: "#075B40",
  text: "#14251F",
  secondary: "#6B7C74",
  white: "#FFFFFF",
  border: "#E2EAE5",
  accent: "#D9F2E5",
};

export default function WelcomeScreen() {
  function handleEnter() {
    Alert.alert(
      "AIONÔDJUNTA",
      "O módulo de autenticação será configurado no próximo passo."
    );
  }

  function handleCreateAccount() {
    Alert.alert(
      "AIONÔDJUNTA",
      "O registo de utilizadores será configurado no próximo passo."
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>A</Text>
          </View>

          <Text style={styles.brandName}>AIONÔDJUNTA</Text>
        </View>

        <View style={styles.hero}>
          <View style={styles.illustration}>
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle}>
                <Text style={styles.currencySymbol}>XOF</Text>

                <View style={styles.currencyLine} />

                <Text style={styles.currencyText}>
                  A tua vida financeira
                </Text>
              </View>
            </View>

            <View style={styles.smallCircleTop}>
              <Text style={styles.smallCircleText}>+</Text>
            </View>

            <View style={styles.smallCircleBottom}>
              <Text style={styles.smallCircleText}>✓</Text>
            </View>
          </View>

          <Text style={styles.title}>
            O teu dinheiro,{"\n"}
            <Text style={styles.titleAccent}>
              mais perto.
            </Text>
          </Text>

          <Text style={styles.description}>
            Uma nova forma de gerir o teu dinheiro,
            fazer pagamentos e enviar valores
            com praticidade.
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={handleEnter}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              Entrar
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={handleCreateAccount}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.secondaryButtonText}>
              Criar conta
            </Text>
          </Pressable>

          <Text style={styles.footer}>
            AIONÔDJUNTA · Serviços financeiros
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 18,
    paddingBottom: 20,
    justifyContent: "space-between",
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },

  brandMark: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  brandMarkText: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: "800",
  },

  brandName: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
  },

  hero: {
    alignItems: "center",
    paddingVertical: 20,
  },

  illustration: {
    width: 230,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },

  outerCircle: {
    width: 196,
    height: 196,
    borderRadius: 98,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },

  innerCircle: {
    width: 148,
    height: 148,
    borderRadius: 74,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },

  currencySymbol: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 1,
  },

  currencyLine: {
    width: 42,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#8DE0B5",
    marginVertical: 9,
  },

  currencyText: {
    color: COLORS.white,
    fontSize: 10,
    textAlign: "center",
  },

  smallCircleTop: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  smallCircleBottom: {
    position: "absolute",
    bottom: 10,
    left: 12,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  smallCircleText: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: "700",
  },

  title: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 40,
    letterSpacing: -0.7,
  },

  titleAccent: {
    color: COLORS.primary,
  },

  description: {
    maxWidth: 310,
    color: COLORS.secondary,
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 16,
  },

  actions: {
    width: "100%",
    gap: 12,
  },

  primaryButton: {
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },

  secondaryButton: {
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    color: COLORS.primaryDark,
    fontSize: 16,
    fontWeight: "700",
  },

  buttonPressed: {
    opacity: 0.75,
  },

  footer: {
    color: COLORS.secondary,
    fontSize: 11,
    textAlign: "center",
    marginTop: 12,
  },
});

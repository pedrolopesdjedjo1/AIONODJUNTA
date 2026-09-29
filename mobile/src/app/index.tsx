import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
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
  accentDark: "#8DE0B5",
};

export default function WelcomeScreen() {
  const { height, width } = useWindowDimensions();

  const compact = height < 740;
  const smallScreen = width < 360;

  function handleEnter() {
    Alert.alert(
      "Entrar",
      "O acesso à tua conta AIONÔDJUNTA será configurado na próxima etapa."
    );
  }

  function handleCreateAccount() {
    Alert.alert(
      "Criar conta",
      "O cadastro da tua conta AIONÔDJUNTA será configurado na próxima etapa."
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            minHeight: height,
            paddingHorizontal: smallScreen ? 20 : 26,
            paddingTop: compact ? 12 : 20,
            paddingBottom: compact ? 16 : 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* MARCA */}
          <View style={styles.topBar}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>A</Text>
            </View>

            <View style={styles.brandTextContainer}>
              <Text style={styles.brandName}>AIONÔDJUNTA</Text>

              <Text style={styles.brandSubtitle}>
                SERVIÇOS FINANCEIROS
              </Text>
            </View>
          </View>

          {/* ÁREA PRINCIPAL */}
          <View
            style={[
              styles.hero,
              {
                paddingVertical: compact ? 12 : 22,
              },
            ]}
          >
            <View
              style={[
                styles.illustration,
                {
                  width: compact ? 190 : 230,
                  height: compact ? 185 : 220,
                  marginBottom: compact ? 18 : 28,
                },
              ]}
            >
              <View
                style={[
                  styles.outerCircle,
                  {
                    width: compact ? 164 : 196,
                    height: compact ? 164 : 196,
                    borderRadius: compact ? 82 : 98,
                  },
                ]}
              >
                <View
                  style={[
                    styles.innerCircle,
                    {
                      width: compact ? 124 : 148,
                      height: compact ? 124 : 148,
                      borderRadius: compact ? 62 : 74,
                    },
                  ]}
                >
                  <Text style={styles.currencySymbol}>XOF</Text>

                  <View style={styles.currencyLine} />

                  <Text style={styles.currencyText}>
                    A tua vida financeira
                  </Text>
                </View>
              </View>

              {/* ÍCONE SUPERIOR */}
              <View
                style={[
                  styles.smallCircleTop,
                  {
                    width: compact ? 40 : 48,
                    height: compact ? 40 : 48,
                    borderRadius: compact ? 20 : 24,
                  },
                ]}
              >
                <Text style={styles.smallCircleText}>+</Text>
              </View>

              {/* ÍCONE INFERIOR */}
              <View
                style={[
                  styles.smallCircleBottom,
                  {
                    width: compact ? 40 : 46,
                    height: compact ? 40 : 46,
                    borderRadius: compact ? 20 : 23,
                  },
                ]}
              >
                <Text style={styles.checkMark}>✓</Text>
              </View>
            </View>

            <Text
              style={[
                styles.title,
                {
                  fontSize: smallScreen
                    ? 29
                    : compact
                      ? 31
                      : 34,
                },
              ]}
            >
              O teu dinheiro,{"\n"}
              <Text style={styles.titleAccent}>mais perto.</Text>
            </Text>

            <Text style={styles.description}>
              Uma nova forma de gerir o teu dinheiro,
              fazer pagamentos e enviar valores
              com praticidade e segurança.
            </Text>

            {/* SERVIÇOS */}
            <View style={styles.featureRow}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>↗</Text>

                <Text style={styles.featureText}>
                  Transferências
                </Text>
              </View>

              <View style={styles.featureDivider} />

              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>

                <Text style={styles.featureText}>
                  Pagamentos
                </Text>
              </View>
            </View>
          </View>

          {/* BOTÕES */}
          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Entrar na tua conta AIONÔDJUNTA"
              onPress={handleEnter}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>
                Entrar
              </Text>

              <Text style={styles.buttonArrow}>→</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Criar uma conta AIONÔDJUNTA"
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

            <Text style={styles.footerNote}>
              A tua vida financeira, mais simples.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },

  brandMark: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  brandMarkText: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: "800",
  },

  brandTextContainer: {
    gap: 3,
  },

  brandName: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.7,
  },

  brandSubtitle: {
    color: COLORS.secondary,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  hero: {
    alignItems: "center",
  },

  illustration: {
    alignItems: "center",
    justifyContent: "center",
  },

  outerCircle: {
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },

  innerCircle: {
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  currencySymbol: {
    color: COLORS.white,
    fontSize: 29,
    fontWeight: "800",
    letterSpacing: 1,
  },

  currencyLine: {
    width: 42,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.accentDark,
    marginVertical: 9,
  },

  currencyText: {
    color: COLORS.white,
    fontSize: 10,
    textAlign: "center",
  },

  smallCircleTop: {
    position: "absolute",
    top: 8,
    right: 5,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  smallCircleBottom: {
    position: "absolute",
    bottom: 5,
    left: 5,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  smallCircleText: {
    color: COLORS.primary,
    fontSize: 25,
    fontWeight: "700",
  },

  checkMark: {
    color: COLORS.primary,
    fontSize: 23,
    fontWeight: "800",
  },

  title: {
    color: COLORS.text,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 41,
    letterSpacing: -0.8,
  },

  titleAccent: {
    color: COLORS.primary,
  },

  description: {
    maxWidth: 310,
    color: COLORS.secondary,
    fontSize: 14,
    lineHeight: 23,
    textAlign: "center",
    marginTop: 14,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
    gap: 18,
  },

  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  featureIcon: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: "800",
  },

  featureText: {
    color: COLORS.primaryDark,
    fontSize: 12,
    fontWeight: "600",
  },

  featureDivider: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.border,
  },

  actions: {
    width: "100%",
    gap: 12,
  },

  primaryButton: {
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingHorizontal: 20,
  },

  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },

  buttonArrow: {
    position: "absolute",
    right: 20,
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "500",
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
    marginTop: 8,
  },

  footerNote: {
    color: COLORS.secondary,
    fontSize: 10,
    textAlign: "center",
    marginTop: -6,
  },
});


import { useState } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
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
};

export default function LoginScreen() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin() {
    if (!phone.trim() || !password) {
      Alert.alert(
        "Campos obrigatórios",
        "Introduz o teu número de telefone e a palavra-passe."
      );
      return;
    }

    Alert.alert(
      "AIONÔDJUNTA",
      "O login será ligado ao backend no módulo de integração."
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>‹ Voltar</Text>
        </Pressable>

        <View style={styles.header}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>A</Text>
          </View>

          <Text style={styles.brandName}>AIONÔDJUNTA</Text>

          <Text style={styles.title}>Bem-vindo de volta</Text>

          <Text style={styles.subtitle}>
            Entra na tua conta para continuares.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Número de telefone</Text>

          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="+245 000 0000"
            placeholderTextColor="#94A39B"
            keyboardType="phone-pad"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            accessibilityLabel="Número de telefone"
          />

          <Text style={styles.label}>Palavra-passe</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Introduz a palavra-passe"
              placeholderTextColor="#94A39B"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.passwordInput}
              accessibilityLabel="Palavra-passe"
            />

            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              accessibilityRole="button"
              accessibilityLabel={
                showPassword
                  ? "Ocultar palavra-passe"
                  : "Mostrar palavra-passe"
              }
            >
              <Text style={styles.showPassword}>
                {showPassword ? "Ocultar" : "Mostrar"}
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() =>
              Alert.alert(
                "Recuperar acesso",
                "A recuperação de palavra-passe será adicionada numa próxima etapa."
              )
            }
            style={styles.forgotButton}
          >
            <Text style={styles.forgotText}>
              Esqueceste a palavra-passe?
            </Text>
          </Pressable>

          <Pressable
            onPress={handleLogin}
            accessibilityRole="button"
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Entrar</Text>
          </Pressable>

          <View style={styles.registerRow}>
            <Text style={styles.registerPrompt}>
              Ainda não tens conta?
            </Text>

            <Pressable onPress={() => router.push("/register")}>
              <Text style={styles.registerLink}> Criar conta</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.footer}>
          AIONÔDJUNTA · Serviços financeiros
        </Text>
      </KeyboardAvoidingView>
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
    paddingTop: 12,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingRight: 16,
  },
  backText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 28,
  },
  brandMark: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  brandMarkText: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: "800",
  },
  brandName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1,
  },
  title: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 28,
  },
  subtitle: {
    color: COLORS.secondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 9,
  },
  form: {
    width: "100%",
    gap: 12,
  },
  label: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
  },
  input: {
    minHeight: 54,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    color: COLORS.text,
    fontSize: 15,
  },
  passwordContainer: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
  },
  passwordInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 15,
    paddingVertical: 14,
  },
  showPassword: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "700",
    paddingLeft: 8,
  },
  forgotButton: {
    alignSelf: "flex-end",
    paddingVertical: 8,
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "600",
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 12,
  },
  registerPrompt: {
    color: COLORS.secondary,
    fontSize: 14,
  },
  registerLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "700",
  },
  footer: {
    color: COLORS.secondary,
    fontSize: 11,
    textAlign: "center",
    marginTop: 24,
  },
});

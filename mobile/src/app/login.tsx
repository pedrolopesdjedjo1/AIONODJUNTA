import { useState } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
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
  accent: "#D9F2E5",
};

export default function LoginScreen() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin() {
    const cleanPhone = phone.trim();
    const cleanPassword = password.trim();

    if (!cleanPhone || !cleanPassword) {
      Alert.alert(
        "Campos obrigatórios",
        "Introduz o teu número de telefone e a palavra-passe."
      );
      return;
    }

    if (cleanPassword.length < 6) {
      Alert.alert(
        "Palavra-passe inválida",
        "A palavra-passe deve ter pelo menos 6 caracteres."
      );
      return;
    }

    Alert.alert(
      "Login",
      "Os dados foram validados. A ligação ao backend será feita na próxima etapa."
    );
  }

  function handleForgotPassword() {
    Alert.alert(
      "Recuperar acesso",
      "A recuperação da palavra-passe será configurada numa próxima etapa."
    );
  }

  function handleCreateAccount() {
    router.push("/register");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* VOLTAR */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>‹ Voltar</Text>
          </Pressable>

          {/* CABEÇALHO */}
          <View style={styles.header}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>A</Text>
            </View>

            <Text style={styles.brandName}>
              AIONÔDJUNTA
            </Text>

            <Text style={styles.title}>
              Bem-vindo de volta
            </Text>

            <Text style={styles.subtitle}>
              Entra na tua conta para continuares.
            </Text>
          </View>

          {/* FORMULÁRIO */}
          <View style={styles.form}>
            <Text style={styles.label}>
              Número de telefone
            </Text>

            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="+245 000 0000"
              placeholderTextColor="#94A39B"
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="telephoneNumber"
              style={styles.input}
              accessibilityLabel="Número de telefone"
            />

            <Text style={styles.label}>
              Palavra-passe
            </Text>

            <View style={styles.passwordContainer}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Introduz a palavra-passe"
                placeholderTextColor="#94A39B"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                style={styles.passwordInput}
                accessibilityLabel="Palavra-passe"
              />

              <Pressable
                onPress={() =>
                  setShowPassword((current) => !current)
                }
                accessibilityRole="button"
                accessibilityLabel={
                  showPassword
                    ? "Ocultar palavra-passe"
                    : "Mostrar palavra-passe"
                }
                style={styles.showPasswordButton}
              >
                <Text style={styles.showPassword}>
                  {showPassword ? "Ocultar" : "Mostrar"}
                </Text>
              </Pressable>
            </View>

            {/* RECUPERAÇÃO */}
            <Pressable
              onPress={handleForgotPassword}
              accessibilityRole="button"
              style={styles.forgotButton}
            >
              <Text style={styles.forgotText}>
                Esqueceste a palavra-passe?
              </Text>
            </Pressable>

            {/* ENTRAR */}
            <Pressable
              onPress={handleLogin}
              accessibilityRole="button"
              accessibilityLabel="Entrar na conta"
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>
                Entrar
              </Text>

              <Text style={styles.buttonArrow}>
                →
              </Text>
            </Pressable>

            {/* DIVISOR */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />

              <Text style={styles.dividerText}>
                ou
              </Text>

              <View style={styles.divider} />
            </View>

            {/* CRIAR CONTA */}
            <View style={styles.registerRow}>
              <Text style={styles.registerPrompt}>
                Ainda não tens conta?
              </Text>

              <Pressable
                onPress={handleCreateAccount}
                accessibilityRole="button"
                accessibilityLabel="Criar conta AIONÔDJUNTA"
              >
                <Text style={styles.registerLink}>
                  Criar conta
                </Text>
              </Pressable>
            </View>

            {/* AVISO */}
            <View style={styles.securityNotice}>
              <View style={styles.securityIcon}>
                <Text style={styles.securityIconText}>
                  ✓
                </Text>
              </View>

              <Text style={styles.securityText}>
                Os teus dados financeiros serão protegidos
                através dos mecanismos de segurança da
                plataforma.
              </Text>
            </View>
          </View>

          <Text style={styles.footer}>
            AIONÔDJUNTA · Serviços financeiros
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingTop: 12,
    paddingBottom: 24,
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
  },

  label: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 7,
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

  showPasswordButton: {
    paddingVertical: 8,
    paddingLeft: 8,
  },

  showPassword: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "700",
  },

  forgotButton: {
    alignSelf: "flex-end",
    paddingVertical: 10,
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
    position: "relative",
    marginTop: 8,
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

  buttonPressed: {
    opacity: 0.75,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 22,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },

  dividerText: {
    color: COLORS.secondary,
    fontSize: 12,
  },

  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 5,
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

  securityNotice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    padding: 13,
    marginTop: 24,
  },

  securityIcon: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  securityIconText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },

  securityText: {
    flex: 1,
    color: COLORS.primaryDark,
    fontSize: 11,
    lineHeight: 17,
  },

  footer: {
    color: COLORS.secondary,
    fontSize: 11,
    textAlign: "center",
    marginTop: 28,
  },
});

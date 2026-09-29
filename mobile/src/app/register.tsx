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

export default function RegisterScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  function handleRegister() {
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanPhone = phone.trim();
    const cleanPassword = password.trim();
    const cleanConfirmPassword = confirmPassword.trim();

    if (
      !cleanFirstName ||
      !cleanPhone ||
      !cleanPassword ||
      !cleanConfirmPassword
    ) {
      Alert.alert(
        "Campos obrigatórios",
        "Preenche o nome, número de telefone e palavra-passe."
      );
      return;
    }

    if (cleanPhone.length < 6) {
      Alert.alert(
        "Número inválido",
        "Introduz um número de telefone válido."
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

    if (cleanPassword !== cleanConfirmPassword) {
      Alert.alert(
        "Palavras-passe diferentes",
        "As duas palavras-passe devem ser iguais."
      );
      return;
    }

    Alert.alert(
      "Conta AIONÔDJUNTA",
      "Os dados foram validados. O cadastro será ligado ao backend na próxima etapa."
    );
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
              Criar conta
            </Text>

            <Text style={styles.subtitle}>
              Cria a tua conta para começar a utilizar
              os serviços financeiros.
            </Text>
          </View>

          {/* FORMULÁRIO */}
          <View style={styles.form}>
            <Text style={styles.label}>
              Nome
            </Text>

            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder="O teu nome"
              placeholderTextColor="#94A39B"
              autoCapitalize="words"
              autoCorrect={false}
              style={styles.input}
              accessibilityLabel="Nome"
            />

            <Text style={styles.label}>
              Apelido
            </Text>

            <TextInput
              value={lastName}
              onChangeText={setLastName}
              placeholder="O teu apelido"
              placeholderTextColor="#94A39B"
              autoCapitalize="words"
              autoCorrect={false}
              style={styles.input}
              accessibilityLabel="Apelido"
            />

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
                placeholder="Cria uma palavra-passe"
                placeholderTextColor="#94A39B"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
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

            <Text style={styles.label}>
              Confirmar palavra-passe
            </Text>

            <View style={styles.passwordContainer}>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Repete a palavra-passe"
                placeholderTextColor="#94A39B"
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                style={styles.passwordInput}
                accessibilityLabel="Confirmar palavra-passe"
              />

              <Pressable
                onPress={() =>
                  setShowConfirmPassword(
                    (current) => !current
                  )
                }
                accessibilityRole="button"
                accessibilityLabel={
                  showConfirmPassword
                    ? "Ocultar confirmação"
                    : "Mostrar confirmação"
                }
                style={styles.showPasswordButton}
              >
                <Text style={styles.showPassword}>
                  {showConfirmPassword
                    ? "Ocultar"
                    : "Mostrar"}
                </Text>
              </Pressable>
            </View>

            {/* BOTÃO */}
            <Pressable
              onPress={handleRegister}
              accessibilityRole="button"
              accessibilityLabel="Criar conta AIONÔDJUNTA"
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>
                Criar conta
              </Text>

              <Text style={styles.buttonArrow}>
                →
              </Text>
            </Pressable>

            {/* LOGIN */}
            <View style={styles.loginRow}>
              <Text style={styles.loginPrompt}>
                Já tens uma conta?
              </Text>

              <Pressable
                onPress={() => router.push("/login")}
                accessibilityRole="button"
              >
                <Text style={styles.loginLink}>
                  Entrar
                </Text>
              </Pressable>
            </View>

            {/* SEGURANÇA */}
            <View style={styles.securityNotice}>
              <View style={styles.securityIcon}>
                <Text style={styles.securityIconText}>
                  ✓
                </Text>
              </View>

              <Text style={styles.securityText}>
                A tua palavra-passe será protegida e os
                dados da tua conta serão tratados de forma
                segura.
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
    marginTop: 8,
    marginBottom: 26,
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
    marginTop: 22,
  },

  subtitle: {
    color: COLORS.secondary,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 9,
    maxWidth: 320,
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

  primaryButton: {
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 24,
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

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 20,
  },

  loginPrompt: {
    color: COLORS.secondary,
    fontSize: 14,
  },

  loginLink: {
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

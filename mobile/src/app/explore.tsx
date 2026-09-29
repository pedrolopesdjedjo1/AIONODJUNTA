import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
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

type Service = {
  id: string;
  title: string;
  description: string;
  symbol: string;
};

const SERVICES: Service[] = [
  {
    id: "deposit",
    title: "Depositar",
    description: "Adicionar dinheiro à carteira",
    symbol: "+",
  },
  {
    id: "withdraw",
    title: "Levantar",
    description: "Retirar dinheiro da carteira",
    symbol: "↓",
  },
  {
    id: "transfer",
    title: "Transferir",
    description: "Enviar dinheiro para outra pessoa",
    symbol: "↗",
  },
  {
    id: "payment",
    title: "Pagamentos",
    description: "Pagar serviços e compras",
    symbol: "✓",
  },
  {
    id: "airtime",
    title: "Recargas",
    description: "Recarregar o teu telefone",
    symbol: "⌁",
  },
  {
    id: "history",
    title: "Histórico",
    description: "Consultar movimentos",
    symbol: "↺",
  },
];

function handleServicePress(service: Service) {
  const messages: Record<string, string> = {
    deposit:
      "O depósito será ativado depois da ligação aos serviços financeiros do AIONÔDJUNTA.",
    withdraw:
      "O levantamento será ativado depois da ligação aos serviços financeiros do AIONÔDJUNTA.",
    transfer:
      "As transferências serão configuradas na próxima etapa.",
    payment:
      "Os pagamentos serão configurados na próxima etapa.",
    airtime:
      "As recargas serão configuradas na próxima etapa.",
    history:
      "O histórico ficará disponível quando a aplicação estiver ligada ao backend.",
  };

  Alert.alert(
    service.title,
    messages[service.id] ?? "Este serviço estará disponível em breve."
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${service.title}. ${service.description}`}
      onPress={() => handleServicePress(service)}
      style={({ pressed }) => [
        styles.serviceCard,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.serviceIcon}>
        <Text style={styles.serviceSymbol}>{service.symbol}</Text>
      </View>

      <Text style={styles.serviceTitle}>{service.title}</Text>

      <Text style={styles.serviceDescription}>
        {service.description}
      </Text>
    </Pressable>
  );
}

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>AIONÔDJUNTA</Text>

            <Text style={styles.title}>Serviços</Text>
          </View>

          <View style={styles.headerMark}>
            <Text style={styles.headerMarkText}>A</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>
          Gere o teu dinheiro, faz pagamentos e envia
          valores através dos serviços AIONÔDJUNTA.
        </Text>

        {/* DESTAQUE */}
        <View style={styles.banner}>
          <View style={styles.bannerIcon}>
            <Text style={styles.bannerIconText}>XOF</Text>
          </View>

          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>
              Serviços financeiros
            </Text>

            <Text style={styles.bannerDescription}>
              Tudo o que precisas para gerir a tua carteira
              AIONÔDJUNTA num só lugar.
            </Text>
          </View>
        </View>

        {/* SERVIÇOS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Operações financeiras
          </Text>

          <Text style={styles.sectionCaption}>
            {SERVICES.length} serviços
          </Text>
        </View>

        <View style={styles.servicesGrid}>
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </View>

        {/* INFORMAÇÃO */}
        <View style={styles.notice}>
          <View style={styles.noticeIcon}>
            <Text style={styles.noticeIconText}>i</Text>
          </View>

          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>
              Informação importante
            </Text>

            <Text style={styles.noticeDescription}>
              Esta área apresenta os serviços disponíveis
              no AIONÔDJUNTA. As operações reais serão
              ativadas após a integração completa com o
              backend e os serviços financeiros.
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          AIONÔDJUNTA · Serviços financeiros
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollView: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 32,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  eyebrow: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 5,
  },

  title: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.7,
  },

  headerMark: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  headerMarkText: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: "800",
  },

  subtitle: {
    color: COLORS.secondary,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 12,
    marginBottom: 24,
  },

  banner: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 28,
  },

  bannerIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },

  bannerIconText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
  },

  bannerContent: {
    flex: 1,
    gap: 5,
  },

  bannerTitle: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800",
  },

  bannerDescription: {
    color: "#E0F3E9",
    fontSize: 12,
    lineHeight: 18,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
  },

  sectionCaption: {
    color: COLORS.secondary,
    fontSize: 12,
  },

  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 13,
  },

  serviceCard: {
    width: "48%",
    minHeight: 148,
    padding: 15,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  serviceIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
  },

  serviceSymbol: {
    color: COLORS.primary,
    fontSize: 25,
    fontWeight: "700",
  },

  serviceTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 5,
  },

  serviceDescription: {
    color: COLORS.secondary,
    fontSize: 11,
    lineHeight: 16,
  },

  pressed: {
    opacity: 0.7,
  },

  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: COLORS.accent,
    borderRadius: 16,
    padding: 15,
    marginTop: 25,
  },

  noticeIcon: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  noticeIconText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800",
  },

  noticeContent: {
    flex: 1,
    gap: 5,
  },

  noticeTitle: {
    color: COLORS.primaryDark,
    fontSize: 13,
    fontWeight: "800",
  },

  noticeDescription: {
    color: COLORS.primaryDark,
    fontSize: 12,
    lineHeight: 19,
  },

  footer: {
    color: COLORS.secondary,
    fontSize: 11,
    textAlign: "center",
    marginTop: 25,
  },
});

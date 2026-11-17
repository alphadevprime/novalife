import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const tabs = [
  { label: 'Accueil', icon: '⌂' },
  { label: 'Profil', icon: '◉' },
  { label: 'Amis', icon: '♧' },
  { label: 'Paramètres', icon: '⚙' },
] as const;

type Tab = (typeof tabs)[number]['label'];
type Page = Tab | 'Aventure';

const pageDetails: Record<Exclude<Page, 'Accueil'>, { icon: string; title: string; description: string }> = {
  Profil: {
    icon: '◉',
    title: 'Votre personnage',
    description: 'Créez votre personnage et choisissez la vie que vous voulez mener.',
  },
  Amis: {
    icon: '♧',
    title: 'Vos amis',
    description: 'Retrouvez bientôt vos amis pour partager votre aventure.',
  },
  Paramètres: {
    icon: '⚙',
    title: 'Paramètres',
    description: 'Les options de votre univers seront disponibles ici.',
  },
  Aventure: {
    icon: '✦',
    title: 'Votre aventure commence',
    description: 'Votre monde vous attend. La première étape sera bientôt disponible.',
  },
};

export default function App() {
  const [page, setPage] = useState<Page>('Accueil');
  const selectedTab = page === 'Aventure' ? 'Accueil' : page;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.app}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {page === 'Accueil' ? (
              <>
                <View style={styles.brand}>
                  <Image
                    source={require('./assets/novalifelogo.png')}
                    style={styles.logo}
                    accessibilityLabel="Logo NovaLife"
                  />
                  <View>
                    <Text style={styles.brandName}>NOVALIFE</Text>
                    <Text style={styles.brandTagline}>UN MONDE À TOI</Text>
                  </View>
                </View>

                <View style={styles.welcome}>
                  <Text style={styles.eyebrow}>TA NOUVELLE VIE COMMENCE ICI</Text>
                  <Text style={styles.title}>Bienvenue dans{'\n'}votre univers</Text>
                  <Text style={styles.subtitle}>
                    Explorez, rencontrez et créez une vie qui vous ressemble.
                  </Text>
                </View>

                <View style={styles.artFrame}>
                  <Image
                    source={require('./assets/neighborhood-preview.jpg')}
                    style={styles.art}
                    resizeMode="cover"
                    accessibilityLabel="Illustration du quartier NovaLife"
                  />
                </View>

                <View style={styles.actions}>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => setPage('Profil')}
                    style={({ pressed }) => [
                      styles.button,
                      styles.primaryButton,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    <Text style={styles.buttonText}>CRÉER VOTRE PERSONNAGE</Text>
                  </Pressable>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => setPage('Aventure')}
                    style={({ pressed }) => [
                      styles.button,
                      styles.secondaryButton,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    <Text style={styles.buttonText}>COMMENCER L’AVENTURE</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <View style={styles.placeholder}>
                <View style={styles.placeholderIcon}>
                  <Text style={styles.placeholderIconText}>{pageDetails[page].icon}</Text>
                </View>
                <Text style={styles.eyebrow}>NOVALIFE</Text>
                <Text style={styles.title}>{pageDetails[page].title}</Text>
                <Text style={styles.subtitle}>{pageDetails[page].description}</Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setPage('Accueil')}
                  style={({ pressed }) => [
                    styles.button,
                    styles.primaryButton,
                    styles.returnButton,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <Text style={styles.buttonText}>RETOUR À L’ACCUEIL</Text>
                </Pressable>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.tabBar}>
          {tabs.map((tab) => {
            const active = selectedTab === tab.label;
            return (
              <Pressable
                key={tab.label}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                onPress={() => setPage(tab.label)}
                style={styles.tab}
              >
                <Text style={[styles.tabIcon, active && styles.activeTabIcon]}>
                  {tab.icon}
                </Text>
                <Text style={[styles.tabLabel, active && styles.activeTabLabel]}>
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E4F5F2',
  },
  app: {
    flex: 1,
    backgroundColor: '#FFF7EB',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 28,
  },
  brand: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 0,
    marginTop: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 18,
  },
  brandName: {
    color: '#176A73',
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  brandTagline: {
    color: '#57928C',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 2,
  },
  welcome: {
    alignItems: 'center',
    marginTop: 20,
  },
  eyebrow: {
    color: '#4C9B89',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.7,
    textAlign: 'center',
  },
  title: {
    color: '#175765',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
    textAlign: 'center',
    marginTop: 8,
  },
  subtitle: {
    color: '#66807E',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 330,
  },
  artFrame: {
    width: '100%',
    aspectRatio: 1.62,
    marginTop: 20,
    padding: 4,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#258F92',
    backgroundColor: '#DFF4F3',
    overflow: 'hidden',
  },
  art: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  actions: {
    gap: 10,
    marginTop: 20,
  },
  button: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    paddingHorizontal: 20,
    elevation: 2,
    shadowColor: '#245A5C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },
  primaryButton: {
    backgroundColor: '#248D98',
  },
  secondaryButton: {
    backgroundColor: '#4DAF83',
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  placeholder: {
    flex: 1,
    minHeight: 480,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    width: 92,
    height: 92,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDF2ED',
    marginBottom: 24,
  },
  placeholderIconText: {
    color: '#248D98',
    fontSize: 42,
  },
  returnButton: {
    alignSelf: 'stretch',
    marginTop: 28,
  },
  tabBar: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 9,
    paddingBottom: 7,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E2EAE6',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    minHeight: 48,
  },
  tabIcon: {
    color: '#879795',
    fontSize: 21,
    lineHeight: 24,
  },
  activeTabIcon: {
    color: '#1C8C8A',
  },
  tabLabel: {
    color: '#879795',
    fontSize: 10,
  },
  activeTabLabel: {
    color: '#1C777B',
    fontWeight: '700',
  },
});

import React from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AppStackParamList } from '../../routes';
import theme from '../../styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<AppStackParamList, 'Home'>>();
  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

  function handleNavigationToPoints() {
    navigation.navigate('Points');
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={keyboardBehavior}
    >
      <LinearGradient
        colors={theme.gradients.hero}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.decorLayer}>
            <Image
              source={require('../../assets/home-background.png')}
              style={styles.decorImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.content}>
            <View style={styles.header}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.brandLogo}
                resizeMode="contain"
              />
              <Text style={styles.heroTitle}>Coleta sustentável mais próxima de você</Text>
              <Text style={styles.heroDescription}>
                Descubra pontos de reciclagem e conecte-se a quem cuida do planeta.
              </Text>
            </View>

            <View style={styles.highlightsRow}>
              <View style={styles.highlightCard}>
                <Text style={styles.highlightNumber}>150+</Text>
                <Text style={styles.highlightLabel}>Pontos ativos</Text>
              </View>
              <View style={styles.highlightCard}>
                <Text style={styles.highlightNumber}>40k</Text>
                <Text style={styles.highlightLabel}>Coletas realizadas</Text>
              </View>
            </View>

            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Pesquisar locais</Text>
              <Text style={styles.formSubtitle}>
                Informe sua região e encontre os pontos de coleta disponíveis.
              </Text>

              <View style={styles.inputGroup}>
                <TextInput
                  style={[styles.input, styles.inputUF]}
                  placeholder="UF"
                  placeholderTextColor={theme.colors.textSecondary}
                  autoCapitalize="characters"
                  maxLength={2}
                  autoCorrect={false}
                />

                <TextInput
                  style={[styles.input, styles.inputCity]}
                  placeholder="Cidade"
                  placeholderTextColor={theme.colors.textSecondary}
                  autoCorrect={false}
                />
              </View>

              <RectButton style={styles.button} onPress={handleNavigationToPoints}>
                <View style={styles.buttonIcon}>
                  <Text>
                    <Icon name="arrow-right" color="#FFF" size={24} />
                  </Text>
                </View>
                <Text style={styles.buttonText}>Encontrar pontos</Text>
              </RectButton>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  gradient: {
    flex: 1,
    paddingBottom: theme.spacing.xxl,
  },

  safeContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    position: 'relative',
  },

  decorLayer: {
    position: 'absolute',
    top: theme.spacing.xl,
    left: -40,
    width: 260,
    height: 260,
    opacity: 0.18,
  },

  decorImage: {
    width: '100%',
    height: '100%',
    transform: [{ rotate: '-10deg' }],
  },

  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },

  header: {
    maxWidth: 320,
  },

  brandLogo: {
    width: 180,
    height: 180,
  },


  heroTitle: {
    color: '#FFF',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: theme.spacing.lg,
    lineHeight: 42,
  },

  heroDescription: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    marginTop: theme.spacing.sm,
    lineHeight: 24,
  },

  highlightsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },

  highlightCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderRadius: theme.radii.lg,
    paddingVertical: theme.spacing.md + 4,
    paddingHorizontal: theme.spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },

  highlightNumber: {
    color: '#FFF',
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 24,
  },

  highlightLabel: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontFamily: 'Roboto_500Medium',
    fontSize: 13,
    marginTop: 6,
  },

  formCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.xl,
    ...theme.shadow.card,
  },

  formTitle: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 20,
    color: theme.colors.text,
  },

  formSubtitle: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
    lineHeight: 22,
  },

  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    flexWrap: 'wrap',
  },

  input: {
    height: 56,
    backgroundColor: theme.colors.backgroundAlt,
    borderRadius: theme.radii.md,
    paddingHorizontal: theme.spacing.lg,
    fontSize: 16,
    marginBottom: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    flexGrow: 1,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 1,
  },

  inputUF: {
    flexBasis: 96,
    maxWidth: 110,
    textTransform: 'uppercase',
  },

  inputCity: {
    flexBasis: 160,
    flexGrow: 1,
  },

  button: {
    backgroundColor: theme.colors.primary,
    height: 56,
    flexDirection: 'row',
    borderRadius: theme.radii.md,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    ...theme.shadow.cta,
  },

  buttonIcon: {
    height: '100%',
    width: 58,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
});

export default Home;

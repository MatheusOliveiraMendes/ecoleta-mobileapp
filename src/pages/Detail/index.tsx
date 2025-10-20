import React from 'react';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../../routes';
import theme from '../../styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const Detail = () => {
  const navigation = useNavigation<StackNavigationProp<AppStackParamList, 'Detail'>>();
  const materials = ['Papéis e Papelão', 'Resíduos Eletrônicos'];

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <LinearGradient
          colors={theme.gradients.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}
        >
          <TouchableOpacity onPress={handleNavigateBack} style={styles.backButton}>
            <Icon name="arrow-left" size={22} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.heroTitle}>Detalhes do ponto</Text>
          <Text style={styles.heroSubtitle}>
            Saiba como entregar seus materiais e mantenha a cidade mais limpa.
          </Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.infoCard}>
            <Image
              style={styles.pointImage}
              source={require('../../assets/home-background.png')}
            />

            <View style={styles.pointHeader}>
              <View>
                <Text style={styles.pointName}>Ponto de Coleta</Text>
                <Text style={styles.pointLocation}>São Paulo, SP</Text>
              </View>

              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Aberto hoje</Text>
              </View>
            </View>

            <View style={styles.materialsRow}>
              {materials.map(material => (
                <View key={material} style={styles.materialBadge}>
                  <Text style={styles.materialBadgeText}>{material}</Text>
                </View>
              ))}
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Endereço</Text>
              <Text style={styles.sectionDescription}>São Paulo, SP</Text>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Funcionamento</Text>
              <Text style={styles.sectionDescription}>Seg a Sáb · 08h às 18h</Text>
            </View>
          </View>

          <View style={styles.contactCard}>
            <Text style={styles.contactTitle}>Entre em contato</Text>
            <Text style={styles.contactSubtitle}>
              Combine o melhor horário e garanta o descarte correto do seu material.
            </Text>

            <View style={styles.actionsRow}>
              <RectButton style={[styles.actionButton, styles.whatsappButton]} onPress={() => {}}>
                <FontAwesome name="whatsapp" size={20} color="#FFF" />
                <Text style={styles.actionButtonText}>Whatsapp</Text>
              </RectButton>

              <RectButton style={styles.actionButton} onPress={() => {}}>
                <Icon name="mail" size={20} color={theme.colors.primary} />
                <Text style={[styles.actionButtonText, styles.actionButtonAlt]}>E-mail</Text>
              </RectButton>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  scrollContent: {
    paddingBottom: theme.spacing.xl * 2,
    backgroundColor: theme.colors.background,
  },

  heroSection: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },

  heroTitle: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 30,
    color: '#FFF',
    marginTop: theme.spacing.lg,
  },

  heroSubtitle: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: theme.spacing.sm,
    lineHeight: 22,
  },

  content: {
    marginTop: -theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  },

  infoCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    overflow: 'hidden',
    ...theme.shadow.card,
  },

  pointImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },

  pointHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },

  pointName: {
    color: theme.colors.text,
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
  },

  pointLocation: {
    color: theme.colors.textSecondary,
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    marginTop: 4,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primarySoft,
    borderRadius: theme.radii.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginRight: 6,
  },

  statusText: {
    color: theme.colors.primaryStrong,
    fontFamily: 'Roboto_500Medium',
    fontSize: 13,
  },

  materialsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },

  materialBadge: {
    backgroundColor: theme.colors.backgroundAlt,
    borderRadius: theme.radii.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
  },

  materialBadgeText: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 12,
    color: theme.colors.textMuted,
  },

  detailSection: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },

  sectionTitle: {
    color: theme.colors.text,
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  sectionDescription: {
    color: theme.colors.textSecondary,
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    marginTop: 6,
    lineHeight: 22,
  },

  contactCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.xl,
    ...theme.shadow.card,
  },

  contactTitle: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 20,
    color: theme.colors.text,
  },

  contactSubtitle: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
    lineHeight: 22,
  },

  actionsRow: {
    flexDirection: 'row',
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },

  actionButton: {
    flex: 1,
    height: 54,
    borderRadius: theme.radii.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primarySoft,
    backgroundColor: theme.colors.surface,
  },

  whatsappButton: {
    backgroundColor: theme.colors.primary,
    borderColor: 'transparent',
    ...theme.shadow.cta,
  },

  actionButtonText: {
    marginLeft: theme.spacing.sm,
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
    color: '#FFF',
  },

  actionButtonAlt: {
    color: theme.colors.primary,
  },
});

export default Detail;

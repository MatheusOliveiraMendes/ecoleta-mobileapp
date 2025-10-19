import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../../routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Asset } from 'expo-asset';
import theme from '../../styles/theme';
import api from '../../services/api';
import { LinearGradient } from 'expo-linear-gradient';

interface ApiItem {
  id: number;
  title: string;
  image_url: string;
}

interface Item extends ApiItem {
  icon?: string;
}

const ICON_MAP: Record<number, number> = {
  1: require('../../assets/lamps.svg'),
  2: require('../../assets/batteries.svg'),
  3: require('../../assets/paper-cardboard.svg'),
  4: require('../../assets/electronics.svg'),
  5: require('../../assets/organic.svg'),
  6: require('../../assets/cooking-oil.svg'),
};

const Points = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  const navigation = useNavigation<StackNavigationProp<AppStackParamList, 'Points'>>();

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert('Precisamos de sua permissão para obter sua localização');
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setInitialPosition([
        latitude,
        longitude
      ])
    }

    loadPosition();
  }, []);

  useEffect(() => {
    Asset.loadAsync(Object.values(ICON_MAP)).catch(() => {
      // Silencia falhas de preload, assets locais ainda serão entregues pelo bundler.
    });
  }, []);

  useEffect(() => {
    api.get<ApiItem[]>('items').then(response => {
      const formattedItems = response.data.map(item => {
        const assetModule = ICON_MAP[item.id];
        const icon = assetModule ? Asset.fromModule(assetModule).uri : undefined;

        return {
          ...item,
          icon: icon || item.image_url,
        };
      });

      setItems(formattedItems);
    }).catch(() => {
      // Em caso de falha, mantém lista vazia para evitar quebra na UI.
    });
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDetail() {
    navigation.navigate('Detail');
  }

  function handleSelectItem(id: number) {

    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={theme.gradients.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.8 }}
          style={styles.topSection}
        >
          <TouchableOpacity onPress={handleNavigateBack} style={styles.backButton}>
            <Icon name="arrow-left" size={22} color="#FFF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Explore pontos próximos</Text>
          <Text style={styles.headerSubtitle}>
            Ative os filtros para encontrar os materiais que deseja reciclar.
          </Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.mapCard}>
            {initialPosition[0] !== 0 ? (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: initialPosition[0],
                  longitude: initialPosition[1],
                  latitudeDelta: 0.04,
                  longitudeDelta: 0.04,
                }}
              >
                <Marker
                  style={styles.mapMarker}
                  onPress={handleNavigateToDetail}
                  coordinate={{
                    latitude: initialPosition[0],
                    longitude: initialPosition[1],
                  }}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image style={styles.mapMarkerImage} source={require('../../assets/logo.png')} />
                    <Text style={styles.mapMarkerTitle}>Ponto coleta</Text>
                  </View>
                </Marker>
              </MapView>
            ) : (
              <View style={styles.mapPlaceholder}>
                <Text style={styles.mapPlaceholderText}>Buscando sua localização…</Text>
              </View>
            )}

            <View style={styles.mapMeta}>
              <Text style={styles.mapMetaTitle}>Localização atual</Text>
              <Text style={styles.mapMetaText}>
                Toque nos marcadores para ver os detalhes do ponto de coleta.
              </Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Materiais aceitos</Text>
            <Text style={styles.sectionSubtitle}>
              Escolha um ou mais itens para filtrar os pontos disponíveis.
            </Text>
          </View>

          <View style={styles.itemsGrid}>
            {items.map(item => {
              if (!item.icon) {
                return null;
              }

              const isSelected = selectedItems.includes(item.id);

              return (
                <TouchableOpacity
                  key={String(item.id)}
                  style={[styles.item, isSelected && styles.selectedItem]}
                  onPress={() => handleSelectItem(item.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.itemIconWrapper}>
                    <SvgUri width={38} height={38} uri={item.icon} />
                  </View>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  {isSelected && <View style={styles.selectionIndicator} />}
                </TouchableOpacity>
              );
            })}
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

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },

  topSection: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg + Constants.statusBarHeight,
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
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },

  headerTitle: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 28,
    color: '#FFF',
    marginTop: theme.spacing.lg,
    lineHeight: 34,
  },

  headerSubtitle: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: theme.spacing.sm,
    lineHeight: 22,
  },

  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },

  mapCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    overflow: 'hidden',
    ...theme.shadow.card,
    position: 'relative',
  },

  map: {
    width: '100%',
    height: 280,
  },

  mapPlaceholder: {
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.backgroundAlt,
  },

  mapPlaceholderText: {
    fontFamily: 'Roboto_400Regular',
    color: theme.colors.textSecondary,
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: theme.colors.primary,
    flexDirection: 'column',
    borderRadius: theme.radii.md,
    overflow: 'hidden',
    alignItems: 'center',
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'contain',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  mapMeta: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: 'rgba(50, 33, 83, 0.85)',
    borderRadius: theme.radii.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },

  mapMetaTitle: {
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 14,
  },

  mapMetaText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontFamily: 'Roboto_400Regular',
    fontSize: 13,
    marginTop: 4,
    lineHeight: 20,
  },

  sectionHeader: {
    marginTop: theme.spacing.lg,
  },

  sectionTitle: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 20,
    color: theme.colors.text,
  },

  sectionSubtitle: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 6,
  },

  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: theme.spacing.md,
    justifyContent: 'space-between',
  },

  item: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    width: '47%',
    marginBottom: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...theme.shadow.control,
  },

  itemIconWrapper: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },

  itemTitle: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 13,
    textAlign: 'center',
    color: theme.colors.text,
  },

  selectedItem: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primarySoft,
  },

  selectionIndicator: {
    position: 'absolute',
    bottom: 8,
    left: theme.spacing.md,
    right: theme.spacing.md,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
  },
});

export default Points;

import { Text, View } from 'react-native';

/** Plain screen title for Boutique — matches the Rendez-vous/Commandes header convention. */
export function BoutiqueHeader() {
  return (
    <View className="gap-1">
      <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
        Générale d&apos;Optique
      </Text>
      <Text
        className="text-text-primary text-3xl"
        style={{ fontFamily: 'InstrumentSerif_400Regular' }}
      >
        Boutique
      </Text>
    </View>
  );
}

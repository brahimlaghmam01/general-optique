import { Text, View } from 'react-native';

export interface OrdersHeaderProps {
  prescriptionTag?: string;
}

/** Screen title + certified-tracking badge for Commandes & Atelier. */
export function OrdersHeader({ prescriptionTag = 'EPS-24' }: OrdersHeaderProps) {
  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1.5">
          <View className="h-1.5 w-1.5 rounded-full bg-primary-500" />
          <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
            Suivi optique certifié
          </Text>
        </View>
        <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
          OD/OG: {prescriptionTag}
        </Text>
      </View>

      <Text className="text-text-primary text-3xl" style={{ fontFamily: 'InstrumentSerif_400Regular' }}>
        Mes commandes
      </Text>
      <Text className="text-text-secondary text-sm">
        Suivi en temps réel de vos équipements et verres sur-mesure.
      </Text>
    </View>
  );
}

import { Text, View } from 'react-native';
import { BadgeCheck } from 'lucide-react-native';

export function PrivilegeProgramCard() {
  return (
    <View className="gap-2 rounded-2xl bg-primary-500 p-5">
      <View className="flex-row items-center justify-between">
        <Text className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
          Programme privilège
        </Text>
        <BadgeCheck size={18} color="#FFFFFF" />
      </View>
      <Text className="text-lg font-semibold text-white">
        Garantie Casse & Réglages Illimités
      </Text>
      <Text className="text-sm text-white/85">
        Valable dans tous les ateliers Générale d&apos;Optique de l&apos;hexagone.
      </Text>
    </View>
  );
}

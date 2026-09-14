import { Text, View } from 'react-native';
import { FileText } from 'lucide-react-native';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { HealthAlert } from '@/types/health';

export interface HealthAlertCardProps {
  alert: HealthAlert;
  onPressAction: () => void;
}

/** "À prévoir" callout nudging the member toward their vision-health record. */
export function HealthAlertCard({ alert, onPressAction }: HealthAlertCardProps) {
  return (
    <View className="gap-4 rounded-2xl border border-border-light bg-background-secondary p-5">
      <Badge label={alert.coverageLabel} variant="success" />
      <View className="gap-1.5">
        <Text className="text-text-primary text-lg font-semibold">{alert.title}</Text>
        <Text className="text-text-secondary text-sm">{alert.description}</Text>
      </View>
      <Button label={alert.ctaLabel} icon={FileText} onPress={onPressAction} fullWidth />
    </View>
  );
}

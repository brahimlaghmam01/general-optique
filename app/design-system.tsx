import { useRef, useState, type ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GorhomBottomSheet from '@gorhom/bottom-sheet';
import type { BottomTabBarProps } from 'expo-router/build/react-navigation/bottom-tabs';
import {
  ArrowRight,
  Bell,
  CalendarClock,
  CheckCircle2,
  FileCheck2,
  Factory,
  Heart,
  MapPin,
  PackageCheck,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2,
  Wrench,
} from 'lucide-react-native';

import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { Divider } from '@/components/ui/Divider';
import { EmptyState } from '@/components/ui/EmptyState';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { IconButton } from '@/components/ui/IconButton';
import { OrderTimeline } from '@/components/ui/OrderTimeline';
import { Skeleton } from '@/components/ui/Skeleton';
import { Switch } from '@/components/ui/Switch';
import { GlassTabBar } from '@/components/layout/GlassTabBar';
import { colors } from '@/theme/colors';
import type { OrderStep } from '@/types/order';

const PREVIEW_ORDER_STEPS: OrderStep[] = [
  { key: 'order', label: 'Commande validée', status: 'completed', description: '24 août 2025' },
  { key: 'manufacturing', label: 'Surfaçage des verres', status: 'completed', description: '26 août 2025' },
  { key: 'fitting', label: 'Montage & centrage', status: 'in_progress', description: 'En cours' },
  { key: 'ready', label: 'Prête en magasin', status: 'upcoming' },
];

const PREVIEW_STEP_ICONS: Record<string, typeof FileCheck2> = {
  order: FileCheck2,
  manufacturing: Factory,
  fitting: Wrench,
  ready: PackageCheck,
};

const MOTIF_OPTIONS = ['Examen de vue', 'Bilan lentilles', 'Essayage montures', 'SAV atelier'];

/**
 * Design-system validation screen, reachable at /design-system. Not part of
 * the tab flow — kept around as a living reference for the ui/ primitives.
 */
export default function DesignSystemShowcaseScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [coupeFileEnabled, setCoupeFileEnabled] = useState(false);
  const [selectedMotif, setSelectedMotif] = useState(MOTIF_OPTIONS[0]);

  return (
    <ScrollView
      className="flex-1 bg-background-primary"
      contentContainerClassName="gap-8 p-6 pb-16 pt-16"
    >
      <View className="gap-1">
        <Text
          className="text-text-primary text-4xl"
          style={{ fontFamily: 'InstrumentSerif_400Regular' }}
        >
          Design System
        </Text>
        <Text className="text-text-secondary text-sm">Composants ui/ — validation</Text>
      </View>

      <Section title="Button">
        <Row>
          <Button label="Primary" variant="primary" onPress={() => {}} />
          <Button label="Secondary" variant="secondary" onPress={() => {}} />
          <Button label="Ghost" variant="ghost" onPress={() => {}} />
          <Button label="Danger" variant="danger" onPress={() => {}} />
        </Row>
        <Row>
          <Button label="Continuer" icon={ArrowRight} iconPosition="right" onPress={() => {}} />
          <Button label="Chargement..." loading onPress={() => {}} />
          <Button label="Désactivé" disabled onPress={() => {}} />
        </Row>
      </Section>

      <Divider />

      <Section title="Card">
        <Card variant="bordered">
          <Card.Header>
            <Text className="text-text-primary text-lg font-semibold">Carte simple</Text>
            <Text className="text-text-secondary text-sm">variant=&quot;bordered&quot;</Text>
          </Card.Header>
          <Card.Content>
            <Text className="text-text-secondary text-sm">
              Contenu au sein de Card.Content, séparé du titre.
            </Text>
          </Card.Content>
        </Card>

        <Card variant="elevated">
          <Card.Header>
            <Text className="text-text-primary text-lg font-semibold">Carte élevée</Text>
            <Text className="text-text-secondary text-sm">variant=&quot;elevated&quot;</Text>
          </Card.Header>
          <Card.Content>
            <Text className="text-text-secondary text-sm">Utilise shadow.card.</Text>
          </Card.Content>
          <Card.Footer>
            <Button label="Action" size="sm" onPress={() => {}} />
          </Card.Footer>
        </Card>

        <Card variant="default" onPress={() => {}}>
          <Card.Content>
            <Text className="text-text-primary font-medium">Carte pressable</Text>
            <Text className="text-text-secondary text-sm">
              onPress + useAnimatedPress + haptique
            </Text>
          </Card.Content>
        </Card>
      </Section>

      <Divider />

      <Section title="Badge">
        <Row>
          <Badge label="Default" variant="default" />
          <Badge label="Brand" variant="brand" />
          <Badge label="Success" variant="success" />
          <Badge label="Warning" variant="warning" />
          <Badge label="Error" variant="error" />
        </Row>
        <Row>
          <Badge
            label="Certifié"
            variant="success"
            size="sm"
            icon={<ShieldCheck size={12} color="#10B981" />}
          />
          <Badge
            label="Nouveau"
            variant="brand"
            icon={<Sparkles size={14} color="#004D38" />}
          />
        </Row>
      </Section>

      <Divider />

      <Section title="Avatar">
        <Row>
          <Avatar fallback="Stevan Doe" size="sm" />
          <Avatar fallback="Stevan Doe" size="md" />
          <Avatar fallback="Stevan Doe" size="lg" />
          <Avatar fallback="Stevan Doe" size="xl" />
        </Row>
        <Row>
          <Avatar src="https://i.pravatar.cc/150?img=12" fallback="Léa" size="md" />
          <Avatar src="https://invalid.example/broken.jpg" fallback="John" size="md" />
        </Row>
      </Section>

      <Divider />

      <Section title="Switch">
        <Row>
          <Switch
            checked={notificationsEnabled}
            onCheckedChange={setNotificationsEnabled}
            accessibilityLabel="Notifications"
          />
          <Text className="text-text-primary text-sm">Notifications</Text>
        </Row>
        <Row>
          <Switch
            checked={coupeFileEnabled}
            onCheckedChange={setCoupeFileEnabled}
            accessibilityLabel="Service coupe-file"
          />
          <Text className="text-text-primary text-sm">Coupe-file</Text>
        </Row>
        <Row>
          <Switch checked disabled onCheckedChange={() => {}} accessibilityLabel="Désactivé" />
          <Text className="text-text-tertiary text-sm">Désactivé</Text>
        </Row>
      </Section>

      <Divider />

      <Section title="Chip">
        <Row wrap>
          {MOTIF_OPTIONS.map((motif) => (
            <Chip
              key={motif}
              label={motif}
              active={selectedMotif === motif}
              onPress={() => setSelectedMotif(motif)}
            />
          ))}
        </Row>
        <Row>
          <Chip label="Nice Masséna" icon={<MapPin size={14} color="#1A1A1A" />} />
          <Chip label="Confirmé" icon={<CheckCircle2 size={14} color="#FFFFFF" />} active />
        </Row>
      </Section>

      <Divider />

      <Section title="Skeleton">
        <View className="flex-row items-center gap-3">
          <Skeleton width={48} height={48} rounded="rounded-full" />
          <View className="flex-1 gap-2">
            <Skeleton width="70%" height={14} />
            <Skeleton width="40%" height={12} />
          </View>
        </View>
        <Skeleton width="100%" height={120} rounded="rounded-2xl" />
      </Section>

      <Divider />

      <Section title="Divider">
        <Divider />
        <View className="h-10 flex-row items-center gap-3">
          <Text className="text-text-secondary text-sm">Calendrier</Text>
          <Divider orientation="vertical" />
          <Text className="text-text-secondary text-sm">Déplacer</Text>
        </View>
      </Section>

      <Divider />

      <Section title="IconButton">
        <Row>
          <IconButton icon={Bell} variant="filled" onPress={() => {}} accessibilityLabel="Notifications" />
          <IconButton icon={Heart} variant="outline" onPress={() => {}} accessibilityLabel="Favoris" />
          <IconButton icon={Settings} variant="ghost" onPress={() => {}} accessibilityLabel="Réglages" />
          <IconButton
            icon={Trash2}
            variant="filled"
            size="sm"
            onPress={() => {}}
            accessibilityLabel="Supprimer"
          />
          <IconButton
            icon={Heart}
            variant="outline"
            disabled
            onPress={() => {}}
            accessibilityLabel="Désactivé"
          />
        </Row>
      </Section>

      <Divider />

      <Section title="GlassContainer (Phase 1)">
        <Text className="text-text-tertiary text-xs">
          Over a busy backdrop so the blur is actually visible — flat backgrounds don't show it.
        </Text>
        <LinearGradient
          colors={[colors.primary[900], colors.primary[500]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ height: 140, width: '100%', borderRadius: 20, overflow: 'hidden' }}
        >
          <View className="flex-1 items-center justify-center gap-3">
            <Text className="text-2xl font-bold text-white/30">GÉNÉRALE D&apos;OPTIQUE</Text>
            <GlassContainer roundedClassName="rounded-2xl" style={{ padding: 16 }}>
              <Text className="text-text-primary text-sm font-semibold">Contenu en verre</Text>
              <Text className="text-text-secondary text-xs">Lisible malgré le flou derrière</Text>
            </GlassContainer>
          </View>
        </LinearGradient>
      </Section>

      <Divider />

      <Section title="GlassTabBar (Phase 1 — mocked navigation)">
        <Text className="text-text-tertiary text-xs">
          Same indicator-spring / icon-scale / haptics as AnimatedTabBar, rendered through
          GlassContainer. Tap a tab below — it's wired to a local fake navigator, not a real route.
        </Text>
        <GlassTabBarPreview />
      </Section>

      <Divider />

      <Section title="BottomSheet (Phase 1)">
        <BottomSheetPreview />
      </Section>

      <Divider />

      <Section title="EmptyState (Phase 1)">
        <View className="w-full rounded-2xl border border-border-light bg-background-secondary">
          <EmptyState
            icon={CalendarClock}
            title="Aucun rendez-vous à venir"
            description="Prenez rendez-vous pour votre prochain contrôle de vue."
            actionLabel="Prendre rendez-vous"
            onPressAction={() => {}}
          />
        </View>
      </Section>

      <Divider />

      <Section title="OrderTimeline (Phase 1 — promoted from AtelierTimeline)">
        <View className="w-full rounded-2xl border border-border-light bg-background-secondary p-5">
          <OrderTimeline
            steps={PREVIEW_ORDER_STEPS}
            getStepIcon={(step) => PREVIEW_STEP_ICONS[step.key] ?? FileCheck2}
          />
        </View>
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-text-secondary text-xs font-semibold uppercase tracking-wider">
        {title}
      </Text>
      <View className="items-start gap-3">{children}</View>
    </View>
  );
}

function Row({ children, wrap = true }: { children: ReactNode; wrap?: boolean }) {
  return (
    <View className={`flex-row items-center gap-3 ${wrap ? 'flex-wrap' : ''}`}>{children}</View>
  );
}

const PREVIEW_TAB_NAMES = ['index', 'appointments', 'orders', 'profile'];

/**
 * Renders GlassTabBar against a hand-rolled fake navigator (a local
 * activeIndex + no-op emit/navigate) so it can be previewed without a real
 * <Tabs> tree. GlassTabBar only reads state.index/state.routes and calls
 * navigation.emit/navigate, so this mock covers everything it touches.
 */
function GlassTabBarPreview() {
  const [activeIndex, setActiveIndex] = useState(0);

  const state = {
    index: activeIndex,
    routes: PREVIEW_TAB_NAMES.map((name) => ({ key: name, name })),
  } as unknown as BottomTabBarProps['state'];

  const navigation = {
    emit: () => ({ defaultPrevented: false }),
    navigate: (name: string) => {
      const index = PREVIEW_TAB_NAMES.indexOf(name);
      if (index >= 0) setActiveIndex(index);
    },
  } as unknown as BottomTabBarProps['navigation'];

  return (
    <View style={{ height: 110, width: '100%' }}>
      <GlassTabBar
        state={state}
        navigation={navigation}
        descriptors={{} as BottomTabBarProps['descriptors']}
        insets={{ top: 0, bottom: 0, left: 0, right: 0 }}
      />
    </View>
  );
}

function BottomSheetPreview() {
  const solidRef = useRef<GorhomBottomSheet>(null);
  const glassRef = useRef<GorhomBottomSheet>(null);

  return (
    <View className="w-full gap-3">
      <Row wrap={false}>
        <Button label="Ouvrir (solide)" size="sm" onPress={() => solidRef.current?.expand()} />
        <Button
          label="Ouvrir (verre)"
          size="sm"
          variant="secondary"
          onPress={() => glassRef.current?.expand()}
        />
      </Row>

      <BottomSheet ref={solidRef} snapPoints={['40%']}>
        <Text className="text-text-primary text-lg font-semibold">Feuille solide</Text>
        <Text className="text-text-secondary mt-1 text-sm">
          Variante par défaut — utilisée pour tout contenu lisible (étapes de réservation, options).
        </Text>
      </BottomSheet>

      <BottomSheet ref={glassRef} snapPoints={['40%']} variant="glass">
        <Text className="text-text-primary text-lg font-semibold">Feuille en verre</Text>
        <Text className="text-text-secondary mt-1 text-sm">
          Variante légère pour des panneaux transitoires — à utiliser avec parcimonie.
        </Text>
      </BottomSheet>
    </View>
  );
}

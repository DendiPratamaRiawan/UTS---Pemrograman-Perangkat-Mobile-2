import { ScrollView, StyleSheet, Text, View } from 'react-native';

import HelloFunctional from '@/components/praktikum/HelloFunctional';
import CardWithProps from '@/components/praktikum/CardWithProps';
import Counter from '@/components/praktikum/Counter';

/**
 * Screen Praktikum 2 – Functional Component
 * Materi: Pemrograman Mobile II
 */
export default function PraktikumScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Praktikum 2: Functional Component</Text>
      <Text style={styles.subtitle}>Pemrograman Mobile II - Expo</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. HelloFunctional (tanpa props)</Text>
        <HelloFunctional />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. CardWithProps (dengan props)</Text>
        <CardWithProps title="Card pertama" subtitle="Ini contoh component dengan props." />
        <CardWithProps title="Card kedua" subtitle="Props bisa optional (subtitle)." />
        <CardWithProps title="Card tanpa subtitle" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Counter (dengan useState)</Text>
        <Counter />
      </View>

      <Text style={styles.footer}>
        Panduan lengkap: doc/PRAKTIKUM_02_Functional_Component.md
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  footer: {
    fontSize: 12,
    color: '#999',
    marginTop: 16,
  },
});

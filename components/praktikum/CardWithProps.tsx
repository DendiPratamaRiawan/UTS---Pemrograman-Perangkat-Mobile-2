import { StyleSheet, Text, View } from 'react-native';

type CardWithPropsType = {
  title: string;
  subtitle?: string;
};

/**
 * Contoh Functional Component dengan Props.
 * Props = data yang dikirim dari parent (read-only).
 */
export default function CardWithProps({ title, subtitle }: CardWithPropsType) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginVertical: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

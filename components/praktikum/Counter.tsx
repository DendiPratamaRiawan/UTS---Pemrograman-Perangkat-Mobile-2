import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

/**
 * Contoh Functional Component dengan State (useState).
 * State = data yang bisa berubah di dalam component.
 */
export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Count: {count}</Text>
      <View style={styles.row}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={() => setCount(count - 1)}>
          <Text style={styles.buttonText}>Kurangi</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.button, styles.buttonPrimary, pressed && styles.buttonPressed]}
          onPress={() => setCount(count + 1)}>
          <Text style={[styles.buttonText, styles.buttonTextPrimary]}>Tambah</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2e7d32',
  },
  buttonPrimary: {
    backgroundColor: '#2e7d32',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  buttonTextPrimary: {
    color: '#fff',
  },
});

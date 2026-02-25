import { StyleSheet, Text, View } from 'react-native';

/**
 * Contoh paling sederhana: Functional Component tanpa props.
 * Lihat doc/PRAKTIKUM_02_Functional_Component.md
 */
export default function HelloFunctional() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Halo, ini Functional Component!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: '#1565c0',
  },
});

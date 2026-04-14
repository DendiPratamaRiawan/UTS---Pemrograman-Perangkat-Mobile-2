/**
 * mahasiswa-cloud.tsx — CRUD Mahasiswa (Create, Read, Delete).
 * Route: /(tabs)/mahasiswa-cloud
 */

import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type MahasiswaRow = {
  id: string;
  nim: string;
  nama: string;
  prodi: string;
  kelas: string | null;
  created_at: string;
  updated_at: string;
};

export default function MahasiswaCloudScreen() {
  const [rows, setRows] = useState<MahasiswaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State untuk Form Tambah Data
  const [nim, setNim] = useState("");
  const [nama, setNama] = useState("");
  const [prodi, setProdi] = useState("");
  const [kelas, setKelas] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isNarrow = width < 420;
  const padH = Math.max(16, Math.min(24, width * 0.045));

  // --- FUNGSI LOAD DATA ---
  const loadData = useCallback(async () => {
    if (!supabase) {
      setRows([]);
      setError(null);
      setLoading(false);
      setRefreshing(false);
      return;
    }
    setError(null);
    const { data, error: qErr } = await supabase
      .from("mahasiswa")
      .select("id,nim,nama,prodi,kelas,created_at,updated_at")
      .order("nim", { ascending: true });

    if (qErr) {
      setError(qErr.message);
      setRows([]);
    } else {
      setRows((data as MahasiswaRow[]) ?? []);
    }
    setLoading(false);
    setRefreshing(false);
  }, []);

  // --- FUNGSI TAMBAH DATA ---
  const handleAdd = async () => {
    if (!nim || !nama || !prodi) {
      Alert.alert("Peringatan", "NIM, Nama, dan Prodi wajib diisi!");
      return;
    }

    setIsSubmitting(true);
    const { error: insErr } = await supabase
      .from("mahasiswa")
      .insert([{ nim, nama, prodi, kelas: kelas || null }]);

    if (insErr) {
      Alert.alert("Gagal Menambah", insErr.message);
    } else {
      // Reset Form
      setNim("");
      setNama("");
      setProdi("");
      setKelas("");
      loadData(); // Refresh list
    }
    setIsSubmitting(false);
  };

  // --- FUNGSI HAPUS DATA ---
  const handleDelete = (id: string, namaMhs: string) => {
    Alert.alert(
      "Konfirmasi Hapus",
      `Apakah Anda yakin ingin menghapus data ${namaMhs}?`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            const { error: delErr } = await supabase
              .from("mahasiswa")
              .delete()
              .eq("id", id);

            if (delErr) {
              Alert.alert("Gagal Menghapus", delErr.message);
            } else {
              loadData();
            }
          },
        },
      ],
    );
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadData();
    }, [loadData]),
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const configured = isSupabaseConfigured();

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: padH, paddingBottom: 32 + insets.bottom },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            enabled={configured}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Data Mahasiswa (Cloud)</Text>
        <Text style={styles.subtitle}>
          Kelola data tabel <Text style={styles.mono}>public.mahasiswa</Text>
        </Text>

        {/* --- FORM TAMBAH DATA --- */}
        {configured && (
          <View style={styles.formContainer}>
            <TextInput
              placeholder="NIM"
              style={styles.input}
              value={nim}
              onChangeText={setNim}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Nama Lengkap"
              style={styles.input}
              value={nama}
              onChangeText={setNama}
            />
            <View style={styles.inputRow}>
              <TextInput
                placeholder="Prodi"
                style={[styles.input, { flex: 1 }]}
                value={prodi}
                onChangeText={setProdi}
              />
              <TextInput
                placeholder="Kelas"
                style={[styles.input, { width: 80 }]}
                value={kelas}
                onChangeText={setKelas}
              />
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.btnAdd,
                (pressed || isSubmitting) && styles.btnPressed,
              ]}
              onPress={handleAdd}
              disabled={isSubmitting}
            >
              <Text style={styles.btnAddText}>
                {isSubmitting ? "Menyimpan..." : "Tambah Data"}
              </Text>
            </Pressable>
          </View>
        )}

        {!configured ? (
          <Text style={styles.errText}>
            Konfigurasi Supabase belum lengkap di{" "}
            <Text style={styles.mono}>.env</Text>
          </Text>
        ) : null}

        {loading && !refreshing ? (
          <View style={styles.centerBox}>
            <ActivityIndicator size="large" color="#0a7ea4" />
            <Text style={styles.muted}>Memuat data…</Text>
          </View>
        ) : null}

        {!loading && configured && !error ? (
          <Text style={styles.count}>Total {rows.length} mahasiswa</Text>
        ) : null}

        {/* --- TAMPILAN CARD (MOBILE) --- */}
        {!loading && configured && rows.length > 0 && isNarrow ? (
          <View style={styles.cardList}>
            {rows.map((m, index) => (
              <View key={m.id} style={styles.card}>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>No</Text>
                  <Text style={styles.cardValue}>{index + 1}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>NIM</Text>
                  <Text style={styles.cardValue}>{m.nim}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Nama</Text>
                  <Text style={[styles.cardValue, styles.cardValueBold]}>
                    {m.nama}
                  </Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Prodi</Text>
                  <Text style={styles.cardValue}>{m.prodi}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Kelas</Text>
                  <Text style={styles.cardValue}>{m.kelas ?? "—"}</Text>
                </View>

                {/* Tombol Hapus Card */}
                <Pressable
                  onPress={() => handleDelete(m.id, m.nama)}
                  style={styles.btnDeleteCard}
                >
                  <Text style={styles.btnDeleteText}>Hapus Data</Text>
                </Pressable>
              </View>
            ))}
          </View>
        ) : null}

        {/* --- TAMPILAN TABEL (DESKTOP/WIDE) --- */}
        {!loading && configured && rows.length > 0 && !isNarrow ? (
          <>
            <View style={[styles.row, styles.headerRow]}>
              <Text style={[styles.cell, styles.cellNo, styles.headerText]}>
                No
              </Text>
              <Text style={[styles.cell, styles.cellNim, styles.headerText]}>
                NIM
              </Text>
              <Text style={[styles.cell, styles.cellNama, styles.headerText]}>
                Nama
              </Text>
              <Text style={[styles.cell, styles.cellProdi, styles.headerText]}>
                Prodi
              </Text>
              <Text style={[styles.cell, styles.cellKelas, styles.headerText]}>
                Kelas
              </Text>
              <Text style={[styles.cell, styles.cellAction, styles.headerText]}>
                Aksi
              </Text>
            </View>
            {rows.map((m, index) => (
              <View key={m.id} style={styles.row}>
                <Text style={[styles.cell, styles.cellNo]}>{index + 1}</Text>
                <Text style={[styles.cell, styles.cellNim]}>{m.nim}</Text>
                <Text style={[styles.cell, styles.cellNama]}>{m.nama}</Text>
                <Text style={[styles.cell, styles.cellProdi]}>{m.prodi}</Text>
                <Text style={[styles.cell, styles.cellKelas]}>
                  {m.kelas ?? "—"}
                </Text>

                {/* Tombol Hapus Tabel */}
                <Pressable
                  onPress={() => handleDelete(m.id, m.nama)}
                  style={styles.cellAction}
                >
                  <Text style={styles.deleteLink}>Hapus</Text>
                </Pressable>
              </View>
            ))}
          </>
        ) : null}

        {configured && !loading ? (
          <Pressable
            style={({ pressed }) => [
              styles.btnRefresh,
              pressed && styles.btnPressed,
            ]}
            onPress={onRefresh}
          >
            <Text style={styles.btnRefreshText}>Muat ulang</Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scroll: { flex: 1 },
  content: { paddingTop: 20, paddingBottom: 32 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 6,
  },
  subtitle: { fontSize: 15, color: "#5c5c5c", marginBottom: 16 },
  mono: { fontFamily: "monospace", fontSize: 14, color: "#333" },
  count: { fontSize: 14, color: "#333", marginBottom: 14, fontWeight: "500" },
  muted: { fontSize: 15, color: "#666", marginTop: 8 },
  errText: { fontSize: 15, color: "#b71c1c", marginBottom: 12 },
  centerBox: { paddingVertical: 32, alignItems: "center", gap: 12 },

  // Form Styles
  formContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    marginBottom: 24,
    gap: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    backgroundColor: "#fafafa",
  },
  inputRow: { flexDirection: "row", gap: 10 },
  btnAdd: {
    backgroundColor: "#0a7ea4",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 4,
  },
  btnAddText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  // Card Styles
  cardList: { gap: 12 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e8e8e8",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardLabel: { fontSize: 13, color: "#6c6c6c", flex: 0.4 },
  cardValue: { fontSize: 14, color: "#1a1a1a", flex: 0.6, textAlign: "right" },
  cardValueBold: { fontWeight: "600" },
  btnDeleteCard: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
  },
  btnDeleteText: { color: "#b71c1c", fontWeight: "bold", fontSize: 14 },

  // Table Styles
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  headerRow: { backgroundColor: "#0a7ea4", paddingVertical: 12 },
  headerText: { color: "#fff", fontWeight: "bold" },
  cell: { fontSize: 13, color: "#333" },
  cellNo: { width: 32, textAlign: "center" },
  cellNim: { width: 68 },
  cellNama: { flex: 1, minWidth: 72 },
  cellProdi: { width: 108 },
  cellKelas: { width: 48, textAlign: "center" },
  cellAction: { width: 60, alignItems: "center" },
  deleteLink: { color: "#b71c1c", fontWeight: "bold", fontSize: 12 },

  btnRefresh: {
    alignSelf: "flex-start",
    marginTop: 20,
    backgroundColor: "#0a7ea4",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  btnRefreshText: { color: "#fff", fontWeight: "600" },
  btnPressed: { opacity: 0.7 },
});

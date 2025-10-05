// ScheduleScreen.js

import React, { useState } from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Clipboard from '@react-native-clipboard/clipboard';
import { BackHandler } from 'react-native';
const { height } = Dimensions.get('window');

export default function ScheduleScreen({
  data,
  title = 'Attendance',
}) {
  
  const copyRow = item => {
    const text = `${item.period} — ${item.feculty}`;
    Clipboard.setString(text);
    Alert.alert('Copied', text);
  };

  const renderHeader = () => (
    <>
      <View style={styles.tableHeader}>
        <Text
          selectable
          userSelect="text"
          style={[styles.headerCell, styles.colPeriod]}
        >
          Period
        </Text>
        <Text
          selectable
          userSelect="text"
          style={[styles.headerCell, styles.colFaculty]}
        >
          Faculty
        </Text>
      </View>
    </>
  );

  const renderItem = ({ item, index }) => {
    const isEven = index % 2 === 0;
    return (
      <Pressable onLongPress={() => copyRow(item)}>
        <View style={[styles.row, isEven ? styles.rowEven : styles.rowOdd]}>
          <Text
            selectable
            userSelect="text"
            selectionColor="#6366f166"
            style={[styles.cell, styles.colPeriod]}
            numberOfLines={1}
          >
            {item.period}
          </Text>
          <Text
            selectable
            userSelect="text"
            selectionColor="#6366f166"
            style={[styles.cell, styles.colFaculty]}
            numberOfLines={1}
          >
            {item.faculty}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
    >
      <StatusBar backgroundColor="#f8f9ff" barStyle="dark-content" />

      {/* Background Gradient */}
      <LinearGradient
        colors={['#f8f9ff', '#e8f0fe', '#f0f4ff']}
        style={styles.backgroundGradient}
        pointerEvents="none"
      />

      {/* Floating Background Elements */}
      <View style={[styles.floatingElement, styles.element1]}>
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
          style={styles.elementGradient}
          pointerEvents="none"
        />
      </View>
      <View style={[styles.floatingElement, styles.element2]}>
        <LinearGradient
          colors={['#8b5cf6', '#06b6d4']}
          style={styles.elementGradient}
          pointerEvents="none"
        />
      </View>
      <View style={[styles.floatingElement, styles.element3]}>
        <LinearGradient
          colors={['#06b6d4', '#10b981']}
          style={styles.elementGradient}
          pointerEvents="none"
        />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>Periods and assigned faculty</Text>
        </View>

        {/* Glass Card */}
        {/* Glass Card */}
        <View style={styles.glassCard}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.1)']}
            style={styles.glassBackground}
            pointerEvents="none"
          />

          {data && data.length > 0 ? (
            // ✅ Show table when there is data
            <View style={styles.tableContainer}>
              {renderHeader()}
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, idx) => `${item.period}-${idx}`}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                scrollEnabled={false}
              />
            </View>
          ) : (
            // ✅ Show empty message when data is empty
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                🎉 You have no absents today!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative' },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  floatingElement: {
    position: 'absolute',
    borderRadius: 100,
    overflow: 'hidden',
  },
  elementGradient: { width: '100%', height: '100%', opacity: 0.1 },
  element1: { width: 200, height: 200, top: -50, right: -50 },
  element2: { width: 150, height: 150, bottom: 100, left: -30 },
  element3: { width: 100, height: 100, top: height * 0.4, right: 20 },

  scrollContainer: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  header: { alignItems: 'center', marginBottom: 28 },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 14, color: '#6b7280', textAlign: 'center' },

  glassCard: {
    position: 'relative',
    borderRadius: 24,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    ...Platform.select({
      ios: {
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'transparent',
      },
      android: { elevation: 0, shadowColor: 'transparent' },
    }),
  },
  glassBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
    opacity: 0.8,
  },

  tableContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(99,102,241,0.12)',
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  headerCell: { color: '#4b5563', fontWeight: '700', fontSize: 14 },
  colPeriod: { flex: 0.35 },
  colFaculty: { flex: 0.65 },

  row: { flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 14 },
  rowEven: { backgroundColor: 'rgba(255,255,255,0.45)' },
  rowOdd: { backgroundColor: 'rgba(255,255,255,0.3)' },

  cell: { color: '#111827', fontSize: 15, fontWeight: '500' },

  separator: { height: 1, backgroundColor: 'rgba(148,163,184,0.25)' },

  emptyState: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: { color: '#6b7280', fontSize: 14, fontWeight: '500' },
});

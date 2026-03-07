/**
 * AttendeesScreen - Concert attendees management screen
 * 
 * Features:
 * - Add new attendees with name and email
 * - Display list of attendees
 * - Delete individual attendees
 * - Empty state when no attendees
 * 
 * Navigation Flow:
 * - This is a tab in the MainTabs (Bottom Tab Navigator)
 * - Part of the authenticated flow after Login
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// Attendee data type
interface Attendee {
  id: string;
  name: string;
  email: string;
};

/**
 * Generate a unique ID for each attendee
 */
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const AttendeesScreen: React.FC = () => {
  // State for attendees list
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  
  // State for input fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  /**
   * Add a new attendee to the list
   */
  const addAttendee = () => {
    // Validate inputs
    if (!name.trim() || !email.trim()) {
      Alert.alert(
        'Missing Information',
        'Please enter both name and email.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert(
        'Invalid Email',
        'Please enter a valid email address.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Create new attendee
    const newAttendee: Attendee = {
      id: generateId(),
      name: name.trim(),
      email: email.trim(),
    };

    // Add to list
    setAttendees(prevAttendees => [...prevAttendees, newAttendee]);

    // Clear input fields
    setName('');
    setEmail('');
  };

  /**
   * Delete an attendee from the list
   */
  const deleteAttendee = (id: string) => {
    Alert.alert(
      'Delete Attendee',
      'Are you sure you want to remove this attendee?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setAttendees(prevAttendees => 
              prevAttendees.filter(attendee => attendee.id !== id)
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  /**
   * Render individual attendee card
   */
  const renderAttendeeItem = ({ item }: { item: Attendee }) => (
    <View style={styles.attendeeCard}>
      <View style={styles.attendeeInfo}>
        <Text style={styles.attendeeName}>{item.name}</Text>
        <Text style={styles.attendeeEmail}>{item.email}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteAttendee(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Concert Attendees</Text>
          <Text style={styles.headerSubtitle}>
            {attendees.length} {attendees.length === 1 ? 'person' : 'people'} attending
          </Text>
        </View>

        {/* Input Section */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={addAttendee}
          >
            <Text style={styles.addButtonText}>+ Add Attendee</Text>
          </TouchableOpacity>
        </View>

        {/* Attendee List */}
        <FlatList
          data={attendees}
          keyExtractor={(item) => item.id}
          renderItem={renderAttendeeItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🎵</Text>
              <Text style={styles.emptyText}>
                No attendees yet. Add someone to the concert!
              </Text>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1a73e8',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  inputContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#1a73e8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  attendeeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  attendeeInfo: {
    flex: 1,
    marginRight: 12,
  },
  attendeeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  attendeeEmail: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#e53935',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default AttendeesScreen;


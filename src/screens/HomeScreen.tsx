/**
 * HomeScreen - Displays the list of expenses
 * 
 * Navigation Flow:
 * - This is a tab in the MainTabs (Bottom Tab Navigator)
 * - Part of the authenticated flow after Login
 * - User cannot navigate back to Login from this screen
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabsParamList } from '../navigation/MainTabs';
import { RootStackParamList } from '../navigation/AppNavigator';

// Sample expense data type
interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

// Sample expense list
const SAMPLE_EXPENSES: Expense[] = [
  { id: '1', description: 'Grocery Shopping', amount: 85.50, category: 'Food', date: '2024-01-15' },
  { id: '2', description: 'Bus Fare', amount: 25.00, category: 'Transport', date: '2024-01-14' },
  { id: '3', description: 'Electricity Bill', amount: 120.00, category: 'Utilities', date: '2024-01-13' },
  { id: '4', description: 'Movie Tickets', amount: 45.00, category: 'Entertainment', date: '2024-01-12' },
  { id: '5', description: 'Restaurant Dinner', amount: 65.00, category: 'Food', date: '2024-01-11' },
  { id: '6', description: 'New Headphones', amount: 150.00, category: 'Shopping', date: '2024-01-10' },
  { id: '7', description: 'Internet Bill', amount: 80.00, category: 'Utilities', date: '2024-01-09' },
  { id: '8', description: 'Coffee', amount: 5.50, category: 'Food', date: '2024-01-08' },
];

// For nested navigation (nesting stack inside tabs)
type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabsParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // Calculate total expenses
  const totalExpenses = SAMPLE_EXPENSES.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Render individual expense item
  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <View style={styles.expenseItem}>
      <View style={styles.expenseLeft}>
        <Text style={styles.expenseDescription}>{item.description}</Text>
        <Text style={styles.expenseCategory}>{item.category} • {item.date}</Text>
      </View>
      <Text style={styles.expenseAmount}>-${item.amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Expenses</Text>
        <Text style={styles.headerSubtitle}>
          Total: ${totalExpenses.toFixed(2)}
        </Text>
      </View>

      {/* Expense List */}
      <FlatList
        data={SAMPLE_EXPENSES}
        keyExtractor={(item) => item.id}
        renderItem={renderExpenseItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No expenses yet</Text>
          </View>
        }
      />

      {/* Add Expense Button (Mock) */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Expense</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  expenseItem: {
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
  expenseLeft: {
    flex: 1,
  },
  expenseDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  expenseCategory: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e53935',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: '#1a73e8',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#1a73e8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;


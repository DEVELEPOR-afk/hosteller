import { Link, useRouter } from 'expo-router';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ComponentProps } from 'react';
import { useAuthContext } from '../providers/AuthProvider';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  const navigateToSettings = () => {
    router.push('/settings');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.appTitle}>TravelConnect</Text>
            <Text style={styles.subTitle}>Share contacts, connect globally</Text>
          </View>
          <TouchableOpacity
            onPress={navigateToSettings}
            style={styles.settingsButton}
            activeOpacity={0.7}
          >
            <Ionicons name="settings-outline" size={wp('5%')} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.section}>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={wp('6%')} color="#3B82F6" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.welcome}>Welcome back!</Text>
                <Text style={styles.email}>{user?.email || 'Signed in'}</Text>
              </View>
            </View>

            <View style={styles.gradientBox}>
              <Text style={styles.gradientTitle}>Ready to explore?</Text>
              <Text style={styles.gradientSub}>
                Connect with fellow travelers and share your journey
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.quickActions}>
            <View style={styles.actionColumn}>
              {quickActionData.slice(0, 3).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.actionCard}
                  onPress={() => item.route && router.push(item.route as any)}
                >
                  <View style={[styles.actionIcon, { backgroundColor: item.bg }]}>
                    <Ionicons name={item.icon} size={wp('6%')} color={item.color} />
                  </View>
                  <Text style={styles.actionTitle}>{item.title}</Text>
                  <Text style={styles.actionDesc}>{item.desc}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.actionColumn}>
              {quickActionData.slice(3, 6).map((item, index) => (
                <TouchableOpacity
                  key={index + 3}
                  style={styles.actionCard}
                  onPress={() => item.route && router.push(item.route as any)}
                >
                  <View style={[styles.actionIcon, { backgroundColor: item.bg }]}>
                    <Ionicons name={item.icon} size={wp('6%')} color={item.color} />
                  </View>
                  <Text style={styles.actionTitle}>{item.title}</Text>
                  <Text style={styles.actionDesc}>{item.desc}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          <View style={styles.activityCard}>
            {recentActivity.map((act, idx) => (
              <View
                key={idx}
                style={[
                  styles.activityRow,
                  idx < recentActivity.length - 1 && styles.activityBorder,
                ]}
              >
                <View style={[styles.activityIcon, { backgroundColor: act.bg }]}>
                  <Ionicons name={act.icon} size={wp('4%')} color={act.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.activityTitle}>{act.title}</Text>
                  <Text style={styles.activityDesc}>{act.desc}</Text>
                </View>
                <Text style={styles.activityTime}>{act.time}</Text>
              </View>
            ))}

            <TouchableOpacity style={{ padding: wp('4%') }}>
              <Text style={styles.viewAll}>View all activity</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Card */}
        <View style={styles.section}>
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Your Travel Network</Text>

            <View style={styles.statsRow}>
              {statsData.map((stat, idx) => (
                <View key={idx} style={{ alignItems: 'center' }}>
                  <Text style={styles.statsNumber}>{stat.value}</Text>
                  <Text style={styles.statsLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

type IconName = ComponentProps<typeof Ionicons>['name'];

interface QuickAction {
  title: string;
  desc: string;
  icon: IconName;
  bg: string;
  color: string;
  route?: '/cards' | '/sharing' | '/connections' | string;
}

interface Activity {
  title: string;
  desc: string;
  icon: IconName;
  bg: string;
  color: string;
  time: string;
}

const quickActionData: QuickAction[] = [
  { title: 'Cards', desc: 'Manage your cards', icon: 'card-outline', bg: '#DBEAFE', color: '#3B82F6', route: '/cards' },
  { title: 'Share Contact', desc: 'Share your details with travelers', icon: 'add-circle-outline', bg: '#D1FAE5', color: '#059669', route: '/sharing' },
  { title: 'Find Travelers', desc: 'Discover nearby travelers', icon: 'people-outline', bg: '#EDE9FE', color: '#7C3AED' },
  { title: 'My Connections', desc: 'View shared cards', icon: 'link-outline', bg: '#F3E8FF', color: '#8B5CF6', route: '/connections' },
  { title: 'My Location', desc: 'Update your current location', icon: 'location-outline', bg: '#FFEDD5', color: '#EA580C' },
  { title: 'Messages', desc: 'Chat with connections', icon: 'chatbubbles-outline', bg: '#FCE7F3', color: '#DB2777' },
];

const recentActivity: Activity[] = [
  { title: 'New connection', desc: 'Someone saved your contact', icon: 'person-add', bg: '#DBEAFE', color: '#3B82F6', time: '2h ago' },
  { title: 'Location updated', desc: 'Now visible to nearby travelers', icon: 'location', bg: '#D1FAE5', color: '#059669', time: '1d ago' },
];

const statsData = [
  { value: '12', label: 'Connections' },
  { value: '5', label: 'Countries' },
  { value: '28', label: 'Interactions' },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4FF' },
  header: {
    backgroundColor: '#fff',
    paddingTop: hp('6%'),
    paddingBottom: hp('3%'),
    paddingHorizontal: wp('4%'),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  appTitle: { fontSize: wp('6%'), fontWeight: 'bold', color: '#111827' },
  subTitle: { color: '#4B5563', fontSize: wp('3.5%'), marginTop: hp('0.5%') },
  settingsButton: {
    width: wp('10%'),
    height: wp('10%'),
    backgroundColor: '#F3F4F6',
    borderRadius: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: { paddingHorizontal: wp('4%'), marginBottom: hp('2%') },
  card: {
    backgroundColor: '#fff',
    borderRadius: wp('4%'),
    padding: wp('5%'),
    shadowOpacity: 0.05,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: hp('2%') },
  avatar: {
    width: wp('12%'),
    height: wp('12%'),
    backgroundColor: '#DBEAFE',
    borderRadius: wp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('4%'),
  },
  welcome: { fontSize: wp('4.5%'), fontWeight: '600', color: '#111827' },
  email: { color: '#4B5563', fontSize: wp('3.5%') },
  gradientBox: { backgroundColor: '#3B82F6', borderRadius: wp('3%'), padding: wp('4%') },
  gradientTitle: { color: '#fff', fontWeight: '500', marginBottom: hp('0.5%') },
  gradientSub: { color: '#BFDBFE', fontSize: wp('3.5%') },
  sectionTitle: { color: '#374151', fontWeight: '600', fontSize: wp('4.5%'), marginBottom: hp('1%') },
  quickActions: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingHorizontal: wp('1%'),
  },
  actionColumn: { 
    flex: 1, 
    marginHorizontal: wp('1.5%'),
    maxWidth: wp('47%'),
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    padding: wp('4%'),
    shadowOpacity: 0.05,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: hp('1.5%'),
    height: hp('14%'),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  actionIcon: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('1%'),
  },
  actionTitle: { 
    fontWeight: '500', 
    color: '#111827', 
    marginBottom: hp('0.5%'),
    fontSize: wp('3.8%'),
    lineHeight: wp('4.5%'),
  },
  actionDesc: { 
    color: '#4B5563', 
    fontSize: wp('3.2%'),
    lineHeight: wp('4%'),
    flexShrink: 1,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    shadowOpacity: 0.05,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
  },
  activityRow: { flexDirection: 'row', alignItems: 'center', padding: wp('4%') },
  activityBorder: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  activityIcon: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3%'),
  },
  activityTitle: { fontWeight: '500', color: '#111827' },
  activityDesc: { color: '#6B7280', fontSize: wp('3.2%') },
  activityTime: { color: '#9CA3AF', fontSize: wp('2.8%') },
  viewAll: { color: '#2563EB', fontWeight: '500', textAlign: 'center' },
  statsCard: {
    backgroundColor: '#6366F1',
    borderRadius: wp('3%'),
    padding: wp('5%'),
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  statsTitle: { color: '#fff', fontWeight: '600', fontSize: wp('4.5%'), marginBottom: hp('2%') },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statsNumber: { color: '#fff', fontSize: wp('6%'), fontWeight: 'bold' },
  statsLabel: { color: '#C7D2FE', fontSize: wp('3.2%') },
});
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  tabContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  tabItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 7,
    backgroundColor: '#f2f2f2',
  },
  activeTabItem: {
    backgroundColor: '#fff8dc',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  tabText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  emptyCart: {flexDirection: 'row', alignItems: 'center'},
});

export default styles;

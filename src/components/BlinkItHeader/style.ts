import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'gold',
    elevation: 3,
  },
  leftContainer: {
    flexDirection: 'column',
  },
  blinkitText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  timeText: {
    fontSize: 26,
    color: '#555',
    marginTop: 2,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginTop: 2,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    marginTop: 30,
  },
  cartContainer: {
    marginRight: 15,
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  profileIcon: {
    padding: 4,
  },
  logoutPopup: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    elevation: 5,
    zIndex: 10,
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
    fontWeight: '600',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  modalMessage: {
    fontSize: 15,
    color: '#444',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#ddd',
  },
  logoutButton: {
    backgroundColor: 'red',
  },
  cancelText: {
    color: '#000',
    fontWeight: '600',
  },
  logoutConfirmText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default styles;

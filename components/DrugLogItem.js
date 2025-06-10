import { View, Text, StyleSheet, Pressable } from 'react-native';

function DrugLogItem(props) {
  function deleteItem() {
    props.onDelete(props.item.id);
  }

  return (
    <View style={styles.logItemCard}>
      <Pressable
        android_ripple={{ color: '#f5f5f5' }}
        style={({ pressed }) => pressed && styles.pressedItem}
        onLongPress={deleteItem}
      >
        <View style={styles.logItemData}>
          <Text style={{ fontWeight: 'bold' }}>{props.item.drugName}</Text>
          <Text>Dosage: {props.item.dosage}</Text>
          <Text>Time: {props.item.time}</Text>
          <Text>Notes: {props.item.notes}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  logItemData: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  pressedItem: {
    opacity: 0.5,
  },

  logItemCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default DrugLogItem;

import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import axios from "axios";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [petOwnerName, setPetOwnerName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [vetName, setVetName] = useState("");
  const [status, setStatus] = useState(null);

  const addPetOwner = async () => {
    var token = await SecureStore.getItemAsync("secure_token");

    const values = {
      petOwnerName,
      address,
      contactNo,
      vetName,
    };

    let headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    const { status } = await axios.post(
      //"http://localhost:8080/api/savePetOwnerToVet",
      "http://192.168.1.31:8080/api/savePetOwnerToVet",
      values,
      headers
    );
    setStatus(status);
  };

  useEffect(() => {
    if (status === 200) {
      setModalVisible(!modalVisible);
    }
  }, [status]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredViewPopUp}>
          <View style={styles.modalView}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Pet Owner Name"
                  value={petOwnerName}
                  onChangeText={(text) => setPetOwnerName(text)}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Address"
                  value={address}
                  onChangeText={(text) => setAddress(text)}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Contact No"
                  value={contactNo}
                  onChangeText={(text) => setContactNo(text)}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Veterinary Name"
                  value={vetName}
                  onChangeText={(text) => setVetName(text)}
                  style={styles.input}
                />
              </View>
            </KeyboardAvoidingView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={addPetOwner}
            >
              <Text style={styles.textStyle}>Save Pet Owner</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>New Pet Owner</Text>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "top",
    alignItems: "center",
    marginTop: 550,
  },
  centeredViewPopUp: {
    alignItems: "center",
    marginTop: 250,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "gray",
    paddingHorizontal: 55,
    paddingVertical: 8,
    borderRadius: 15,
    marginTop: 7,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});

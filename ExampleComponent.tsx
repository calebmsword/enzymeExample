import React, {useState} from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

const newClient = (newClientID:string, newClientName:string) => {
    console.log(newClientID+newClientName);
}

const ExampleComponent=( {addNewClient = newClient} ) => {
    const [newClientID, setNewClientID] = useState("")
    const [newClientName, setNewClientName] = useState("")
    return (
        <View>
            <Text>Please Enter New Client Information:</Text>
            <View>
                <Text>New Client ID:  </Text>
                <TextInput 
                 
                    keyboardType="default" 
                    placeholder="New Client ID"                
                    onChangeText={text => setNewClientID(text)}                 
                />
                  
                <Text>New Client Name: </Text>
                <TextInput
                    keyboardType="default" 
                    placeholder="New Client Name"                 
                    defaultValue={""}
                    onChangeText={text => setNewClientName(text)}                    
                />   
            </View>
            <View>
                <TouchableOpacity >
                    <Text onPress={() => addNewClient(newClientID, newClientName)} >
                        Add a New Client
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ExampleComponent;
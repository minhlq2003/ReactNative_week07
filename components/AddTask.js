import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";

const handleAddTask = async (title) => {
    try {
        const response = await fetch(`https://670b380aac6860a6c2cb6db9.mockapi.io/todoapi/job`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                isFinished: false
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Task added:', data);
    } catch (error) {
        console.error('Error adding task:', error);
    }
};
function AddTask() {
    const [title, setTitle] = useState("");
    return (  
        <View>
            <Text style={{alignSelf:"center", fontSize:30, paddingBottom: 50}}>Add Task</Text>
            <TextInput placeholder="input your task" onChangeText={(value)=>setTitle(value)} value={title}/>
            <TouchableOpacity onPress={()=> handleAddTask(title)} style={{backgroundColor:"blue"}}>
                <Text style={{alignSelf: "center", fontSize: 20, color:"white"}}>
                    Finish 
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default AddTask;
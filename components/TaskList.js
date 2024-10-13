import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { FlatList, SafeAreaView, View , Text, TouchableOpacity} from "react-native";
import { Checkbox } from "react-native-paper";


const handleCheckTask = async (id, isFinished) => {
    try {
        const response = await fetch(`https://670b380aac6860a6c2cb6db9.mockapi.io/todoapi/job/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isFinished: !isFinished
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Task updated:', data);
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

const Item = ({id, title, isFinished }) => {
    return (
        <View style={{flexDirection: "row", justifyContent:"space-between"}}>
            <Text>{title}</Text>
            <Checkbox
                status={isFinished ? 'checked' : 'unchecked'}
                onPress={() => {
                   handleCheckTask(id, isFinished);
                }}
            />
        </View>
    );
};

function TaskList() {
    const [task, setTask] = useState([]);
    const navigation = useNavigation();
    
    useEffect(() => {
        setTask([]);
        fetch(`https://670b380aac6860a6c2cb6db9.mockapi.io/todoapi/job`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((data) => {
                setTask(data);
            });

    }, [handleCheckTask]);

    return ( 
        <SafeAreaView>
            <View style={{alignItems:"center", marginBottom: 50}}><Text style={{ fontSize:30}}>TaskList</Text></View>
            <FlatList
                data={task}
                renderItem={({ item }) => <Item id={item.id} title={item.title} isFinished={item.isFinished} />}
                keyExtractor={item => item.id}
            />
            <View>
                <TouchableOpacity style={{backgroundColor:"blue"}} onPress={()=>{
                    navigation.navigate("AddTask")
                }} >
                    <Text style={{fontSize: 20, color: "white", textAlign: "center"}}>Add Task</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default TaskList;
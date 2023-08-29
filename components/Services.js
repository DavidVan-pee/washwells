import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const Services = [
  {
    id: "0",
    image: "https://img.freepik.com/free-vector/washing-machine-laundry-set-cartoon-icon-illustration-technology-fashion-icon-concept-isolated-flat-cartoon-style_138676-2150.jpg?w=2000",
    name: "Washing",
  },
  {
    id: "11",
    image: "https://png.pngtree.com/template/20190308/ourlarge/pngtree-clean-laundry-icon-image_63960.jpg",
    name: "Laundry",
  },
  {
    id: "12",
    image: "https://static.vecteezy.com/system/resources/previews/015/070/638/original/iron-icon-cartoon-style-vector.jpg",
    name: "Wash & Iron",
  },
  {
    id: "13",
    image: "https://i.pinimg.com/originals/fd/0b/43/fd0b43c215fc4d57f081386a9f77b5a9.png",
    name: "Cleaning",
  },
];

const ServicesComponent = () => {
  return (
    <View style={{padding:10}}>
        <Text style={{fontSize:16,fontWeight:"500",marginBottom:7}}>Services Offered</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Services.map((service, index) => (
          <Pressable style={{margin:10,backgroundColor:"white", padding:20,borderRadius:7}}key={index}>
            <Image source={{ uri: service.image }} style={{ width: 70, height: 70 }} />
            <Text style={{textAlign:"center",marginTop:10}}>{service.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default ServicesComponent;

const styles = StyleSheet.create({});

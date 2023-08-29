import { StyleSheet, Text, View, SafeAreaView, Alert, Pressable, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from "expo-location"
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Creative from '../components/Creative';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../ProductReducer';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { collection, getDoc, getDocs } from 'firebase/firestore';



const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [items,setItems] = useState([]);
  const total = cart.map((item) => item.quantity * item.price).reduce((curr,prev) => curr + prev,0);
  const navigation = useNavigation();
  console.log(cart);
  const [displayCurrentAddress, setdisplayCurrentAddress] = useState("we are loading your location");
  const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert('Location Services not enabled', 'Please enable the location services', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ]);
    } else {
      setlocationServicesEnabled(enabled)
    }
  }
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert('Permission not granted', 'Allow the app to use the location services', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ]);
    }

    const { coords } = await Location.getCurrentPositionAsync();
    //console.log(coords)
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      //console.log(response)

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setdisplayCurrentAddress(address)
      }
    }
  };
  const product= useSelector((state) =>state.product.product);
  const dispatch= useDispatch();
  console.log("product array" , product);
  useEffect(() =>{
     if(product.length > 0) return;

     const fetchProducts = async () => {
      const colRef = collection(db,"types")
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
       items.push(doc.data());   
      });
      items.map((service) => dispatch(getProducts(service)));
     };
     fetchProducts();
  }, []);
  console.log(product);
  
  const services = [
    {
      id: "0",
      image: "https://cdn.icon-icons.com/icons2/1082/PNG/512/tshirt_78128.png",
      name: "Shirt",
      quantity: 0,
      price: 5,
    },
    {
      id: "11",
      image: "https://png.pngtree.com/png-vector/20191113/ourmid/pngtree-singlet-icon-flat-style-png-image_1977452.jpg",
      name: "Tank Top",
      quantity: 0,
      price: 3,
    },
    {
      id: "19",
      image: "https://cdn-icons-png.flaticon.com/512/1785/1785375.png",
      name: "Dress",
      quantity: 0,
      price: 5,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/512/776/776586.png",
      name: "Trousers",
      quantity: 0,
      price: 8,
    },
    {
      id: "13",
      image: "https://previews.123rf.com/images/bsd555/bsd5551709/bsd555170900295/85490613-swimming-trunks-color-icon-sport-shorts-isolated-vector-illustration.jpg",
      name: "Shorts",
      quantity: 0,
      price: 5,
    },
    {
      id: "14",
      image: "https://www.pngitem.com/pimgs/m/8-89863_coat-clipart-transparent-background-hoodie-clipart-hd-png.png",
      name: "Hoodies",
      quantity: 0,
      price: 5,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/512/2793/2793843.png",
      name: "Skirt",
      quantity: 0,
      price: 4,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/512/343/343293.png",
      name: "Underwear",
      quantity: 0,
      price: 3,
    },
    {
      id: "17",
      image: "https://cdn-icons-png.flaticon.com/512/2737/2737843.png",
      name: "Bedsheet",
      quantity: 0,
      price: 10,
    },
    {
      id: "18",
      image: "https://cdn-icons-png.flaticon.com/512/564/564001.png",
      name: "Towel",
      quantity: 0,
      price: 10,
    },
  ];
 
  return (
    <>
    <ScrollView style ={{backgroundColor:"#F0F0F0",flex:1, marginTop:50}}>
      {/*Location and profile*/}
      <View style={{flexDirection:"row",alignItems:"center",padding:10}}>
        <MaterialIcons name="location-on" size={30} color="#fd5c63" />
        <View>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Home</Text>
          <Text >{displayCurrentAddress}</Text>
        </View>

        <Pressable 
        onPress={() => navigation.navigate("Profile")}
        style={{marginLeft:"auto",marginRight:7}}>
          <Image 
          style={{ width: 40, height: 40, borderRadius: 20 }} 
          source={{ uri: "https://storiespub.com/wp-content/uploads/2022/03/18.jpg" }} />
        </Pressable>
      </View>
      
      {/*search bar*/}
      <View style=
      {{padding:10,
        margin:10,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderWidth:0.8,
        borderColor:"C0C0C0",
        borderRadius:7
        }}>
        <TextInput placeholder="Search for items or more"/>
        <Feather name="search" size={24} color="#fd5c63" />
      </View>

      {/*Image Carousel*/}
      <Creative/>

      {/*Services Components*/}
      <Services/>

      {/*Render all the products*/}
      {product.map((item,index) =>(
        <DressItem item={item} key={index}/>
      ))}

    </ScrollView>

    {total === 0 ?(
      null
    ):(
      <Pressable style={{
        backgroundColor:"#088F8F",
        padding:10,
        marginBottom:40,
        margin:15,
        borderRadius:7,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
        }}>
        <View>
        <Text style={{fontSize:17,fontWeight:"600", color:"white"}}>{cart.length} items |  GH₵{total}</Text>
        <Text style={{fontSize:15,fontWeight:"400",color:"white",marginVertical:6}}>Extra charges might apply</Text>
        </View>
        <Pressable onPress={() => navigation.navigate("PickUp")}>
          <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>Proceed to Pick up</Text>
        </Pressable>
      </Pressable>

    )}

    

    </>
  );
}

export default HomeScreen

const styles = StyleSheet.create({})

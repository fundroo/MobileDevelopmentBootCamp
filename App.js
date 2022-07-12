/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  BackHandler,
  FlatList
} from 'react-native';

import productDW from './src/assets/images/background/product-showcase.png';
import interiorDW from './src/assets/images/background/interior-product-showcase.jpg';
import ARIcon from './src/assets/images/transparent/augmented-reality-icon.png';
import { RNCamera } from 'react-native-camera';
import Gestures from 'react-native-easy-gestures';
import data from './src/model/data';
import engineLogo from './src/assets/images/background/engine-logo.png';
import transmissionLogo from './src/assets/images/background/transmission-logo.png';
import seatLogo from './src/assets/images/background/seat-logo.png';
import mileageLogo from './src/assets/images/background/mileage-logo.png';
import typeLogo from './src/assets/images/background/type-logo.png';

const App = () => {

  const [isAr, setIsAr] = useState(false)
  const [imageGesture, setImageGesture] = useState(data.listOfShowCase[0])

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      console.log({granted})
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsAr(true)
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    const backAction = () => {
      setIsAr(false)
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  if(isAr) {
    return (
      <View style={styles.containerAR}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
        />
        <View style={styles.gestureView}>
        <Gestures>
          <Image
            source={imageGesture}
            style={styles.gestureImage}
          />
        </Gestures>
        </View>
        <View style={styles.bottomView}>
          <FlatList 
            horizontal
            data={data.listOfShowCase}
            renderItem={({item})=>(
              <TouchableOpacity style={styles.buttonOption} onPress={()=> setImageGesture(item)}>
                <Image source={item} style={styles.imagePreview} />
              </TouchableOpacity>
            )}
            keyExtractor={(_,index)=> index}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <ScrollView horizontal>
          <Image source={productDW} style={styles.image} />
          <Image source={interiorDW} style={styles.image} />
        </ScrollView>
          <View style={styles.body}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.subTitle}>{data.subTitile}</Text>
            <Text style={styles.price}>{data.price}</Text>
            <Text style={styles.color}>Warna :</Text>
              <View style={styles.row}>
                {data.color.map((item, index)=> <View key={index} style={[styles.round, {backgroundColor: item}]} />)}
              </View>
        
            <Text style={styles.descriptionTitle}>Detail</Text>
            <Text style={styles.description}>{data.description}</Text>

              <View style={styles.row}></View>
            
            <Text style={styles.dimensionTitle}>Dimension</Text>
            <Text style={styles.dimension}>{data.dimension}</Text>
            
              <View style={styles.row}></View>
            
            <Text style={styles.serviceRecordTitle}>Last Service Record</Text>
            <Text style={styles.serviceRecord}>{data.servicerecord}</Text>

            <ScrollView horizontal>
              <View style={styles.box1}>
                <Image source={engineLogo} style={styles.engineLogo} />
                <Text style={styles.engine}>{data.engine}</Text>
              </View>
              <View style={styles.box2}>
                <Image source={transmissionLogo} style={styles.transmissionLogo} />
                <Text style={styles.transmission}>{data.transmission}</Text>
              </View>
              <View style={styles.box3}>
                <Image resizeMode='cover' source={seatLogo} style={styles.seatLogo} />
                <Text style={styles.seat}>{data.seat}</Text>
              </View>
              <View style={styles.box4}>
                <Image resizeMode='cover' source={mileageLogo} style={styles.mileageLogo} />
                  <Text style={styles.mileage}>{data.mileage}</Text>
              </View>
              <View style={styles.box5}>
                <Image source={typeLogo} style={styles.typeLogo} />
                <Text style={styles.type}>{data.type}</Text>
              </View>
            </ScrollView>
          </View>
      </ScrollView>
      
      <TouchableOpacity style={styles.button} onPress={()=>requestCameraPermission()}>
        <Image source={ARIcon} style={styles.ARIcon} />
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  image: {
    width: 520, 
    height: 250,
  },
  body: {
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: -15,
    paddingTop: 30,
    height: 740,
    backgroundColor:'#ffd500'
  },  
  box1: {
    borderRadius: 20,
    width: 90,
    height: 150,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor:'white'
  },
  box2: {
    borderRadius: 20,
    width: 90,
    height: 150,
    marginRight: 20,
    backgroundColor:'white'
  },
  box3: {
    borderRadius: 20,
    width: 90,
    height: 150,
    marginRight: 20,
    backgroundColor:'white'
  },
  box4: {
    borderRadius: 20,
    width: 90,
    height: 150,
    marginRight: 20,
    backgroundColor:'white'
  },
  box5: {
    borderRadius: 20,
    width: 90,
    height: 150,
    marginRight: 20,
    backgroundColor:'white'
  },
  mileage: {
    fontFamily: "roboto",
    color: "black",
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 22
  },
  engine: {
    fontFamily: "roboto",
    color: "black",
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 30
  },
  seat: {
    fontFamily: "roboto",
    color: "black",
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 45
  },
  transmission: {
    fontFamily: "roboto",
    color: "black",
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 45
  },
  type: {
    fontFamily: "roboto",
    color: "black",
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 43
  },
  engineLogo: {
    width: 80,
    height: 80,
    marginLeft: 5
  },
  transmissionLogo: {
    width: 50,
    height: 50,
    marginLeft: 20,
    marginTop: 15
  },
  seatLogo: {
    width: 39,
    height: 55,
    marginTop: 10,
    alignSelf: 'center'
  },
  mileageLogo: {
    width: 80,
    height: 80,
    marginLeft: 5,
    marginTop: 8,
  },
  typeLogo: {
    width: 80,
    height: 31,
    marginTop: 35,
    alignSelf: 'center'
  },
  title: {
    fontFamily: "roboto",
    fontSize: 32,
    color: "black",
    fontWeight:'bold',
  },
  subTitle: {
    fontFamily: "serif",
    fontSize: 18,
    color: 'black',
    marginBottom: 10
  },
  price: {
    fontFamily: "roboto",
    fontSize: 18,
    color: "black",
    marginBottom: 10
  },
  color: {
    fontFamily: "roboto",
    fontSize: 16,
    color: "black",
    marginBottom: 5
  },
  row: {
    flexDirection:'row',
    marginBottom: 20
  },
  round: {
    height: 18,
    width: 18,
    borderRadius: 9,
    marginRight: 5
  },
  descriptionTitle: {
    fontFamily: "roboto",
    fontSize: 24,
    color: "black",
    fontWeight:'bold'
  },
  description: {
    fontFamily: "roboto",
    color: "black",
    fontSize: 14
  },
  dimensionTitle: {
    fontFamily: "roboto",
    fontSize: 24,
    color: "black",
    fontWeight:'bold'
  },
  dimension: {
    fontFamily: "roboto",
    color: "black",
    fontSize: 14
  },
  serviceRecordTitle: {
    fontFamily: "roboto",
    fontSize: 24,
    color: "black",
    fontWeight:'bold'
  },
  dimension: {
    fontFamily: "roboto",
    color: "black",
    fontSize: 14
  },
  button: {
    bottom: 10,
    right: 10,
    height: 60,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 30,
    position:'absolute',
  },
  ARIcon: {
    width: 36,
    height: 36
  },
  containerAR: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imagePreview: {
    width: 70,
    height: 70,
  },
  bottomView: {
    position:'absolute',
    bottom: 50,
    borderRadius: 20,
    backgroundColor:'rgba(255, 255, 255, 0.5)',
    paddingVertical: 15,
    alignSelf:'center',
    width:'100%',
  },
  buttonOption: {
    margin: 10,
  },
  gestureView: {
    position:'absolute', 
    top: 0,
    left: 0,
    right: 0,
    bottom: 150,
    justifyContent: "center",
    alignItems: "center"
  },
  gestureImage: {
    width: 200,
    height: 200,
  }
});

export default App;

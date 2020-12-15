import React, { Component } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Image, Dimensions,ActivityIndicator } from 'react-native'

export class Depan extends Component {
    state = {
        dataGambar:'',
        dataGambarWidth:0,
        dataGambarHeight:0,
        showLoader:false
    }
    showLoader = () => { this.setState({showLoader:true})}
    hideLoader = () => { this.setState({showLoader:false})}

    klikAmbilGambar = async () => {
        this.showLoader();
        const url = 'https://api.thecatapi.com/v1/images/search';
        let data = '';

        await fetch(url)
        .then((response)=>response.json())
        .then((json) => {
            data = json
        });

        let gambar = data[0]['url'];
        let lebarGambar = data[0]['width'];
        let tinggiGambar = data[0]['height'];

        let lebarLayar = Dimensions.get('window').width;
        lebarLayar = lebarLayar - 40;
        lebarLayar = Math.round(lebarLayar);

        let tinggiLayar = (tinggiGambar/lebarGambar) * lebarLayar;
        tinggiLayar = Math.round(tinggiLayar);


        this.setState({dataGambar:gambar});
        this.setState({dataGambarWidth:lebarLayar});
        this.setState({dataGambarHeight:tinggiLayar});
        
        this.hideLoader();
    }
    displayGambar = () => {
        if(this.state.dataGambar){
            return(
                <View style = {styles.viewGambar}>
                    <Image 
                        source ={{uri:this.state.dataGambar}} 
                        style = {{width:this.state.dataGambarWidth,height:this.state.dataGambarHeight,borderRadius:10}}                       
                    />
                </View>
            )
        }
    }
    render() {
        return (
            <View style = {styles.viewWrapper}>
                { this.displayGambar() }
                <View style = {styles.viewTombol}>
                    <TouchableOpacity onPress={this.klikAmbilGambar} style = {styles.tombolAmbil}>
                        <Text style = {styles.textAmbil}>Tampilkan Gambar Kucing!</Text>
                    </TouchableOpacity>
                </View>

                <View style = {{position:'absolute',top:'50%',right:0,left:0}}>
                    <ActivityIndicator animating={this.state.showLoader} size="large" color="red"></ActivityIndicator>
                </View>
            </View>
        )
    }
}

export default Depan

const styles = StyleSheet.create ({
    viewWrapper: {
        flex:1,
        backgroundColor:'#FFF',
        padding:20
    },
    viewGambar:{
        flex:4,
    },
    viewTombol: {
        flex:1,
        textAlign:'center',
        justifyContent:'center',
    }, 
    tombolAmbil:{
        backgroundColor:'#009688', 
        borderRadius:10,
        paddingVertical:20,
        paddingHorizontal:20, 
        elevation:8
    }, 
    textAmbil:{
        color:'#FFF',
        fontWeight:'bold',
        fontSize:18,
        textTransform:'uppercase', 
        alignSelf:'center'
    }
})


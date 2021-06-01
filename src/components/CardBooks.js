/**
 * @format
 * @flow
 */
import React, {PureComponent} from 'react';
import {
  Animated,
  Easing,
  TouchableOpacity,
  View,Image,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {colors, metrics} from '../utils/themes';
import {Title, Text, Caption} from './Typos';
import BookCover from './BookCover';
import Category from './Category';
import StarRating from './StarRating';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { API_URL } from '../config';
class CardBooks extends PureComponent {
  constructor(props) {
    super(props);
	
	 
	this.lastPress = 0
    this._visibility = new Animated.Value(0);
	let favoriteTopicsData = [];
		favoriteTopicsData.push(
			this.props.topicNames						
                )
		this.state = {
			 liked: true,
	  userid:'',
			favoriteTopicsData: favoriteTopicsData
		};
		  this.setState({ liked:true });
	 
  }
   handleLargeAnimatedIconRef = (ref) => {
	   
    this.largeAnimatedIcon = ref
  }

  handleSmallAnimatedIconRef = (ref) => {
	  const { liked } = this.state
	 console.log("likedddd");console.log(this.state.liked); 
	
    this.smallAnimatedIcon = ref
  }
animateIcon = () => {
    const { liked } = this.state
	
    this.largeAnimatedIcon.stopAnimation()

    if (liked) {
      this.largeAnimatedIcon.bounceIn()
        .then(() => this.largeAnimatedIcon.bounceOut())
      this.smallAnimatedIcon.pulse(200)
    } else {
      this.largeAnimatedIcon.bounceIn()
        .then(() => {
          this.largeAnimatedIcon.bounceOut()
          this.smallAnimatedIcon.bounceIn()
        })
        .then(() => {
          if (!liked) {
            this.setState(prevState => ({ liked: !prevState.liked }))
          }
        })
    }
	

}
handleOnPress = () => {
    const time = new Date().getTime()
    const delta = time - this.lastPress
    const doublePressDelay = 400

    if (delta < doublePressDelay) {
      this.animateIcon()
    }
    this.lastPress = time
  }

  handleOnPressLike = (id,name) => {
	  //likedata
	  
	  //alert(id);
	   AsyncStorage.getItem('email')
            .then((email) => { 
  
			//this.state.likedata=email;
				 const userf = {
      userid:email,
     audionbookid:name,
      
      }; 
 axios.post(API_URL + "addlike", userf, {
    }).then(res => {
        
      
         
         console.log(res);
        })
       
    
    .catch(error => console.log(error));
		  });
		  console.log("prevstate");	
	
    this.smallAnimatedIcon.bounceIn()
    this.setState(prevState => ({ liked: !prevState.liked }))


  

	
	
	
	
  }
    handleOnPressLikes = (id,topicName) => {
	  //likedata
	  //state = favouriteTopics;

	   AsyncStorage.getItem('email')
            .then((email) => { 
  
			//this.state.likedata=likedata;
			
			 const userf = {
      userid:email,
     audionbookid:topicName,
      
      }; 
 axios.post(API_URL + "removelike", userf, {
    }).then(res => {
        
      
        console.log("remove like") 
         console.log(res);
        })
       
    
    .catch(error => console.log(error));
			

		  });
		  console.log("prevstate");	
	
    this.smallAnimatedIcon.bounceIn()
    this.setState(prevState => ({ liked: !prevState.liked }))

	
	
	
	
	
  }
  componentDidMount() {
    const {index} = this.props;
	 const { liked } = this.state;
	  console.log("likedd");console.log(this.state.liked); 
    Animated.timing(this._visibility, {
      toValue: 1,
      duration: index * 500,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
	let favoriteTopicsData = [];
		favoriteTopicsData.push(
					this.props.topicNames
					)
		this.setState({favoriteTopicsData});
  }

  render() {
	  const { liked } = this.state;
	  
    const {item, onPress} = this.props;
    console.log(item.rating);
	const AnimatedIcon = Animatable.createAnimatableComponent(Icon);
//liked=true;
console.log("liked");console.log(this.state.liked);
    return (
   
      <View style={{backgroundColor:'#fff',marginTop:10,marginBottom:5,marginRight:10,marginLeft:10,borderColor:'#f4f5f9',borderRadius:5}}>
	        <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'flex-start',height:140}}>
			  <View style={{fontWeight:'bold',width:'30%'}}  >
				 <TouchableOpacity
				style={styles.container,{marginLeft:0}}
				onPress={onPress}
				underlayColor={colors.transparent}>
				  <Animated.View
					  style={{
						opacity: this._visibility,
						transform: [
						  {
							translateY: this._visibility.interpolate({
							  inputRange: [0, 1],
							  outputRange: [-100, 1],
							}),
						  },
						],
					  }}>
					  
				       <Image source={{uri:item.image}} style={{width:100,height:'100%'}} />
		      
				  
					</Animated.View>
				  
				  </TouchableOpacity>
				</View>  
				<View style={{position: 'absolute', right: 0,height:160,marginBottom:0, padding:0,fontWeight:'bold',width:'70%'}}>
				
				
						 <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'flex-start'}}>
						   <TouchableOpacity
							style={styles.container}
							onPress={onPress}
							underlayColor={colors.transparent}>
							<Title numberOfLines={2} style={{fontSize:16,marginTop:0,fontWeight:"Normal"}}>{item.name}
						
							</Title>
              <Title
                    numberOfLines={3}
                    style={{fontSize: 14, marginTop: 0, fontWeight: 'Normal', color: 'gray'}}>
                    {item.description}
                  </Title>
							</TouchableOpacity>
							<View style={{marginTop:10,marginRight:10}}>
							<AnimatedIcon
							  ref={this.handleSmallAnimatedIconRef}
							onPress={(event) => liked?this.handleOnPressLikes(event,item._id):this.handleOnPressLike(event,item._id)}
							 // onPress={this.handleOnPressLike}
							  name={liked ? 'heart' : 'heart'}
							  color={liked ? 'red' : '#d4d5d7'}
							  size={15}
							 
							/>
							</View>
						</View>
						 <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'flex-start',paddingTop:20,paddingBottom:10}}>
						   <TouchableOpacity
							style={styles.container}
							onPress={onPress}
							underlayColor={colors.transparent}>
							<StarRating rating={item.rating}   />
							</TouchableOpacity>
							
							<View style={{marginTop:43,marginRight:10}}>
							{item.type=="Paid" ? 
							  <Image source={require('./resources/lock.png')}  onPress={this.handleOnPressLike} style={{width:15,height:19}} />
		                      :
						null}
							</View>
						</View>
						 
											
				
				</View>	 
			
	   </View>
	</View>
      		
	
			 
		
    );
  }
}

CardBooks.propTypes = {
  item: PropTypes.shape({
   // authors: PropTypes.array.isRequired,
    //categories: PropTypes.array.isRequired,
    //readers: PropTypes.array.isRequired,
    image: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardBooks;


const styles = StyleSheet.create({
  container: {
    margin: metrics.padding-5,
  },
  animatedIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderRadius: 160,
    opacity: 0
  },
   icon: {
   position:'absolute',
   paddingLeft:15,
  },
  cardHeader: {
    marginLeft: metrics.coverWidth + metrics.lessPadding,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: metrics.radius,
    padding: metrics.lessPadding,
    minHeight: metrics.coverHeight ,
    marginLeft: metrics.coverWidth  ,
   paddingLeft: (metrics.coverWidth * 2) / 4 + metrics.padding,
   flexDirection: 'row',
     justifyContent: 'space-between',
    // ...colors.shadow
  },
  line: {
    height: 2,
    width: metrics.extraPadding,
    backgroundColor: colors.textSecondary,
    marginBottom: metrics.padding / 2,
  },
});

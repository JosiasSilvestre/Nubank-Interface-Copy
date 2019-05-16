import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Importing the API from React Native animations
import { Animated } from 'react-native';

// Importing the Pan Gesture Handler to capture the drag movement
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import Header from '~/components/Header';
import Tabs from '~/components/Tabs';
import Menu from '~/components/Menu';

import { Container, Content, Card, CardHeader, CardContent, CardFooter, Title, Description, Annotation } from './styles';

export default function Main() {
  
  // Saving the value of how many pixels the user dragged down or up
  let offset = 0;
  const translateY = new Animated.Value(0);

  // Capturing the position of the white card and passing to the variable translateY
  const animatedEvent = Animated.event (
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true },
  );

  function onHandlerStateChanged(event) {
    if (event.nativeEvent.oldState == State.ACTIVE) {
      let opened = false;
      const { translationY } = event.nativeEvent;

      offset += translationY;

      // When the pixel value the user dragged is >= 100, the white card will drop completely
      if (translationY >= 100) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }
 
      // If the variable opened is true, that is, the user wants to open the menu. Then the white card moves down, if not, it returns to its starting point
      Animated.timing(translateY, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true,

      // Checking whether the starting position is 380: with the menu open or 0: with the menu closed
      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }

  return (
    <Container>
      <Header />

      <Content>
        <Menu translateY={translateY} />

        <PanGestureHandler 
          onGestureEvent={animatedEvent} 
          onHandlerStateChange={onHandlerStateChanged}
        >

          {/* Limiting movement of the white card */}
          <Card style={{
           transform:[{
             translateY: translateY.interpolate({
               inputRange: [-350, 0, 380],
               outputRange: [-50, 0, 380],
               extrapolate: 'clamp',
             }),
           }],
          }}>

           {/* Creating the white card */}
           <CardHeader>
              <Icon name='attach-money' size={28} color='#666' />
              <Icon name='visibility-off' size={28} color='#666' />
            </CardHeader>
            <CardContent>
              <Title>Balance available</Title>
              <Description>US$ 97.611,65</Description>
            </CardContent>
            <CardFooter>
              <Annotation>
                Transfer of US$ 20.00 received from Josias Silvestre Maia Feitosa today at 06:00 hours
              </Annotation>
            </CardFooter>
          </Card>
        </PanGestureHandler>

      </Content>
      
      <Tabs translateY={translateY} />
    </Container>
  );
}
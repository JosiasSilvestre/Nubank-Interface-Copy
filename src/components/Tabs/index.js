import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, TabsContainer, TabItem, TabText } from './styles';

export default function Tabs({ translateY }) {
    return(
        
        // Decreasing the opacity and position of the menu tabs as the white card comes down
        <Container style={{
            transform: [{
                translateY: translateY.interpolate({
                    inputRange: [0, 380],
                    outputRange: [0, 30],
                    extrapolate: 'clamp',
                }),
            }],
            opacity: translateY.interpolate({
                inputRange: [0,380],
                outputRange: [1, 0.3],
                extrapolate: 'clamp',
            }),
        }}>

            {/* Creating menu tabs */}
            <TabsContainer>
                <TabItem>
                    <Icon name='person-add' size={24} color='#FFF' />
                    <TabText>Indicate friends</TabText>
                </TabItem>
                <TabItem>
                    <Icon name='chat-bubble-outline' size={24} color='#FFF' />
                    <TabText>To charge</TabText>
                </TabItem>
                <TabItem>
                    <Icon name='arrow-downward' size={24} color='#FFF' />
                    <TabText>Deposit</TabText>
                </TabItem>
                <TabItem>
                    <Icon name='arrow-upward' size={24} color='#FFF' />
                    <TabText>Transfer</TabText>
                </TabItem>
                <TabItem>
                    <Icon name='lock' size={24} color='#FFF' />
                    <TabText>Block card</TabText>
                </TabItem>
            </TabsContainer>
        </Container>
    );
}
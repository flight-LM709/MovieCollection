import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export const ButtonComponents = (props) => {
  return (
    <View style={myStyle.mainButtonContainer}>
      <View style={myStyle.buttonContainer}>
        <TouchableOpacity {...props}>
            <Text>SEE DETAILS</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const myStyle = StyleSheet.create({
    mainButtonContainer: {
        alignItems: 'baseline',
    },
    buttonContainer: {
        marginTop: 8,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#cce6cc',
    }
})

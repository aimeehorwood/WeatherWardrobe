import React from 'react';
import { View, Button } from 'react-native';

export default function SignInScreen({ navigation }) {
  return (
    <View>
      <Button
        title="Sign In"
        onPress={() => navigation.replace('Weather')}
      />
    </View>
  );
}

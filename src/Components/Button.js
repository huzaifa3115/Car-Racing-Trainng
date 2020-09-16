import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface Props {
  label: string;
  onPress: () => void;
  btnStyle: {};
  labelStyle: {};
}

class Button extends React.Component<Props> {
  render() {
    const {label, onPress, labelStyle, btnStyle} = this.props;
    return (
      <TouchableOpacity style={[styles.container, btnStyle]} onPress={onPress}>
        <Text style={[styles.text, labelStyle]}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#428AF8',
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Button;

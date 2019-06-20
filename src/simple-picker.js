import React, { Component } from 'react';
import {
  Picker, View, Modal, TouchableOpacity, FlatList, Platform, Dimensions, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import TextField from '@miidx/rn-text-field';
import ButtonText from '@miidx/rn-text-button';

const ios = Platform.OS === 'ios';


const getScreenDimension = () => {
  const statusBarHeight = getStatusBarHeight();
  const { height, width } = Dimensions.get('window');
  return { height: height - statusBarHeight, width };
};
const { width, height } = getScreenDimension();

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: ios ? 'flex-end' : 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalInnerContainer: {
    alignItems: 'center',
    backgroundColor: ios ? 'rgba(255, 255, 255, 0.9)' : '#fff',
    width: ios ? width : width - 30,
    borderRadius: ios ? 0 : 10,
    paddingTop: ios ? 0 : 20,
    paddingHorizontal: ios ? 0 : 10,
  },
  headerSectionIos: {
    height: 50,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(230, 230, 230, 1)',
  },
  bodySectionIos: {
    alignSelf: 'stretch',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  pickerItemAndroid: {
    borderBottomWidth: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  flatListAndroid: {
    height: height * 30 / 100,
    alignSelf: 'stretch',
  },
  footerAndroid: {
    marginVertical: 20,
    alignItems: 'center',
  },
};


export default class SimplePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedValue: props.selectedValue,
    };
  }

    onTextFieldPressed = () => {
      if (!this.props.disabled) {
        this.setState({ showModal: true });
      }
    }

    onValueSelect = (item) => {
      const selectedItem = item || this.props.data[0];

      this.props.onValueSelected(selectedItem);

      this.setState({
        showModal: false,
      });
    }

    onPickerValueChanged = (value) => {
      const { data } = this.props;
      const realValue = data.find(x => (x.label || x.value ? x.value === value : x === value));
      this.props.onValueSelected(realValue);
      this.setState({ selectedValue: realValue });
    }

    onCancelPicker = () => {
      this.setState({ showModal: false });
    }

    renderPicker = () => {
      const { selectedValue } = this.props;

      const displayedSelectedValue = selectedValue.label || selectedValue.value
        ? selectedValue.value
        : selectedValue;

      return (
        <Picker
          mode="dropdown"
          selectedValue={displayedSelectedValue}
          onValueChange={this.onPickerValueChanged}
        >
          {
            this.props.data.map((item) => {
              const label = item.label || item;
              const value = item.value || item;
              return (
                <Picker.Item label={label} value={value} key={value} />
              );
            })
          }
        </Picker>
      );
    };

    renderTextField = () => {
      const { selectedValue } = this.props;

      const displayedSelectedValue = selectedValue.label || selectedValue.value
        ? selectedValue.label
        : selectedValue;

      if (this.props.disabled) {
        return (
          <TextField
            label={this.props.label}
            error={this.props.error}
            value={displayedSelectedValue}
            disabled
            baseColor={this.props.disabledColor}
            suffixIconName={ios ? 'chevron-down' : 'menu-down'}
          />
        );
      }
      return (
        <TouchableOpacity onPress={this.onTextFieldPressed}>
          <TextField
            label={this.props.label}
            error={this.props.error}
            value={displayedSelectedValue}
            disabled
            baseColor={this.props.enabledColor}
            suffixIconName={ios ? 'chevron-down' : 'menu-down'}
          />
        </TouchableOpacity>
      );
    };

    renderIosPicker = () => (
      <View>
        {this.renderTextField()}
        <Modal
          animationType={this.props.animationType}
          transparent
          visible={this.state.showModal}
          onRequestClose={() => {}}
        >
          <View style={[styles.modalContainer]}>
            <View style={[styles.modalInnerContainer]}>
              <View style={styles.headerSectionIos}>
                <ButtonText
                  caption={this.props.cancelCaption}
                  onPress={this.onCancelPicker}
                />
                <ButtonText
                  caption={this.props.okCaption}
                  onPress={() => this.onValueSelect(this.state.selectedValue)}
                />
              </View>
              <View style={styles.bodySectionIos}>
                {this.renderPicker()}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );

    onPickerItemAndroidPressed = (item) => {
      this.setState({ selectedValue: item });
      this.onValueSelect(item);
    }

    renderPickerItemAndroid = ({ item }) => (
      <TouchableOpacity
        style={[styles.pickerItemAndroid, { borderColor: this.props.separatorColor }]}
        onPress={() => this.onPickerItemAndroidPressed(item)}
      >
        <Text style={this.props.itemTextStyle}>
          {item.label || item.value ? item.label : item}
        </Text>
      </TouchableOpacity>
    );

    renderAndroidPicker = () => {
      const { data, cancelCaption } = this.props;
      const flatListHeight = data && data.length > 3 ? {} : { height: undefined };
      return (
        <View>
          {this.renderTextField()}
          <Modal
            animationType={this.props.animationType}
            transparent
            visible={this.state.showModal}
            onRequestClose={() => {}}
          >
            <View style={[styles.modalContainer]}>
              <View style={[styles.modalInnerContainer]}>
                <FlatList
                  data={this.props.data}
                  renderItem={this.renderPickerItemAndroid}
                  keyExtractor={item => item.value || item}
                  style={[styles.flatListAndroid, flatListHeight]}
                />
                <View style={styles.footerAndroid}>
                  <ButtonText
                    caption={cancelCaption}
                    onPress={this.onCancelPicker}
                    bold
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      );
    }

    render() {
      return ios
        ? this.renderIosPicker()
        : this.renderAndroidPicker();
    }
}

const pickerItemShape = PropTypes.shape({
  value: PropTypes.string,
  label: PropTypes.string,
});

const arrayShape = PropTypes.arrayOf(pickerItemShape);

SimplePicker.propTypes = {
  animationType: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  separatorColor: PropTypes.string,
  enabledColor: PropTypes.string,
  disabledColor: PropTypes.string,
  cancelCaption: PropTypes.string,
  okCaption: PropTypes.string,
  disabled: PropTypes.bool,
  itemTextStyle: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  selectedValue: PropTypes.oneOfType([
    pickerItemShape,
    PropTypes.string,
  ]),
  onValueSelected: PropTypes.func,
  data: PropTypes.oneOfType([
    arrayShape,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

SimplePicker.defaultProps = {
  animationType: 'fade',
  cancelCaption: 'Cancel',
  okCaption: 'OK',
  label: '',
  error: '',
  separatorColor: '#EEEEEE',
  enabledColor: '#000000',
  disabledColor: '#8C8C8C',
  disabled: false,
  selectedValue: undefined,
  itemTextStyle: { fontSize: 14 },
  onValueSelected: () => {},
};

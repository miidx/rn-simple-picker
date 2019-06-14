# rn-simple-picker


## Usage  

```jsx
    <SimplePicker  
        animationType="fade"
        label="City"
        selectedValue={this.state.pickerValue}
        onValueSelected={(pickerValue) => this.setState({ pickerValue }) }
        itemTextStyle={{fontSize: 14}}
        data={['Jakarta', 'Surabaya', 'Semarang']}
    />

    <SimplePicker  
        animationType="fade"
        label="City"
        selectedValue={this.state.pickerValue}
        onValueSelected={(pickerValue) => this.setState({ pickerValue }) }
        itemTextStyle={{fontSize: 14}}
        data={[ 
            { value: 'jkt', label: 'Jakarta' },
            { value: 'sby', label: 'Surabaya' },
            { value: 'smg', label: 'Semarang' },
        ]}
    />
```

## Properties

 Name             | Description                                 | Type      | Required | Default Value  
:---------------- |:------------------------------------------- |:----------|:--------:|:-------------
 animationType    | Animation type when opening drop down. `fade` or `sliede`   | String    |          | fade     
 label            | Picker label                                | String    |          |          
 error            | Error message to be shown                   | String    |          |          
 separatorColor   | Color for line separator between items      | String    |          | #EEEEEE
 enabledColor     | Color for the control when in enabled mode  | String    |          | #2f2f2f         
 disabledColor    | Color for the control when in disabled mode | String    |          | #8C8C8C         
 cancelCaption    | Caption for `cancel` button                 | String    |          | Cancel         
 okCaption        | Caption for `OK` button                     | String    |          | OK         
 disabled         | Set the control to disabled mode            | boolean   |          | false         
 itemTextStyle    | Style for drop down item text               | object    |          | {}         
 selectedValue    | Set or get selected value                   | string or object    |          |          
 onValueSelected  | Callback when user select a value           | function  |          |          
 data             | items to be selected. Can be array of string or array of object with `label` and `value` fields | array |           | []
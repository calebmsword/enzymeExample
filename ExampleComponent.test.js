import { mount } from 'enzyme';

import { TextInput, Text } from 'react-native'; 
import ExampleComponent from './ExampleComponent';

let wrapper;
let ID_input, name_input, button;

const mockAddNewClient = jest.fn();

describe('Can\'t change state in mounted functional component after invoking onTextChange', () => {
    
    beforeEach( () => {
        wrapper = mount(<ExampleComponent addNewClient={mockAddNewClient}/>)
        ID_input = wrapper
            .find(TextInput)
            .findWhere( node => 
                node.prop('placeholder').toLowerCase().includes('id') // !! placeholder value is implementation detail
            )
            .last();
        name_input = wrapper
            .find(TextInput)
            .findWhere( node => 
                node.prop('placeholder').toLowerCase().includes('name') // !! placeholder value is implementation detail
            )
            .last();
        button = wrapper
            .find(Text)
            .findWhere( node => 
                   node.text().toLowerCase().includes('add')
                && node.text().toLowerCase().includes('client')
                && ( typeof node.prop('onPress') !== 'undefined' )
            )
            .last();
        // the above doesn't work with shallow, try below if you want to shallow
        // button = wrapper
        //     .findWhere(node => 
        //         typeof node.prop('onPress') !== 'undefined'
        //     ); 
    })

    const id = 'id';
    const name = 'name';
    it('inputing text in boxes and pressing button should have desired side effects', async () => {
        await ID_input.invoke('onChangeText')(id);
        // await ID_input.prop('onChangeText')(id);
        // await ID_input.simulate('change', {nativeEvent: {text: id}})
        // await ID_input.invoke('onChange')( {nativeEvent: {text: id}} );
        // ID_input.simulate('changeText', {target: {value: id}})
        // ID_input.simulate('changeText', id)

        // wrapper.update(); // redundant, see invoke() in Enzyme Docs
        // https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/invoke.html

        await name_input.invoke('onChangeText')(name);
        // await name_input.prop('onChangeText')(name);
        // await name_input.invoke('onChange')( {nativeEvent: {text: name}} );
        // name_input.simulate('change', {nativeEvent: {text: name}})
        // name_input.simulate('changeText', {target: {value: name}})
        // name_input.simulate('changeText', name)

        // wrapper.update(); // redundant, see invoke() in Enzyme Docs

        await button.invoke('onPress')();
        // button.simulate('press');
        // wrapper.update();
        expect(mockAddNewClient).toHaveBeenCalledWith(id, name);
        // expect(mockAddNewClient).toHaveBeenCalled();
    })
})
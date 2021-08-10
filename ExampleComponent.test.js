import { mount } from 'enzyme';

import { TextInput, Text } from 'react-native'; 
import ExampleComponent from './ExampleComponent';

let wrapper;
let id_input, name_input, button;

const mockAddNewClient = jest.fn();

describe('Can\'t change state in mounted functional component after invoking onTextChange', () => {
    
    beforeEach( () => {
        wrapper = mount(<ExampleComponent addNewClient={mockAddNewClient}/>)
        id_input = wrapper
            .find(TextInput)
            .findWhere( node => 
                node.prop('placeholder').toLowerCase().includes('id')
            )
            .last();
        name_input = wrapper
            .find(TextInput)
            .findWhere( node => 
                node.prop('placeholder').toLowerCase().includes('name')
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
    it('inputing text in boxes and pressing button should have desired side effects', () => {
        id_input.invoke('onChangeText')(id);
        name_input.invoke('onChangeText')(name);

        button = wrapper
            .find(Text)
            .findWhere( node => 
                   node.text().toLowerCase().includes('add')
                && node.text().toLowerCase().includes('client')
                && ( typeof node.prop('onPress') !== 'undefined' )
            )
            .last();
        
        button.invoke('onPress')();
        expect(mockAddNewClient).toHaveBeenCalledWith(id, name);    
    })
})
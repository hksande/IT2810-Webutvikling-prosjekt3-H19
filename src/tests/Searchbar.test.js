import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tabs from '/Tabs';
import { equal } from 'assert';
import { createShallow } from '@material-ui/core/test-utils';
import { IconButton } from '@material-ui/core';

Enzyme.configure({ adapter: new Adapter() })

describe('Searchbar', ()=>{
    let shallow
    before(() => {
        shallow = createShallow()
    })

    it('should change tabpanel', ()=>{
        const wrapper = shallow(<Searchbar {...props}/>)
        const button = wrapper.find(IconButton)
        button.simulate('click')
        expect()
        
    })
})
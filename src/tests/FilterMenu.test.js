import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tabs from '/Tabs';
import FilterMenu from '../components/FilterMenu';
import { createShallow } from '@material-ui/core/test-utils';
import { props } from 'cypress/types/bluebird';

Enzyme.configure({ adapter: new Adapter() })

describe('FilterMenu', ()=>{
    let shallow
    before(() => {
        shallow = createShallow()
    })
    it('should change tabpanel', ()=>{
        const wrapper = shallow(<FilterMenu {...props}/>)
        const open = wrapper.state().equals(null)
        
    })
})
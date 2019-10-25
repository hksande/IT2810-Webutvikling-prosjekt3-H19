import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tabs from '/Tabs';
import { createShallow } from '@material-ui/core/test-utils';
import { props } from 'cypress/types/bluebird';

Enzyme.configure({ adapter: new Adapter() })

describe('Tabs', ()=>{
    let shallow
    before(() => {
        shallow = createShallow()
    })
    it('should change tabpanel', ()=>{
        const wrapper = shallow(<Tabs {...props}/>)
        const index = wrapper.find(TabPanel)
        const button = wrapper.find('Tab').dive().find('tab2')
        button.simulate('click')
        expect(index).equals(1)
    })
})
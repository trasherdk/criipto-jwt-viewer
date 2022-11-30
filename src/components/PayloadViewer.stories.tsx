import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import * as samples from '../samples';
import PayloadViewer from './PayloadViewer';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/PayloadViewer',
  component: PayloadViewer,
} as ComponentMeta<typeof PayloadViewer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PayloadViewer> = (args) => <div style={{paddingLeft: '250px'}}><PayloadViewer {...args} /></div>;

export const MITID_CITIZEN = Template.bind({});
MITID_CITIZEN.storyName = 'MitID / Citizen';
MITID_CITIZEN.args = {
  payload: samples.MITID_CITIZEN.payload
};

export const MITID_CITIZEN_ADDRESS = Template.bind({});
MITID_CITIZEN_ADDRESS.storyName = 'MitID / Citizen / With address';
MITID_CITIZEN_ADDRESS.args = {
  payload: samples.MITID_CITIZEN_ADDRESS.payload
};
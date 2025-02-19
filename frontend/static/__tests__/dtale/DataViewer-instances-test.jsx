import { mount } from 'enzyme';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Provider } from 'react-redux';

import DimensionsHelper from '../DimensionsHelper';
import mockPopsicle from '../MockPopsicle';
import reduxUtils from '../redux-test-utils';
import { buildInnerHTML, clickMainMenuButton, tick, tickUpdate } from '../test-utils';

describe('DataViewer tests', () => {
  const dimensions = new DimensionsHelper({
    offsetWidth: 500,
    offsetHeight: 500,
  });

  beforeAll(() => {
    dimensions.beforeAll();

    mockPopsicle();
  });

  afterAll(() => dimensions.afterAll());

  it('DataViewer: instances', async () => {
    const { DataViewer } = require('../../dtale/DataViewer');
    const Instances = require('../../popups/instances/Instances').default;
    const store = reduxUtils.createDtaleStore();
    buildInnerHTML({ settings: '', hideShutdown: 'True', processes: 2 }, store);
    const result = mount(
      <Provider store={store}>
        <DataViewer />
      </Provider>,
      { attachTo: document.getElementById('content') },
    );
    await tick();
    await clickMainMenuButton(result, 'Instances');
    await tickUpdate(result);
    expect(result.find(Instances).length).toBe(1);
    result.find(Modal.Header).first().find('button').simulate('click');
    expect(result.find(Instances).length).toBe(0);
  });
});

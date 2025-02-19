import { mount } from 'enzyme';
import React from 'react';

import DimensionsHelper from '../../DimensionsHelper';
import mockPopsicle from '../../MockPopsicle';
import { clickColMenuSubButton, openColMenu } from '../../iframe/iframe-utils';
import { buildInnerHTML, tickUpdate } from '../../test-utils';

describe('DataPreview', () => {
  const dimensions = new DimensionsHelper({
    offsetWidth: 500,
    offsetHeight: 500,
  });

  beforeAll(() => {
    dimensions.beforeAll();
    mockPopsicle();
  });

  afterAll(() => dimensions.afterAll());

  it('loads properly', async () => {
    const DataPreview = require('../../../popups/merge/DataPreview').default;
    buildInnerHTML({ settings: '' });
    const result = mount(<DataPreview dataId="1" />, {
      attachTo: document.getElementById('content'),
    });
    await tickUpdate(result);
    await openColMenu(result, 3);
    clickColMenuSubButton(result, 'Asc');
    expect(result.find('ReactDataViewer').instance().props.settings.sortInfo).toEqual([['col4', 'ASC']]);
  });
});

import _ from 'lodash';
import * as gu from '../gridUtils';
import * as serverState from '../serverStateManagement';

export async function onKeyDown(e, colCfg, rowIndex, value, origValue, props) {
  if (e.key === 'Enter') {
    const { gridState, propagateState, dataId, settings, maxColumnWidth } = props;
    if (value === origValue) {
      props.clearEdit();
      return;
    }
    const { data, columns, columnFormats } = gridState;
    const editData = await serverState.editCell(dataId, colCfg.name, rowIndex - 1, value);
    if (editData.error) {
      props.openChart({ ...editData, type: 'error' });
      return;
    }
    const updatedData = _.cloneDeep(data);
    updatedData[rowIndex - 1][colCfg.name] = gu.buildDataProps(colCfg, value, {
      columnFormats,
      settings,
    });
    const width = gu.calcColWidth(colCfg, {
      ...gridState,
      ...settings,
      maxColumnWidth,
    });
    const updatedColumns = _.map(columns, (c) => ({
      ...c,
      ...(c.name === colCfg.name ? width : {}),
    }));
    propagateState({ columns: updatedColumns, data: updatedData, triggerResize: true }, props.clearEdit);
  }
}

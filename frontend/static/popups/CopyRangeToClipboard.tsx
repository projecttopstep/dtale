import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataViewerPropagateState } from '../dtale/DataViewerState';
import { AppActions } from '../redux/actions/AppActions';
import { closeChart } from '../redux/actions/charts';
import { AppState, CopyRangeToClipboardPopupData } from '../redux/state/AppState';

require('./Confirmation.css');

/** Component properties for CopyRangeToClipboard */
interface CopyRangeToClipboardProps {
  propagateState: DataViewerPropagateState;
}

export const CopyRangeToClipboard: React.FC<CopyRangeToClipboardProps> = ({ propagateState }) => {
  const chartData = useSelector((state: AppState) => state.chartData) as CopyRangeToClipboardPopupData;
  const dispatch = useDispatch();
  const [includeHeaders, setIncludeHeaders] = React.useState<boolean>(false);
  const [finalText, setFinalText] = React.useState<string>(chartData.text);
  const textArea = React.useRef<HTMLTextAreaElement>(null);

  const outerOnClose = (): AppActions<void> => dispatch(closeChart(chartData));

  React.useEffect(() => {
    const { text, headers } = chartData;
    setFinalText(includeHeaders ? `${headers.join('\t')}\n${text}` : text);
  }, [includeHeaders]);

  const onClose = (): void => {
    propagateState({ rangeSelect: undefined, columnRange: undefined }, outerOnClose);
  };

  const copy = (): void => {
    if (textArea.current) {
      textArea.current.value = finalText;
      textArea.current.select();
      document.execCommand('copy');
      onClose();
    }
  };

  return (
    <React.Fragment>
      <div className="modal-body">
        <div className="form-group row">
          <label className="col-md-4 col-form-label text-right">Include Headers?</label>
          <div className="col-auto mt-auto mb-auto font-weight-bold p-0">
            <i
              className={`ico-check-box${includeHeaders ? '' : '-outline-blank'} pointer`}
              onClick={() => setIncludeHeaders(!includeHeaders)}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-12">
            <pre className="mb-0" style={{ maxHeight: 200 }}>
              {finalText.length > 500 ? `${finalText.substring(0, 500)}...` : finalText}
            </pre>
          </div>
        </div>
      </div>
      <div className="modal-footer confirmation">
        <button className="btn btn-primary" onClick={copy}>
          <span>Yes</span>
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          <span>No</span>
        </button>
      </div>
      <textarea
        ref={textArea}
        style={{ position: 'absolute', left: -1 * window.innerWidth }}
        onChange={() => undefined}
      />
    </React.Fragment>
  );
};

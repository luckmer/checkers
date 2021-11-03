import { XTopPanel, XBottomPanel, YBottomPanel, YTopPanel } from './panels';

const ControlQueen = (props) => {
  const PROPS = { ...props };

  const XCheckTop = XTopPanel({ ...PROPS });
  const YCheckTop = YTopPanel({ ...PROPS });
  const XCheckBottom = XBottomPanel({ ...PROPS });
  const YCheckBottom = YBottomPanel({ ...PROPS });

  return { XCheckTop, YCheckBottom, YCheckTop, XCheckBottom };
};

export default ControlQueen;

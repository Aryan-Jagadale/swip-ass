import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const TooltipHeader = ({ text, tooltipText,style={}  }) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={`tooltip-${text}`}>{tooltipText}</Tooltip>}
    >
      <th style={style}>{text}</th>
    </OverlayTrigger>
  );
};

export default TooltipHeader;

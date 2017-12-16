import React from 'react';
import PropTypes from 'prop-types';

const SpreadsheetCell = (props) => {
    const {
        y,
        className,
        onClick,
        onDoubleClick,
        children,
        width,
        height
    } = props;

    return (
        <div
            key={y}
            className={className}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            style={{
                width: width + '%',
                height: height + 'px'
            }}
        >
            {children}
        </div>
    );
};

SpreadsheetCell.propTypes = {
    y: PropTypes.number.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]).isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number
};

export default SpreadsheetCell;

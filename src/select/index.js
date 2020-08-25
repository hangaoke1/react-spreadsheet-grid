import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from './../dropdown';
import keys from './../kit/keymap';
import find from 'lodash.find';

import styles from './styles.css';

class SpreadsheetGridSelect extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onGlobalKeyDown = this.onGlobalKeyDown.bind(this);
        this.onItemMouseLeave = this.onItemMouseLeave.bind(this);

        this.state = {
            isOpen: this.props.isOpen,
            value: this.props.value
        };
    }

    static getDerivedStateFromProps({ isOpen, value }, prevState) {
        return {
            ...prevState,
            isOpen,
            value
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onGlobalKeyDown, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onGlobalKeyDown, false);
    }

    onItemClick(value, item) {
        this.setState({
            value,
            isOpen: false
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(value, item);
            }
        });
    }

    onItemMouseEnter(selectedIndex) {
        this.setState({
            selectedIndex
        });
    }

    onItemMouseLeave() {
        this.setState({
            selectedIndex: null
        });
    }

    onGlobalKeyDown(e) {
        if (this.state.isOpen) {
            if (e.keyCode === keys.DOWN) {
                e.preventDefault();
                if (this.state.selectedIndex || this.state.selectedIndex === 0) {
                    this.setState({
                        selectedIndex: this.state.selectedIndex + 1
                    });
                } else {
                    this.setState({
                        selectedIndex: 0
                    });
                }

                if (this.state.selectedIndex > this.props.options.length - 1) {
                    this.setState({
                        selectedIndex: 0
                    });
                }
            }
            if (e.keyCode === keys.UP) {
                e.preventDefault();
                if (this.state.selectedIndex || this.state.selectedIndex === 0) {
                    this.setState({
                        selectedIndex: this.state.selectedIndex - 1
                    });
                } else {
                    this.setState({
                        selectedIndex: this.props.options.length - 1
                    });
                }

                if (this.state.selectedIndex < 0) {
                    this.setState({
                        selectedIndex: this.props.options.length - 1
                    });
                }
            }
            if (e.keyCode === keys.ENTER || e.keyCode === keys.TAB) {
                if (this.state.selectedIndex || this.state.selectedIndex === 0) {
                    const selectedItem = this.props.options[this.state.selectedIndex];
                    this.onItemClick(selectedItem.value, selectedItem);
                }
            }

            e.preventDefault();
        }
    }

    getItemClassName(isSelected) {
        return 'SpreadsheetGridSelectItem' +
            (isSelected ? ' SpreadsheetGridSelectItem_selected' : '');
    }

    isHasValue() {
        return (this.state.value !== undefined) && this.props.options;
    }

    getHeaderValue() {
        let value;

        if (this.isHasValue()) {
            value = find(this.props.options, {
                value: this.state.value
            });
            value = value ? value.label : value;
        } else {
            value = this.props.placeholder;
        }

        return value;
    }

    getHeaderClassName() {
        return 'SpreadsheetGridSelectHeader' +
            (this.state.isOpen ? ' SpreadsheetGridSelectHeader_open' : '');
    }

    renderHeader() {
        return (
            <div className={this.getHeaderClassName()}>
                <div className="SpreadsheetGridSelectValue">
                    {this.getHeaderValue()}
                </div>
            </div>
        );
    }

    renderBody() {
        const options = this.props.options;

        return (
            <div>
                {
                    options && options.map((item, i) => {
                        return (
                            <div
                                key={i}
                                className={this.getItemClassName(i === this.state.selectedIndex)}
                                onClick={this.onItemClick.bind(this, item.value, item)}
                                onMouseEnter={this.onItemMouseEnter.bind(this, i)}
                                onMouseLeave={this.onItemMouseLeave}
                            >
                                {item.label}
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    render() {
        return (
            <Dropdown
                header={this.renderHeader()}
                body={this.renderBody()}
                isOpen={this.state.isOpen}
            />
        );
    }
}

const IdPropType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]);

SpreadsheetGridSelect.propTypes = {
    value: IdPropType,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: IdPropType,
            label: PropTypes.string
        })
    ),
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    isOpen: PropTypes.bool
};

SpreadsheetGridSelect.defaultProps = {
    options: [],
    placeholder: '',
    isOpen: false
};

export default SpreadsheetGridSelect;
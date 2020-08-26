import React, { Component } from 'react';
import { Select } from 'antd';
import 'moment/locale/zh-cn';

export default class AntSelect extends Component {
  state = {
    innerValue: undefined
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState.props) {
        return {
            ...prevState,
            props: nextProps,
            innerValue: nextProps.value
        };
    }
    return prevState
  }

  componentDidMount () {
    document.addEventListener('click', this.onGlobalClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onGlobalClick, true);
  }

  onGlobalClick = (e) => {
    e.disableGridAction = true;
  }

  handleChange = (value) => {
    this.setState({
      innerValue: value
    })
  }

  handleBlur = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.innerValue);
    }
  }

  render() {
    const { innerValue } = this.state;
    return (
      <Select
        {...this.props}
        ref={ref => this.selectRef = ref}
        bordered={false}
        value={innerValue}
        onKeyDown={(e) => {
          // 阻止表格回车
          if (e.keyCode === 13) {
            e.nativeEvent.disableGridAction = true;
            e.nativeEvent.preventDefault();
          }
          if (e.keyCode === 9) {
            this.handleBlur();
            e.nativeEvent.preventDefault();
          }
        }}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}

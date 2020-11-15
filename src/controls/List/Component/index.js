/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getFirstIcon } from '../../../utils/toolbar';
import { Dropdown, DropdownOption } from '../../../components/Dropdown';
import Option from '../../../components/Option';
import './styles.css';

export default class LayoutComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onExpandEvent: PropTypes.func,
    config: PropTypes.object,
    onChange: PropTypes.func,
    currentState: PropTypes.object,
    translations: PropTypes.object,
    indentDisabled: PropTypes.bool,
    outdentDisabled: PropTypes.bool,
  };

  options: Array = ['unordered', 'ordered'];

  toggleBlockType: Function = (blockType: String): void => {
    const { onChange } = this.props;
    onChange(blockType);
  };

  render(): Object {
    const {
      config,
      currentState: { listType },
      translations,
    } = this.props;

    const { options, unordered, ordered } = config;
    return (
      <div className={classNames('rdw-list-wrapper')} aria-label="rdw-list-control">
        {options.indexOf('unordered') >= 0 && <Option
          value="unordered"
          onClick={this.toggleBlockType}
          className={classNames(unordered.className)}
          active={listType === 'unordered'}
          title={unordered.title || translations['components.controls.list.unordered']}
        >
          <img
            src={unordered.icon}
            alt=""
          />
        </Option>
        }
        {options.indexOf('ordered') >= 0 && <Option
          value="ordered"
          onClick={this.toggleBlockType}
          className={classNames(ordered.className)}
          active={listType === 'ordered'}
          title={ordered.title || translations['components.controls.list.ordered']}
        >
          <img
            src={ordered.icon}
            alt=""
          />
        </Option>}
      </div>
    );
  }
}

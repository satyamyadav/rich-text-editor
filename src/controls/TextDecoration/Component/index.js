import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Option from '../../../components/Option';
import { Dropdown, DropdownOption } from '../../../components/Dropdown';
import { Icon, Tooltip } from '@innovaccer/design-system';
import './styles.css';

export default class Inline extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onExpandEvent: PropTypes.func,
    config: PropTypes.object,
    onChange: PropTypes.func,
    currentState: PropTypes.object,
  };

  renderInDropdown(): Object {
    const {
      config,
      expanded,
      doExpand,
      onExpandEvent,
      doCollapse,
      currentState,
      onChange,
    } = this.props;

    return (
      <Dropdown
        onChange={onChange}
        expanded={expanded}
        doExpand={doExpand}
        doCollapse={doCollapse}
        onExpandEvent={onExpandEvent}
        menu={true}
      >
        <Icon name="more_horizon" />
        {
          config.options.slice(config.max, config.options.length)
            .map((style, index) => {
              const active = currentState[style] === true || (style === 'MONOSPACE' && currentState.CODE);
              const { icon } = config[style];

              return (
                <DropdownOption
                  key={index}
                  value={style}
                  active={active}
                >
                  <Icon name={icon} appearance={active ? 'info' : 'default'} />
                </DropdownOption>
              );
            })
        }
      </Dropdown>
    );
  }

  render(): Object {
    const { config, currentState, onChange } = this.props;
    const hiddenOptions = config.options.length - config.max;
    const visibleOptions = config.max;

    return (
      <div className={'Editor-textDecoration'}>
        {
          config.options.slice(0, visibleOptions)
            .map((style, index) => {
              const active = currentState[style] === true || (style === 'MONOSPACE' && currentState.CODE);
              const { title, icon } = config[style];

              return (
                <Tooltip tooltip={title}>
                  <Option
                    key={index}
                    value={style}
                    onClick={onChange}
                    active={active}
                  >
                    <Icon name={icon} appearance={active ? 'info' : 'default'} />
                  </Option>
                </Tooltip>
              )
            })
        }
        {hiddenOptions > 0 && this.renderInDropdown()}
      </div>
    );
  }
}

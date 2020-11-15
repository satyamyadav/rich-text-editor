import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { stopPropagation } from '../../../utils/common';
import { getFirstIcon } from '../../../utils/toolbar';
import Option from '../../../components/Option';
import { Dropdown, DropdownOption } from '../../../components/Dropdown';
import './styles.css';
import { Popover, Icon, Text, Input, Button } from '@innovaccer/design-system';

class LayoutComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onExpandEvent: PropTypes.func,
    config: PropTypes.object,
    onChange: PropTypes.func,
    currentState: PropTypes.object,
    translations: PropTypes.object,
  };

  state = {
    showModal: false,
    linkTarget: '',
    linkTitle: '',
    linkTargetOption: this.props.config.defaultTargetOption,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.expanded && !this.props.expanded) {
      this.setState({
        showModal: false,
        linkTarget: '',
        linkTitle: '',
        linkTargetOption: this.props.config.defaultTargetOption,
      });
    }
  }

  removeLink = () => {
    const { onChange } = this.props;
    onChange('unlink');
  };

  addLink = () => {
    const { onChange } = this.props;
    const { linkTitle, linkTarget, linkTargetOption } = this.state;
    onChange('link', linkTitle, linkTarget, linkTargetOption);
  };

  updateValue = event => {
    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  };

  updateTargetOption = event => {
    this.setState({
      linkTargetOption: event.target.checked ? '_blank' : '_self',
    });
  };

  hideModal = () => {
    this.setState({
      showModal: false,
    });
  };

  signalExpandShowModal = () => {
    const {
      onExpandEvent,
      currentState: { link, selectionText },
    } = this.props;
    console.log('hereeeeee');
    const { linkTargetOption } = this.state;
    onExpandEvent();
    this.setState({
      showModal: true,
      linkTarget: (link && link.target) || '',
      linkTargetOption: (link && link.targetOption) || linkTargetOption,
      linkTitle: (link && link.title) || selectionText,
    });
  };

  forceExpandAndShowModal = () => {
    const {
      doExpand,
      currentState: { link, selectionText },
    } = this.props;
    const { linkTargetOption } = this.state;
    doExpand();
    this.setState({
      showModal: true,
      linkTarget: link && link.target,
      linkTargetOption: (link && link.targetOption) || linkTargetOption,
      linkTitle: (link && link.title) || selectionText,
    });
  };

  renderAddLinkModal() {
    const {
      config: { popupClassName },
      doCollapse,
      translations,
    } = this.props;
    const { linkTitle, linkTarget, linkTargetOption } = this.state;
    return (
      <div
        className="px-6 mt-6 mb-5"
        onClick={stopPropagation}
      >
        <Text weight="strong" size="large">
          Insert a Link
        </Text>
        <Input
          icon="insert_link"
          className="mt-4"
          placeholder="Paste a link to insert"
          onChange={this.updateValue}
          onBlur={this.updateValue}
          name="linkTitle"
          value={linkTitle}
          autoComplete="off"
          onClick={e => e.stopPropagation()}
        />
        <Input
          icon="text_fields"
          className="my-5"
          placeholder="Text to display"
          onChange={this.updateValue}
          onBlur={this.updateValue}
          name="linkTarget"
          value={linkTarget}
          autoComplete="off"
        />
        <div className="d-flex justify-content-end">
          <Button onClick={doCollapse} className="mr-4">Cancel</Button>
          <Button
            onClick={this.addLink}
            disabled={!linkTarget || !linkTitle}
            appearance="primary"
          >
            Save
          </Button>
        </div>
      </div>
    );
  }

  renderInFlatList() {
    const {
      config: { options, link, unlink },
      currentState,
      expanded,
      translations,
    } = this.props;
    const { showModal } = this.state;

    const trigger = (
      <Option
        value="unordered-list-item"
        className={classNames(link.className)}
        onClick={this.signalExpandShowModal}
        aria-haspopup="true"
        aria-expanded={showModal}
        title={link.title || translations['components.controls.link.link']}
      >
        <Icon name={link.icon} />
      </Option>
    );

    return (
      <div>
        <Popover
          trigger={trigger}
          position="bottom-start"
          //open={showModal}
          //onToggle={this.signalExpandShowModal}
        >
          {this.renderAddLinkModal()}
        </Popover>
      </div>
    );
  }

  renderInDropDown() {
    const {
      expanded,
      onExpandEvent,
      doCollapse,
      doExpand,
      onChange,
      config,
      currentState,
      translations,
    } = this.props;
    const {
      options,
      link,
      unlink,
      className,
      dropdownClassName,
      title,
    } = config;
    const { showModal } = this.state;
    return (
      <div
        className="rdw-link-wrapper"
        aria-haspopup="true"
        aria-label="rdw-link-control"
        aria-expanded={expanded}
        title={title}
      >
        <Dropdown
          className={classNames('rdw-link-dropdown', className)}
          optionWrapperClassName={classNames(dropdownClassName)}
          onChange={onChange}
          expanded={expanded && !showModal}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
        >
          <img src={getFirstIcon(config)} alt="" />
          {options.indexOf('link') >= 0 && (
            <DropdownOption
              onClick={this.forceExpandAndShowModal}
              className={classNames('rdw-link-dropdownoption', link.className)}
              title={
                link.title || translations['components.controls.link.link']
              }
            >
              <img src={link.icon} alt="" />
            </DropdownOption>
          )}
          {options.indexOf('unlink') >= 0 && (
            <DropdownOption
              onClick={this.removeLink}
              disabled={!currentState.link}
              className={classNames(
                'rdw-link-dropdownoption',
                unlink.className
              )}
              title={
                unlink.title || translations['components.controls.link.unlink']
              }
            >
              <img src={unlink.icon} alt="" />
            </DropdownOption>
          )}
        </Dropdown>
        {expanded && showModal ? this.renderAddLinkModal() : undefined}
      </div>
    );
  }

  render() {
    const {
      config: { inDropdown },
    } = this.props;
    if (inDropdown) {
      return this.renderInDropDown();
    }
    return this.renderInFlatList();
  }
}

export default LayoutComponent;

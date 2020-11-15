
import indent from '../../images/indent.svg';
import outdent from '../../images/outdent.svg';
import ordered from '../../images/list-ordered.svg';
import unordered from '../../images/list-unordered.svg';
import color from '../../images/color.svg';
import link from '../../images/link.svg';
import unlink from '../../images/unlink.svg';
import embedded from '../../images/embedded.svg';
import image from '../../images/image.svg';

export default {
  options: [
    "blockType",
    "inline",
    "colorPicker",
    "list",
    "link",
    "embedded",
    "image",
  ],
  inline: {
    max: 3,
    inDropdown: false,
    options: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
    ],
    bold: { icon: 'format_bold', title: 'Bold (cmd+B)' },
    italic: { icon: 'format_italic', title: 'Italic (cmd+I)' },
    underline: { icon: 'format_underlined', title: 'Underline (cmd+U)' },
    strikethrough: { icon: 'strikethrough_s', title: 'Strikethrough' },
  },
  blockType: {
    icon: 'format_size',
    options: [
      //"Normal",
      "H1",
      "H2",
      "H3",
      "H4",
    ],
    component: undefined,
  },
  list: {
    options: ["unordered", "ordered"],
    unordered: { icon: unordered, title: 'Unordered' },
    ordered: { icon: ordered, title: 'Ordered' },
  },
  colorPicker: {
    icon: color,
    colors: [
      'var(--text)',
      'var(--secondary)',
      'var(--success)',
      'var(--primary)',
      'var(--alert)',
      'var(--accent1)',
    ],
  },
  link: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: "_self",
    options: ["link", "unlink"],
    link: { icon: 'insert_link', className: undefined, title: undefined },
    //unlink: { icon: unlink, className: undefined, title: undefined },
    linkCallback: undefined
  },
  embedded: {
    icon: embedded,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    embedCallback: undefined,
    defaultSize: {
      height: "auto",
      width: "auto"
    },
    title: undefined
  },
  image: {
    icon: image,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    previewImage: false,
    alignmentEnabled: true,
    uploadCallback: undefined,
    inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: "auto",
      width: "auto"
    },
    title: undefined
  },
};

const SAFELIST = [
  'backgroundColor',
  'opacity',
  'overflow',
  'overflowX',
  'overflowY',
  // border
  'borderColor',
  'borderTopColor',
  'borderRightColor',
  'borderBottomColor',
  'borderLeftColor',
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderStyle',
  'borderTopStyle',
  'borderRightStyle',
  'borderBottomStyle',
  'borderLeftStyle',
  // layout
  'borderWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'boxSizing',
  'height',
  'margin',
  'marginBottom',
  'marginHorizontal',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginVertical',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'padding',
  'paddingBottom',
  'paddingHorizontal',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingVertical',
  'width',
  'alignContent',
  'alignItems',
  'alignSelf',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'justifyContent',
  'order',
  'bottom',
  'left',
  'position',
  'right',
  'top',
  //shadow
  'shadowColor',
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',
];

class View {

  constructor() {
    this._type = 'view';
    this._style = {};
    this._children = [];
    this._props = {};
  }

  setStyles(newStyle) {
    const style = {};

    SAFELIST.forEach(key => {
      if (newStyle.hasOwnProperty(key)) {
        style[key] = newStyle[key];
      }
    });

    this._style = style;
  }

  setChildren(children) {
    this._children = children.filter(child => child instanceof View);
  }

  toJSON() {
    return Object.assign({
      type: this._type,
      style: this._style,
      children: this._children.map(child => (typeof child === 'string') ? child : child.toJSON()),
    }, this._props);
  }
}

export default View;

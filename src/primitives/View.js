function toFloat(string) {
  if (string === 'none' || string === 'auto') {
    return null;
  }

  const float = parseFloat(string);

  if (isNaN(float)) {
    console.warn('Invalid value', string);
    return null;
  }

  return float;
}

const STYLE_DEFINITIONS = [
  {name: 'backgroundColor'},
  {name: 'opacity', transforms: [toFloat]},
  {name: 'overflow'},
  {name: 'overflowX'},
  {name: 'overflowY'},
  // border
  {name: 'borderColor'},
  {name: 'borderTopColor'},
  {name: 'borderRightColor'},
  {name: 'borderBottomColor'},
  {name: 'borderLeftColor'},
  {name: 'borderRadius', transforms: []},
  {name: 'borderTopLeftRadius', transforms: []},
  {name: 'borderTopRightRadius', transforms: []},
  {name: 'borderBottomLeftRadius', transforms: []},
  {name: 'borderBottomRightRadius', transforms: []},
  {name: 'borderStyle'},
  {name: 'borderTopStyle'},
  {name: 'borderRightStyle'},
  {name:  'borderBottomStyle'},
  {name: 'borderLeftStyle'},
  // layout
  {name: 'borderWidth', transforms: [toFloat]},
  {name: 'borderBottomWidth', transforms: [toFloat]},
  {name: 'borderLeftWidth', transforms: [toFloat]},
  {name: 'borderRightWidth', transforms: [toFloat]},
  {name: 'borderTopWidth', transforms: [toFloat]},
  {name: 'boxSizing'},
  {name: 'height', transforms: [toFloat]},
  {name: 'margin', transforms: [toFloat]},
  {name: 'marginBottom', transforms: [toFloat]},
  {name: 'marginHorizontal', transforms: [toFloat]},
  {name: 'marginLeft', transforms: [toFloat]},
  {name: 'marginRight', transforms: [toFloat]},
  {name: 'marginTop', transforms: [toFloat]},
  {name: 'marginVertical', transforms: [toFloat]},
  {name: 'maxHeight', transforms: [toFloat]},
  {name: 'maxWidth', transforms: [toFloat]},
  {name: 'minHeight', transforms: [toFloat]},
  {name: 'minWidth', transforms: [toFloat]},
  {name: 'padding', transforms: [toFloat]},
  {name: 'paddingBottom', transforms: [toFloat]},
  {name: 'paddingHorizontal', transforms: [toFloat]},
  {name: 'paddingLeft', transforms: [toFloat]},
  {name: 'paddingRight', transforms: [toFloat]},
  {name: 'paddingTop', transforms: [toFloat]},
  {name: 'paddingVertical', transforms: [toFloat]},
  {name: 'width', transforms: [toFloat]},
  {name: 'alignContent'},
  {name: 'alignItems'},
  {name: 'alignSelf'},
  {name: 'flex'},
  {name: 'flexBasis'},
  {name: 'flexDirection'},
  {name: 'flexGrow'},
  {name: 'flexShrink'},
  {name: 'flexWrap'},
  {name: 'justifyContent'},
  {name: 'order'},
  {name: 'bottom', transforms: [toFloat]},
  {name: 'left', transforms: [toFloat]},
  {name: 'position'},
  {name: 'right', transforms: [toFloat]},
  {name: 'top', transforms: [toFloat]},
  //shadow
  {name: 'shadowColor'},
  {name: 'shadowOffset'},
  {name: 'shadowOpacity'},
  {name: 'shadowRadius'},
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

    STYLE_DEFINITIONS.forEach(styleDefinition => {
      const {name, transforms} = styleDefinition;

      if (!newStyle.hasOwnProperty(name)) {
        return;
      }

      if (transforms) {
        const value = transforms.reduce((value, transform) => transform(value), newStyle[name]);

        if (value === null) {
          return;
        }

        style[name] = value;
      } else {
        style[name] = newStyle[name];
      }
    });

    this._style = style;
  }

  setChildren(children) {
    this._children = children.filter(child => (child instanceof View) || typeof child === 'string');
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

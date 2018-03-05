import View from './View';

export const ResizeMode = {
  CONTAIN: 'contain',
  COVER: 'cover',
  STRETCH: 'stretch',
  CENTER: 'center',
  REPEAT: 'repeat',
  NONE: 'none'
};

class Image extends View {
  constructor() {
    super();

    this._type = 'image';
    this._props = {
      source: null,
      resizeMode: ResizeMode.CONTAIN
    };
  }

  setSource(url) {
    let urlObj;

    try {
      urlObj = new URL(url, location.href);
    } catch(e) {
      throw new Error(`Invalid URL ${url}`);
    }

    this._props.source = urlObj.href;
  }
}

export default Image;

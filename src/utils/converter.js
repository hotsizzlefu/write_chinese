import { Converter } from 'opencc-js';

const converter = Converter({ from: 'cn', to: 'hk' });

export const toTraditional = (text) => {
  return converter(text);
};

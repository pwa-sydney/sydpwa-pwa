import yaml from 'yaml';
import fetch from 'unfetch';

const FRONT_MATTER_REG = /^\s*\-\-\-\n\s*([\s\S]*?)\s*\n\-\-\-\n/i;

const _parser = content => {
  let [, frontMatter] = content.match(FRONT_MATTER_REG) || [];
  let meta = (frontMatter &&
    yaml.eval('---\n' + frontMatter.replace(/^/gm, '  ') + '\n')) || {};
  let body = content.replace(FRONT_MATTER_REG, '');
  return {
    meta,
    body
  };
};

const htmlFetch = contentURL => {
  return new Promise((resolve, reject) => {
    return fetch(contentURL).then(content => content.text()).then(data => {
      let { meta, body } = _parser(data);
      if (Object.keys(meta).length > 0) {
        meta = Object.assign({}, ...meta);
        resolve({ meta, body, loading: false });
      }
      else {
        reject({ error: true, loading: false });
      }
    });
  });
};

export default htmlFetch;

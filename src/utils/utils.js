import { parse, stringify } from 'qs';
import asyncComponent from '../components/AsyncComponent';

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function setStorage(k, v) {
  window.localStorage.setItem(k, v);
}

export function loadStorage(k) {
  return window.localSotrage.getItem(k);
}

export function setSessionStorage(k, v) {
  window.sessionStorage.setItem(k, v);
}

export function loadSessionStorage(k) {
  return window.sessionStorage.getItem(k);
}

//https://www.npmjs.com/package/qs
export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
//A querystring parsing and stringifying library with some added security.
export function getQueryPath(path = '', query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
}


/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function getRoutes(rts) {
  if (!rts) {
    return [];
  }

  const newRouteKeys = rts.map((i) => {
    const AsyncComp = asyncComponent(() => import(`../routes/${i.comp}`));
    const route = { path: i.path, comp: AsyncComp, exact: i.exact };
    return route;
  });

  return newRouteKeys;
}

function accMul(arg1, arg2) {
  let m = 0;
  const s1 = arg1.toString();
  const s2 = arg2.toString();
  m += s1.split('.').length > 1 ? s1.split('.')[1].length : 0;
  m += s2.split('.').length > 1 ? s2.split('.')[1].length : 0;
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / 10 * m;
}

export function digitUppercase(n) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟', '万']];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(accMul(num, 10 * 10 * index)) % 10] + item).replace(/零./, '');
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

  return s
    .replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
}


import { environment } from '../../../environments/environment';
import { optionalString } from '../types/types';
import { Constants, Messages } from '../constants/constants';
import { FormGroup } from '@angular/forms';

export function apiUrl(path): string {
  return environment.apiURL + path;
}

export function auth(path): string {
  return apiUrl(`auth/${path}`);
}

export function isEmpty(data): boolean {
  if (!exists(data)) {
    return true;
  }
  if (typeof data === 'object') {
    return Object.keys(data).length === 0;
  } else {
    return !exists(data);
  }
}

export function exists(data: any): boolean {
  return data !== undefined && data !== null && data !== '';
}

export function concatenate(...strings: any[]): string {
  let concatenated = '';
  for (const text of strings) {
    concatenated += text;
  }
  return concatenated;
}

export function makeDefaultImagePath(imageName: optionalString): string {
  return concatenate(environment.imageURL, imageName);
}

export function resolveErrorMessage(error: any): optionalString {
  if (error.status === '(failed)' || error.status === 0) {
    return Messages.internetConnectionDescription;
  }
  if (exists(error.error.message)) {
    return error.error.message;
  } else {
    return error.message;
  }
}

export function resolveValue(value: any, defaultValue: any = ''): any {
  if (!exists(value)) {
    return defaultValue;
  }
  return value;
}

export function resolveObjectKey(
  obj: any,
  key: string,
  defaultValue: any = null
): any {
  let value = defaultValue;
  if (exists(obj)) {
    if (exists(obj[key])) {
      value = obj[key];
    }
  }
  return value;
}

export function getTypeFromBase64(base64: string): string {
  const block = base64.split(';');
  return block[0].split(':')[1];
}

export function resolveDataNotFound(data: any, callback: any): void {
  if (data && data.length) {
    callback(false);
  } else {
    callback(true);
  }
}

export function uniqueID(length: number): string {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function removeJsCssFile(filename: any, fileType: any): void {
  const targetElement =
    fileType === 'js' ? 'script' : fileType === 'css' ? 'link' : 'none';
  const targetAttr =
    fileType === 'js' ? 'src' : fileType === 'css' ? 'href' : 'none';
  const allSuspects = document.getElementsByTagName(targetElement);
  for (let i = allSuspects.length; i >= 0; i--) {
    if (
      allSuspects[i] &&
      allSuspects[i].getAttribute(targetAttr) !== null &&
      // @ts-ignore
      allSuspects[i].getAttribute(targetAttr).indexOf(filename) !== -1
    ) {
      // @ts-ignore;
      allSuspects[i].parentNode.removeChild(allSuspects[i]);
    }
  }
}

export function loadScript(
  url: string,
  defer: boolean = true,
  position: string = 'footer',
  type: string = 'text/javascript'
): void {
  removeJsCssFile(url, 'js');
  let body = document.body as HTMLDivElement;
  if (position === 'header') {
    body = document.head as HTMLDivElement;
  }
  const script = document.createElement('script');
  script.innerHTML = '';
  script.type = type;
  script.src = url;
  script.async = false;
  script.defer = defer;
  body.appendChild(script);
}

export function range(total: number): number[] {
  const x = [];
  let i = 1;
  while (x.push(i++) < total) {}
  return x;
}

export function showFormError(): void {
  setTimeout(() => {
    let element = document.querySelector('.error-fld');
    if (element) {
      element = element.closest('.form-group');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, Constants.errorTimeOut);
}

export function cleanHttpHttps(url: any): any {
  if (url) {
    url = url
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '');
  }

  return url;
}

export function resolveDate(date: string): Date {
  return new Date(date.replace(/-/g, '/'));
}

export function response(
  message: string,
  code = 200
): { error: { message: string }; status: number } {
  return { status: code, error: { message } };
}

export function toggleCartSidebar(): void {
  document.getElementById('cart').classList.toggle('active');
  document.getElementById('cart-icon-head-ui').classList.toggle('active');
  document.getElementById('ps-site-overlay-ui').classList.toggle('active');
}

export function closeCartSidebar(): void {
  if (document.getElementById('cart')) {
    document.getElementById('cart').classList.remove('active');
  }
  if (document.getElementById('cart-icon-head-ui')) {
    document.getElementById('cart-icon-head-ui').classList.remove('active');
  }
  if (document.getElementById('ps-site-overlay-ui')) {
    document.getElementById('ps-site-overlay-ui').classList.remove('active');
  }
}

export function getSortDirection(current: string = 'asc'): string {
  return current === 'asc' ? 'desc' : 'asc';
}

export function showValidationMessages(form: FormGroup, errors): void {
  Object.keys(errors).forEach((key) => {
    form.controls[key].setErrors({ required: true });
  });
}

export function getSettingValue(key): string | null {
  if (key && this.settings) {
    const setting = this.settings
      ? this.settings.find((x) => x.key === key)
      : null;
    if (setting) {
      return setting.value;
    }
    return null;
  } else {
    return null;
  }
}

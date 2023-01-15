import {Media} from '../interfaces/media';
import {concatenate} from './core.function';
import {Category} from '../interfaces/header.response';
import {environment} from "../../../environments/environment";

declare var $: any;
export function imageFromAdditional(files: Array<Media>): Media | null {
  if (files.length > 1) {
    return files[1];
  }
  return null;
}

export function getCategoryFullNameAndPath(category: any): {name: string, path: string} {
  let name: string;
  let path = '/products/';
  if (category) {
    if (category.parent) {
      // name = concatenate(category.parent.name, ' ', category.name);
      name = concatenate(category.name);
      path = concatenate(path, category.parent.slug , '/', category.slug);
    } else {
      name = category.name;
      path = concatenate(path, category.slug);
    }
  }

  return {name, path};
}

export function convertCategoriesNamesAndPaths(categories: Array<Category> = []): Array<Category> {
  const cats = [];
  for (const category of categories) {
    const nameAndPath = getCategoryFullNameAndPath(category);
    cats.push({...category, fullName: nameAndPath.name, fullPath: nameAndPath.path});
  }

  return cats;
}

export function percentToValue(percentAmount: number, total = 5): number {
  return percentAmount / (100 / total);
}

export function resolvePrice(price: any, type: string, symbol = '+'): string {
  let formatted = '';
  if (type === 'fixed') {
    formatted = price.formatted;
    if (formatted === '$0.00') {
      formatted = '';
    } else {
      formatted = ` ${symbol} ${formatted}`;
    }
    return formatted;
  } else {
    formatted = parseFloat(price).toFixed(2) + '%';
    if (formatted === '0%') {
      formatted = '';
    } else {
      formatted = ` ${symbol} ${formatted}`;
    }
  }
  return formatted;
}

export function resolveOptionPrice(price: any, type: string): number {
  if (type === 'fixed') {
    return price.inCurrentCurrency.amount;
  } else {
    return parseFloat(parseFloat(price).toFixed(2));
  }
}

export function calculatePercentage(percentAmount: number, totalAmount: number): number {
  return (percentAmount / 100) * totalAmount;
}
export function closeMobileMegaMenu(): void {
  if ($('#collapsibleNavbar').hasClass('show')) {
    $('#collapsibleNavbar').removeClass('show');
    $('#main-menu-btn').addClass('collapsed');
    $('#main-menu-btn').attr('aria-expanded', 'false');
  }
}

export function closeMegaMenu(): void {
  const link = $('#shop-link');
  if (link.hasClass('shp-dropdn')) {
    link.removeClass('shp-dropdn');
  }
  $('#mega-menu').toggle();
}

export function makeUsername(length): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function payPal(url, version: string = 'v2'): string {
  return concatenate(environment.paypal.url, `/${version}/`, url);
}

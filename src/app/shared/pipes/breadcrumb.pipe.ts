import { Pipe, PipeTransform } from '@angular/core';
import {toTitleCase} from "codelyzer/util/utils";

@Pipe({
  name: 'breadcrumb'
})
export class BreadcrumbPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    value = value.replace(/-/g, ' ');
    return toTitleCase(<string>value);
  }

}

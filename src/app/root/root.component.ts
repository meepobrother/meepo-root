/* tslint:disable:no-any */
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnInit,
  Optional,
} from '@angular/core';
import { createRootInitializer, ROOT_CONFIG, RootConfig } from './root-config';

@Component({
  selector: '[app-root],app-root,root,[root],meepo-root,[meepo-root]',
  template: `
    <ng-content></ng-content>
  `,
})
export class RootComponent implements OnInit {
  private _document: Document;
  private options: RootConfig;
  @Input() nzExtraFontName: string;
  @Input() nzExtraFontUrl: string;
  constructor(
    @Inject(DOCUMENT) _document: any,
    @Inject(ROOT_CONFIG) @Optional() options: any,
  ) {
    this._document = _document;
    this.options = options;
  }

  ngOnInit(): void {
    if (this.nzExtraFontName && this.nzExtraFontUrl && !this.options) {
      const options: RootConfig = { extraFontName: this.nzExtraFontName, extraFontUrl: this.nzExtraFontUrl };
      const initializer = createRootInitializer(this._document, options);
      initializer();
    }
  }
}

import { CommonModule, DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, ComponentFactoryResolver, ComponentRef, Inject, Injector, NgModule, OnDestroy, Optional } from '@angular/core';
import { createRootInitializer, ROOT_CONFIG } from './root-config';
import { RootStyleComponent } from './root-style.component';
import { RootComponent } from './root.component';

@NgModule({
  exports: [RootComponent],
  declarations: [RootComponent, RootStyleComponent],
  imports: [CommonModule],
  entryComponents: [RootStyleComponent],
  providers: [
    { provide: APP_INITIALIZER, multi: true, useFactory: createRootInitializer, deps: [DOCUMENT, [new Optional(), ROOT_CONFIG]] },
  ],
})
export class RootModule implements OnDestroy {
  private _document: Document;
  private styleHostComponent: ComponentRef<RootStyleComponent>;
  constructor( @Inject(DOCUMENT) _document: any, injector: Injector, resolver: ComponentFactoryResolver) {
    this._document = _document;
    const componentFactory = resolver.resolveComponentFactory(RootStyleComponent);
    const div = this._document.createElement('div');
    this.styleHostComponent = componentFactory.create(injector, null, div);
  }

  ngOnDestroy(): void {
    this.styleHostComponent.destroy();
  }
}

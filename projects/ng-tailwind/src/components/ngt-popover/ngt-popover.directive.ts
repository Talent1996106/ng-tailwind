import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnDestroy,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';

import { NgtPopoverPosition, NgtPopoverTooltipComponent } from './ngt-popover-tooltip/ngt-popover-tooltip.component';
import { NgtPopoverOpenMethod } from './ngt-popover.component';

@Directive({
    selector: '[ngt-popover]'
})
export class NgtPopoverDirective implements OnDestroy {
    @Input() public ngtPopoverContent: string;
    @Input() public ngtPopoverTemplate: TemplateRef<any>;
    @Input() public ngtPopoverPosition: NgtPopoverPosition = NgtPopoverPosition.DEFAULT;

    @Input() public dismissDelay: number = 150;
    @Input() public closeOnClick: boolean;
    @Input() public openMethod: 'HOVER' | 'CLICK' = NgtPopoverOpenMethod.HOVER;

    private componentRef: ComponentRef<NgtPopoverTooltipComponent> = null;
    private dismissTimeoutInstance: NodeJS.Timeout;

    public constructor(
        private elementRef: ElementRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef
    ) { }

    @HostListener('click')
    public onClick(): void {
        if (this.openMethod != NgtPopoverOpenMethod.CLICK) {
            return;
        }

        if (!this.componentRef) {
            this.createPopover();

            return;
        }

        this.destroy();
    }

    @HostListener('document:click', ['$event.target'])
    public onDocumentClick(target: HTMLElement) {
        if (
            this.closeOnClick
            && !this.componentRef?.location?.nativeElement?.contains(target)
            && target !== this.elementRef.nativeElement
            && target !== this.componentRef?.location?.nativeElement
        ) {
            this.destroy();
        }
    }

    @HostListener('mouseleave')
    public onMouseLeave(): void {
        if (this.closeOnClick) {
            return;
        }

        if (this.dismissTimeoutInstance) {
            clearTimeout(this.dismissTimeoutInstance);
        }

        this.dismissTimeoutInstance = setTimeout(() => this.destroy(), this.dismissDelay);
    }

    @HostListener('mouseenter')
    public onMouseEnter(): void {
        if (this.componentRef || this.openMethod != NgtPopoverOpenMethod.HOVER) {
            return;
        }

        this.createPopover();
    }

    public ngOnDestroy(): void {
        this.destroy();
    }

    private createPopover(): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NgtPopoverTooltipComponent);

        this.componentRef = this.viewContainerRef.createComponent(componentFactory);

        this.setupPopoverComponent();
    }

    private destroy(): void {
        this.componentRef?.destroy();
        this.componentRef = null;
    }

    private setupPopoverComponent(): void {
        if (!this.componentRef) {
            return;
        }

        this.componentRef.instance.popover = this.ngtPopoverContent;
        this.componentRef.instance.popoverTemplate = this.ngtPopoverTemplate;
        this.componentRef.instance.position = this.ngtPopoverPosition;

        const hostElement = this.elementRef.nativeElement;
        const popoverElement = this.componentRef.location.nativeElement;

        hostElement.classList.add('relative');
        hostElement.appendChild(popoverElement);
    }
}
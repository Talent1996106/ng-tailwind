import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injector,
  Input,
  Optional,
  Output,
  Self,
} from '@angular/core';

import { NgtStylizableDirective } from '../../directives/ngt-stylizable/ngt-stylizable.directive';
import { NgtStylizableService } from '../../services/ngt-stylizable/ngt-stylizable.service';

@Component({
  selector: 'ngt-modal',
  templateUrl: './ngt-modal.component.html',
  styleUrls: ['./ngt-modal.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(300)
      ])
    ])
  ]
})
export class NgtModalComponent implements AfterViewInit {
  @Input() customLayout: boolean = false;
  @Input() disableDefaultCloses: boolean = false;
  @Input() ngtStyle: NgtStylizableService;

  @Output() onCloseModal: EventEmitter<any> = new EventEmitter();
  @Output() onOpenModal: EventEmitter<any> = new EventEmitter();

  public closeButton = document.querySelectorAll('.modal-close');
  public isOpen: boolean = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private injector: Injector,
    @Self() @Optional() private tailStylizableDirective: NgtStylizableDirective,
  ) {
    if (this.tailStylizableDirective) {
      this.ngtStyle = this.tailStylizableDirective.getNgtStylizableService();
    } else {
      this.ngtStyle = new NgtStylizableService();
    }

    this.ngtStyle.load(this.injector, 'NgtModal', {
      w: 'md:max-w-md',
      py: 'py-4',
      px: 'px-6',
      color: {}
    });
  }

  close() {
    this.isOpen = false;
    this.changeDetectorRef.detectChanges();
    this.onCloseModal.emit();
  }

  open() {
    this.isOpen = true;
    this.changeDetectorRef.detectChanges();
    this.onOpenModal.emit();
  }

  ngAfterViewInit() {
    if (!this.disableDefaultCloses) {
      document.getElementsByTagName('body').item(0).onkeydown = (event: any) => {
        if (event.keyCode == 27) {
          this.close();
        }
      }
    }
  }
}

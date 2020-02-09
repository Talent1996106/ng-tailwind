import { Component, Injector, Input, Self, Optional } from '@angular/core';
import { NgtStylizableService } from '../../services/ngt-stylizable/ngt-stylizable.service';
import { NgtStylizableDirective } from '../../directives/ngt-stylizable/ngt-stylizable.directive';

@Component({
  selector: 'ngt-section',
  templateUrl: './ngt-section.component.html',
  styleUrls: ['./ngt-section.component.css']
})
export class NgtSectionComponent {

  @Input() icon: string;
  @Input() caption: string;
  @Input() subtitle: string;
  @Input() accordion = false;

  public ngtStyle: NgtStylizableService;
  public showSection = true;

  constructor(
    private injector: Injector,
    @Self() @Optional() private ngtStylizableDirective: NgtStylizableDirective
  ) {
    if (this.ngtStylizableDirective) {
      this.ngtStyle = this.ngtStylizableDirective.getNgtStylizableService();
    } else {
      this.ngtStyle = new NgtStylizableService();
    }

    this.ngtStyle.load(this.injector, 'Section', {
      color: {}
    });
  }

  toogleSectionVisibility() {
    this.showSection = !this.showSection;
  }
}

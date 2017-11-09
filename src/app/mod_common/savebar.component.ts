import { Component,Input,Output,EventEmitter } from '@angular/core';
@Component({
  selector: 'save-bar',
  templateUrl: 'savebar.component.html',
})
export class SaveBarComponent {
  @Input() buttonMode:number;
  @Output() triggerParentFunc = new EventEmitter();

  async buttonClicked(){
    await this.triggerParentFunc.emit();
  }
}

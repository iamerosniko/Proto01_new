import { Component } from '@angular/core';
@Component({
  selector: 'no-access',
  template: `
  <div class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4><i class="fa fa-question-circle"></i>&nbsp;Message</h4>
            </div>
            <div class="modal-body">
                <p>Question here...</p>
            </div>
            <div class="modal-footer">
                <div class="btn-group pull-right" role="group">
                    <a id="modal_yes" href="#" class="btn btn-primary btn-sm" data-dismiss="modal">
                        <i class="fa fa-check"></i>&nbsp;Yes
                    </a>
                    <a id="modal_no" href="#" class="btn btn-default btn-sm" data-dismiss="modal">
                        No
                    </a>
                </div>
            </div>
        </div>
    </div>
  </div>
    `,
})
export class ModalConfirmComponent {
  constructor(){

  }
}

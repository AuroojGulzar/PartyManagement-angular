import { Component, OnInit } from '@angular/core';
import { PartyService } from '../../Services/partyManagementService';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../Services/sweetAlertService';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Party, partyModel } from '../../models/party-management';

@Component({
  selector: 'app-party-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './party-list.component.html',
  styleUrl: './party-list.component.css'
})
export class PartyListComponent implements OnInit {
  partyData: any[] | undefined;
  address:any;
  editForm: FormGroup ;
  partyDataObj = new partyModel();
  isEditing = false;
  constructor(private partyService: PartyService,
    private alertService:AlertService,
    private fb:FormBuilder
  ) {
    this.editForm = this.fb.group({
      id: [''],
      name:[''],
      company_name: [''],
      mobile_no:[''],
      email: [''],
      date_of_birth: [''],
      
    });
    this.partyDataObj

   }

  ngOnInit(): void {
    this.getPartyData();
  
  }
  getPartyData(): void {
    this.partyService.getPartyData().subscribe(
      data => {
        this.partyData = data;
        this.partyDataObj.partyObject=data;
        console.log(  this.partyDataObj.partyObject);
      },
      error => {
        console.error('Error fetching party data', error);
      }
    );
}
getPartyById(id: number): void {
  if(id>0){
    this.partyService.getPartyDataById(id).subscribe(
      data => {
        this.address = data;
        console.log(this.address.id);
        this.editForm.patchValue({
          id: this.address.id,
          company_name: this.address.company_name,
          email: this.address.email,
          date_of_birth: this.address.date_of_birth,
          mobile_no: this.address.mobile_no
        });
        this.isEditing = true;
      },
      error => {
        console.error('Error fetching party data', error);
      }
    );
    
  }
  else{
    this.isEditing = false; 
    this.editForm.reset();
    
  }
 
}

deletePartyById(id: number) {
  this.alertService.showConfirmation('Are you sure?', 'You want be delete this!').then((confirmed) => {
    if (confirmed) {
      this.partyService.deletePartyDataById(id).subscribe(
        data => {
          this.address = data;
          console.log(this.address);
          this.alertService.showAlert('Deleted!', this.address.msg, 'success');
          this.getPartyData();
        },
        error => {
          console.error('Error deleting party data', error);
          this.alertService.showAlert('Error!', 'Failed to delete the party data.', 'error');
        }
      );
    }
  });
}

addParty() {
  const updatedData = this.editForm.value;
  this.partyDataObj.partyObject = new Party();
  this.partyDataObj.addressObj = this.editForm.value;

  if (!this.partyDataObj.partyObject.address) {
    this.partyDataObj.partyObject.address = [];
  }
  this.partyDataObj.partyObject.address.push(this.partyDataObj.addressObj)

  this.partyService.PostPartyData(this.partyDataObj.partyObject).subscribe(
    response => {
      console.log('Update successful', response);
      this.alertService.showAlert('Update successful', 'success');
    },
    error => {
      console.error('Error Adding party data', error);
      this.alertService.showAlert('Error Adding party data', 'Something went wrong', 'error');
     
    }
  );
}



updateParty() {
  const id = this.editForm.get('id')?.value;
  const updatedData = this.editForm.value;
  this.partyDataObj.partyObject = new Party();
  this.partyDataObj.addressObj = this.editForm.value;
  if (!this.partyDataObj.partyObject.address) {
    this.partyDataObj.partyObject.address = [];
  }
  this.partyDataObj.partyObject.address.push(this.partyDataObj.addressObj)


  this.partyService.updatePartyDataById(id,updatedData).subscribe(
    response => {
      console.log('Update successful', response);
      this.alertService.showAlert('Update successful', 'success');
    },
    error => {
      console.error('Error Updating party data', error);
      this.alertService.showAlert('Error updating party data', 'Something went wrong', 'error');
    }
)}
onSubmit(): void {
  if (this.address ===undefined) {
    this.addParty();

  } else {
 this.updateParty();
  }
}


}



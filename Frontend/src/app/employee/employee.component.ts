import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service'
import { NgForm } from '@angular/forms'
import { Employee } from '../shared/employee.model';
import { Editor } from 'ngx-editor';

declare var M: any;
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService],
})
export class EmployeeComponent implements OnInit {
  editor!: Editor;
  html!: '';

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this.refreshEmployeeList();
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id: '',
      empId:'',
      firstName:'',
      lastName:'',
      email:'',
      phoneNo:'',
      salary: 0

    }

  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Saved Succesfully!' })
      });
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        console.log(res);
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Update Successfully!' })
      });
    }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    })
  }
  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm();
        M.toast({ html: 'Delete Successfully'});
      })
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BidService } from '../../services/bid.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-bid',
  template: `
    <div class="max-w-md mx-auto mt-8">
      <h2 class="text-2xl font-bold mb-4">Place a Bid</h2>
      <form [formGroup]="bidForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label for="amount" class="block mb-1">Bid Amount</label>
          <input type="number" id="amount" formControlName="amount" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded" [disabled]="!bidForm.valid">
          Submit Bid
        </button>
      </form>
    </div>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class CreateBidComponent implements OnInit {
  bidForm: FormGroup;
  projectId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private bidService: BidService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.bidForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.queryParamMap.get('projectId');
  }

  onSubmit() {
    if (this.bidForm.valid && this.projectId) {
      const bid = {
        vendorId: this.authService.getVendorId(),
        projectId: this.projectId,
        amount: parseFloat(this.bidForm.get('amount')?.value),
        status: 'Pending'
      };

      console.log('one billy', this.authService.getVendorId());

      this.bidService.createBid(bid).subscribe(
        () => {
          this.toastr.success('Bid placed successfully!', 'Success');
          this.router.navigate(['/bids']);
        },
        error => {
          this.toastr.error('Failed to create bid. Please try again.', 'Error');
          console.error('Failed to create bid', error);
        }
      );
    } else {
      this.toastr.warning('Please fill in the required fields.', 'Warning');
    }
  }
}

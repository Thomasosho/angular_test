import { Component, OnInit } from '@angular/core';
import { BidService } from '../../services/bid.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bid-list',
  template: `
    <div class="container mx-auto mt-8">
      <h2 class="text-2xl font-bold mb-4">My Bids</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let bid of bids">
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {{ bid.projectId }}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {{ bid.amount }}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {{ bid.status }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class BidListComponent implements OnInit {
  bids: any[] = [];

  constructor(
    private bidService: BidService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const vendorId = this.authService.getVendorId();
    if (vendorId) {
      this.bidService.getBidsByVendor(vendorId).subscribe(
        bids => this.bids = bids,
        error => console.error('Failed to load bids', error)
      );
    }
  }
}

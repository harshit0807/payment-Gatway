import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent {

  constructor(private http: HttpClient) {}

  planDetails = {
    name: 'Pro Annual Subscription',
    renewalDate: 'Dec 15, 2026',
    benefits: [
      'Unlimited Access to Pro Tools',
      '24/7 Priority Support',
      '100 GB Dedicated Cloud Storage'
    ]
  };

  orderSummary = {
    subtotal: 215.99,
    cgst: 19.44,
    sgst: 19.44,
    total: 254.87   
  };

  billingForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    addressLine1: new FormControl('', Validators.required),
    addressLine2: new FormControl(''),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required),
    country: new FormControl('India', Validators.required),
    gstNumber: new FormControl('')
  });

 
  onSubmit() {
    if (!this.billingForm.valid) {
      this.billingForm.markAllAsTouched();
      return;
    }

   
    const payload = {
      amount: Math.round(this.orderSummary.total * 100), // convert to paise
      merchantUserId: this.billingForm.value.fullName || 'guest_user'
    };

    console.log("Sending payment request...", payload);

    this.http.post<any>('http://localhost:5000/api/admin/create-payment', payload)
      .subscribe({
        next: (res) => {
          console.log("Payment Response:", res);

          if (res.success && res.checkoutPageUrl) {
            window.location.href = res.checkoutPageUrl;  // redirect to PhonePe
          } else {
            alert("Payment API did not return checkout URL.");
          }
        },
        error: (err) => {
          console.error("Payment API Error: ", err);
          alert("Payment failed to start.");
        }
      });
  }
}

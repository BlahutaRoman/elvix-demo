import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import OpenAI from 'openai';

@Component({
  selector: 'app-enrich',
  imports: [MatIconModule, CommonModule, FormsModule, ReactiveFormsModule, MatProgressSpinner],
  templateUrl: './enrich.html',
  providers: [HttpClient],
  styleUrls: ['./enrich.scss', '../app.scss']
})
export class Enrich implements OnInit {

  @Output()
  close = new EventEmitter<boolean>();

  public showSpinner = false;
  public isDone = false;

  // private client = new OpenAI();
  private client!: OpenAI;

  public formCase1AI = new FormGroup({
    email: new FormControl(''),
    phone: new FormControl(''),
    message: new FormControl(''),

    productName: new FormControl(''),
    sku: new FormControl(''),
    eShop: new FormControl(''),
    onStock: new FormControl(false),
    priceUnder: new FormControl(''),
    hasPromotion: new FormControl(false),
    priceDrop: new FormControl(false),
  });

  request: any = undefined;

  hrefs = [
    'https://docs.google.com/spreadsheets/d/1LGLx7Var3O6PZz7ZQ2zg24086tvTNjTzUJuoqkcQs1I/edit?usp=sharing',
    'https://docs.google.com/spreadsheets/d/1rpRHO-a3bj-TZHFzYHiLVdMLXuoychPXsG8KV9sQbrQ/edit?usp=sharing',
    'https://docs.google.com/spreadsheets/d/1LYhUaVHleHXoFYLADZVezfZd-yXna7c3ggjXZhWrDjg/edit?usp=sharing',
  ];

  navItems = [
    'Camera systems',
    'Smart home',
    'Charging electric cars',
    'Accessories for Tesla',
    'Solar lights and lanterns',
    'Domestic energy',
    'Home videophones',
  ];

  public goBack(): void {
    this.isDone = false;
    this.showSpinner = false;
    this.close.emit(false);
    console.log('goBack');
  }

  public case1AI(): void {
    this.showSpinner = true;
    console.log('Enrich');
    this.callGpt(
      this.formCase1AI.controls.email.value,
      this.formCase1AI.controls.phone.value,
      this.formCase1AI.controls.message.value,
      this.formCase1AI.controls.productName.value,
      this.formCase1AI.controls.sku.value,
      this.formCase1AI.controls.eShop.value,
      this.formCase1AI.controls.onStock.value,
      this.formCase1AI.controls.priceUnder.value,
      this.formCase1AI.controls.hasPromotion.value,
      this.formCase1AI.controls.priceDrop.value,
    ).then(responseTxt => {
      const response = JSON.parse(responseTxt);
      console.log('RESPONSE:\n=========')
      console.log((response));

      response.id = localStorage.getItem('currentId');
      response.case = '1';

      const formBody = Object.entries(response)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&');

      fetch('https://script.google.com/macros/s/AKfycbw-EdzI9T4mfSlxmQaUDF6pORKxXWV2r5d--lzobjkPVWZY1W-Yqx5EOqTSqx2hdlzr/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      }).then(prom => {});

      setTimeout(() => {
        this.isDone = true;
        localStorage.setItem('currentId', JSON.stringify(Number(localStorage.getItem('currentId')! + 1)));
      }, 2000);

    });
  }

  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.client = new OpenAI({dangerouslyAllowBrowser: true, apiKey: localStorage.getItem('gpt-token')!});
    if (!localStorage.getItem('currentId')) {
      localStorage.setItem('currentId', '1');
    }

    const requests: any[] = JSON.parse(localStorage.getItem('elvix')!);
    this.request = requests[requests.length-1];
    console.log(this.request);

    this.formCase1AI.patchValue({
      email: this.request.email,
      phone: this.request.phone,
      message: this.request.message,

      productName: this.request.product,
      sku: this.request.sku,
      eShop: this.request.shop,
      onStock: this.request.onStock,
      priceUnder: this.request.priceUnder,
      hasPromotion: this.request.hasPromotion,
      priceDrop: this.request.priceDrop,
    });
  }

  public async callGpt(
    email: string | null,
    phone: string | null,
    message: string | null,
    productName: string | null,
    sku: string | null,
    eShop: string | null,
    onStock: boolean | null,
    priceUnder: string | null,
    hasPromotion: boolean | null,
    priceDrop: boolean | null,
  ): Promise<any> {
    const prompt = `There is a eShop which requires automatic analysis of user-sent requests. For example, the customer can send a message for moderators asking for a discount or inquiring for some product details etc. (message categories are as follows: discount, wished price, spam, feedback, misc)
Please process the following message from a customer trying to buy the following product:

${productName}
EShop: ${eShop}
SKU code: ${sku},
Price: 223 CZK,
On Stock: ${onStock},
Has Promotion: ${hasPromotion},
Price Under: ${priceUnder},
Price Drop: ${priceDrop},

Customer request details:

Email: ${email}
Phone: ${phone}
Message: ${message}

Here are the data columns required to be filled out based on customer request data and product data:

Email
Phone
Message
Message Category
Product Name
SKU/Product Code
e-Shop (Elvix.cz)
On Stock (boolean)
Price Drop (boolean)
Price Under
Has Promotion (boolean)
Action Required (boolean)
Next Best Action

please output them in json format (camelCase property names). No other text besides the JSON object.`;

    console.log('PROMPT:\n==========')
    console.log(prompt);

    const response = await this.client.responses.create({
      model: "gpt-5-nano",
      input: prompt,
    });

    // console.log(JSON.parse(response.output_text));
    return response.output_text
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from './data.service';

type Currency = {
  ccy: string;
  base_ccy: string;
  buy: number;
  sale: number;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  public exchangeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    this.exchangeForm = this.formBuilder.group({
      fromInput: 0,
      toInput: 0,
    });
  }

  currencies: Array<Currency> = [
    { ccy: 'UAH', base_ccy: 'UAH', buy: 1, sale: 1 },
  ];
  from = {
    currency: 'UAH',
  };
  to = {
    currency: 'UAH',
  };

  renderHeader = () => {
    return this.currencies.filter(
      (item) => item.ccy === 'USD' || item.ccy === 'EUR'
    );
  };

  kross = () => {
    let fromAmount = this.currencies.find(
      (item) => item.ccy === this.from.currency
    );
    let toAmount = this.currencies.find(
      (item) => item.ccy === this.to.currency
    );
    let result = fromAmount!.buy / toAmount!.buy;
    return result;
  };

  ngOnInit() {
    this.dataService.fetchData()
        .subscribe((data: any) => {
            data.forEach((element:any) => {
              if(element.base_ccy !== 'UAH') {
                let base = data.find((el: any) => el.ccy === element.base_ccy)
                element.buy = (element.buy*base.buy).toString()
                element.sale = (element.sale*base.sale).toString()
                element.base_ccy = base.base_ccy
              }
            });
            this.currencies.push(...data);
          });
  }
}

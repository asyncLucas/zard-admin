import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { CommonModule } from '@angular/common';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart } from 'echarts/charts';
import { TranslateService } from '@ngx-translate/core';
import { Component, computed, inject } from '@angular/core';
import { GridComponent, PolarComponent } from 'echarts/components';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';

import { DateService } from '@app/shared/services/date.service';
import { ThemeService } from '@app/shared/services/theme.service';
import { TransactionsState } from '../transactions/transactions.state';
import { ZardCardComponent } from '@app/shared/components/card/card.component';

echarts.use([
  BarChart,
  LineChart,
  GridComponent,
  PolarComponent,
  CanvasRenderer,
]);

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgxEchartsDirective, ZardCardComponent],
  providers: [provideEchartsCore({ echarts })],
  template: `
    <div class="flex flex-col lg:flex-row gap-4 mb-4">
      @for (item of statistics; track $index){
        <z-card [zTitle]="item.label">
          <div class="text-3xl font-bold">{{ item.value | currency:'EUR' }}</div>
          <div class="text-sm text-success-500">{{ item.description }}</div>
        </z-card>
      }
    </div>
    <div class="flex flex-col lg:flex-row gap-4">
      <z-card
        zTitle="Balance Overview"
        zDescription="Overview of your account balance over the year"
      >
        <div
          echarts
          class="w-full"
          [options]="options()"
          [theme]="themeService.currentTheme()"
        ></div>
      </z-card>
      <z-card
        zTitle="Revenue Overview"
        zDescription="Overview of your revenue for new products this week"
      >
        <div
          echarts
          class="w-full"
          [options]="revenueOptions()"
          [theme]="themeService.currentTheme()"
        ></div>
      </z-card>
    </div>
  `,
})
export class DashboardComponent {
  readonly themeService = inject(ThemeService);
  readonly #dateService = inject(DateService);
  readonly #translateService = inject(TranslateService);
  readonly #transactionsState = inject(TransactionsState);

  value = 60;
  statistics = [
    { label: 'Income', description: '+4.5% since last month', value: 1245 },
    { label: 'Expenses', description: '-2.1% since last month', value: 3421 },
    { label: 'Net Profit', description: '+6.3% since last month', value: 876 },
    { label: 'MRR', description: '+8.7% since last month', value: 54 },
  ];

  readonly options = computed<EChartsOption>(() => ({
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: this.#dateService.months().map((m) =>
        this.#translateService.instant(m)
      ),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: this.#transactionsData(),
        type: 'line',
        areaStyle: {},
      },
    ],
  }));

  readonly revenueOptions = computed<EChartsOption>(() => ({
    xAxis: {
      type: 'category',
      data: this.#dateService.weekdays().map((d) =>
      this.#translateService.instant(d)
    ),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  }));

  readonly #transactionsData = computed(() => {
    const data = Array(12).fill(0);
    this.#transactionsState.transactions().forEach((transaction) => {
      const month = new Date(transaction.date).getMonth();
      data[month] += transaction.amount;
    });
    return data;
  });
}

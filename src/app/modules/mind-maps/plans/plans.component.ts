import { map, Observable } from 'rxjs';
import * as echarts from 'echarts/core';
import { TreeChart } from 'echarts/charts';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CanvasRenderer } from 'echarts/renderers';
import { Component, inject, OnInit } from '@angular/core';
import { TitleComponent, TooltipComponent } from 'echarts/components';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { ZardCardComponent } from '@app/shared/components/card/card.component';
import { TranslatePipe } from '@ngx-translate/core';

echarts.use([TreeChart, CanvasRenderer, TitleComponent, TooltipComponent]);

interface MindMapNode {
  name: string;
  children: MindMapNode[];
}

@Component({
  selector: 'app-plans',
  imports: [
    CommonModule,
    NgxEchartsDirective,
    ZardCardComponent,
    TranslatePipe,
  ],
  providers: [provideEchartsCore({ echarts })],
  template: `
    <z-card [zTitle]="'MENU.MIND_MAPS' | translate">
      <div echarts [options]="options | async"></div>
    </z-card>
  `,
})
export class PlansComponent implements OnInit {
  private http = inject(HttpClient);

  options?: Observable<echarts.EChartsCoreOption>;

  ngOnInit(): void {
    this.options = this.http
      .get<MindMapNode>('assets/data/flare.json', { responseType: 'json' })
      .pipe(
        map((data) => {
          echarts.util.each(
            data.children,
            (datum: any, index: string | number | undefined) => {
              if (typeof index === 'number' && index % 2 === 0) {
                datum.collapsed = true;
              }
            }
          );
          return {
            tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove',
            },
            zoomOnMouseWheel: true,
            moveOnMouseMove: true,
            moveOnMouseWheel: true,
            series: [
              {
                type: 'tree',
                roam: 'move',
                nodeClick: true,
                data: [data],

                // Layout
                top: '1%',
                left: '10%',
                bottom: '1%',
                right: '10%',

                symbolSize: 10,

                label: {
                  position: 'left',
                  verticalAlign: 'middle',
                  align: 'right',
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#FFFFFF',
                },

                // Labels on leaf nodes
                leaves: {
                  label: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left',
                    fontSize: 13,
                    fontWeight: '500',
                    color: '#FFFFFF',
                  },
                },

                // Tree behavior
                expandAndCollapse: true,
                initialTreeDepth: 2,
                emphasis: {
                  focus: 'descendant',
                },

                animationDuration: 600,
                animationDurationUpdate: 800,
              },
            ],
          };
        })
      );
  }
}

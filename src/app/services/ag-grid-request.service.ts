import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgGridRequestService {
  constructor() {}

  transformAgGridRequest(
    body,
    columnDefs,
    globalSearch?,
    filters?: {
      [key: string]: {
        filterType: string;
        values?: any;
        type?: string;
        nonNullableIntValues?: number[];
        intValues?: number[];
        value?: any;
      };
    },
    sumColumns?,
    isExport?
  ) {
    if (filters) {
      body.filterModel = { ...body.filterModel, ...filters };
    }
    body.globalSearch = globalSearch;
    body.filterModel = this.transformFilters(body.filterModel, columnDefs);
    body.columns = this.getColumns(columnDefs, isExport);
    body.sumColumns = this.getColumns(sumColumns, isExport);
    body.columns = this.getChildColumns(columnDefs, body.columns);
    return body;
  }

  getColumns(columnDefs, isExport?) {
    return columnDefs
      ?.map((column) => column.field)
      .flat()
      .filter((column) => column);
  }

  getChildColumns(columnDefs, columnsArray) {
    columnDefs.filter((column) => {
      if (column?.children?.length) {
        column.children.filter((res) => {
          if (!res.hide || column?.required) {
            columnsArray.push(res.backendFields[0]);
          }
        });
      }
    });
    return columnsArray;
  }

  transformFilters(filters, columnDefs) {
    const filterModel = {};
    Object.keys(filters).forEach((key) => {
      const filter = filters[key];
      if (filter.filterType === 'date') {
        filterModel[key] = this.convertAGgridDate(filter);
      } else {
        filterModel[key] = filters[key];
      }
    });

    return filterModel;
  }

  private convertAGgridDate(filter) {
    filter.dateFrom = filter.dateFrom
      ? filter.dateFrom.replace(' ', 'T')
      : null;
    if (filter.dateTo) {
      var date = new Date(filter.dateTo);
      var userTimezoneOffset = date.getTimezoneOffset() * 60000;
      filter.dateTo = new Date(
        new Date(filter.dateTo).setHours(23, 59, 59, 59) - userTimezoneOffset
      )
        .toISOString()
        .replace(' ', 'T');
    } else {
      filter.dateTo = null;
    }
    return filter;
  }
}

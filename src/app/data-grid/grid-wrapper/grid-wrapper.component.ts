import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GridApi, Module, ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
ModuleRegistry.registerModules([
  ServerSideRowModelModule,
  ClientSideRowModelModule,
  ClipboardModule,
  MenuModule,
  RangeSelectionModule,
  SetFilterModule,
  FiltersToolPanelModule,
  ColumnsToolPanelModule,
  MasterDetailModule,
  RichSelectModule,
  RowGroupingModule,
  MultiFilterModule,
  ExcelExportModule
]);
@Component({
  selector: 'app-grid-wrapper',
  templateUrl: './grid-wrapper.component.html',
  styleUrls: ['./grid-wrapper.component.scss'],
})
export class GridWrapperComponent implements OnInit {
  @Output() selectedDateEmitter: EventEmitter<any> = new EventEmitter();
  @Input() gridOptions;
  @Input() columnDefs;
  @Input() page;
  @Input() module;
  @Input() allExperties;
  modules: Module[] = [ClientSideRowModelModule];
  @Output() cellClicked = new EventEmitter<any>();
  @Input() hideSearch: boolean = false;
  @Input() overlayNoRowsTemplate;
  @Input() dateFilter;
  gridApi: GridApi;
  rowModelType;
  rowData: [];
  @Output() sideBar = new EventEmitter<any>();
  @Output() callTextTypeData = new EventEmitter<any>();
  @Output() notificationsTypeData = new EventEmitter<any>();
  @Output() searchText = new EventEmitter<any>();
  @Output() addNewMember = new EventEmitter<any>();
  @Input() callTextOnOff;
  @Input() notificationsOnOff;
  @Input() searchTextData;
  @Output() isDispatchedOnly = new EventEmitter<any>();
  @Output() selectedExpertise = new EventEmitter<any>();
  @Output() exportToExcel = new EventEmitter<any>();
  @Output() sendsMessageToAll =new EventEmitter<any>();
  @Output() openSettingBox =new EventEmitter<any>();


  constructor() {}

  ngOnInit(): void {}

  onCellClicked(event) {
    this.cellClicked.emit(event);
  }

  selectedDate(event) {
    this.selectedDateEmitter.emit(event);
  }

  callTextType(event){
    this.callTextTypeData.emit(event);
  }

  notificationsType(event){
    this.notificationsTypeData.emit(event);
  }

  searchedText(event){
    this.searchText.emit(event)
  }

  isDispatched(event){
    this.isDispatchedOnly.emit(event)
  }

  exportList(){
    this.exportToExcel.emit()
  }

  addNew(){
    this.addNewMember.emit();
  }

  sendThanksMessageToAll(){
    this.sendsMessageToAll.emit()
  }

  getSelectedExpertise(event){
    this.selectedExpertise.emit(event)
  }
  OpenSettingComponent(){
    this.openSettingBox.emit()
  }
}

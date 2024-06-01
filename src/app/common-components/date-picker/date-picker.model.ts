export interface DatePickerModel {
    from?: Date;
    to?: Date;
    label?: string;
}

export enum AvalableDateLabels {
    Today = "Today",
    Yesterday = "Yesterday",
    Last7Days = "Last 7 Days",
    Last14Days = "Last 14 Days",
    Last30Days = "Last 30 Days",
    Last90Days = "Last 90 Days",
    Last180Days = "Last 180 Days",
    Last365Days = "Last 365 Days",
}
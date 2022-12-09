export interface Columns {
  data_name: string;
  header: string;
  sortable: boolean;
  dataFilter(data: any, key: any): any;
}

interface CustomerProperties {
  idpelangga: string;
  nama?: string;
  Kecamatan: string;
  Kelurahan: string;
  kota: string;
  type: string;
  total: number;
  latitude: number;
  longitude: number;
  status_billing: string;
  due_date: string;
  tanggal_bayar: string;
  pemakaian_m3: number;
}
export interface Customer {
  type: 'Feature';
  properties: CustomerProperties;
  geometry: GeoJSON.Geometry;
}

export interface LastUpdateTracker {
  slug : string;
  customers: number; //timestamp
}
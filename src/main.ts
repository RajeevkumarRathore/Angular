import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { LicenseManager } from "@ag-grid-enterprise/core";


LicenseManager.setLicenseKey(
  "CompanyName=Nineyard Solutions LLC,LicensedApplication=Nineyard,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=1,AssetReference=AG-035994,SupportServicesEnd=15_February_2024_[v2]_MTcwNzk1NTIwMDAwMA==d9106ac766c2b53cf9d48dac1333851a"
);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

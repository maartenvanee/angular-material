import { NgModule } from "@angular/core";
import { MatButtonModule, MatListModule, MatCheckboxModule } from "@angular/material";

let MatModules = [MatButtonModule, MatListModule, MatCheckboxModule];

@NgModule({
    imports: MatModules,
    exports: MatModules
})
export class MaterialModule {}

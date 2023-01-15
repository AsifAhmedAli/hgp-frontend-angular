import {RouterModule, Routes} from "@angular/router";
import {PageTemplateComponent} from "./page-template/page-template.component";
import {NgModule} from "@angular/core";
const routes: Routes = [
    {
        path: '',
        component: PageTemplateComponent,

    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule { }

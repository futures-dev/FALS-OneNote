import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerProvider } from 'Service/Providers/ServerProvider';
import { HttpClientModule } from '@angular/common/http';
import { CourseProvider } from 'Service/Providers/CourseProvider';

@NgModule({
    imports: [HttpClientModule],
    exports: [],
    declarations: [],    
    providers: [CourseProvider, ServerProvider],
})
export class ProvidersModule { }


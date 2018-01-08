import { CourseProvider } from "Service/Providers/CourseProvider";
import { Course } from "Service/Fals/Entities/Course";
import { LoadingState } from "Service/Common/Enums";
import { Input, Component } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { OnInit } from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import { Router } from "@angular/router";
import { UrlTree } from "@angular/router/src/url_tree";
import { ActivateScenarioError } from "Service/CourseLogic/ActivateScenario";

@Component({
    selector: 'course',
    templateUrl: 'View/CourseList/Course.html',
    providers:[CourseProvider, CourseService],
})
export class CourseComponent implements OnInit{
    
    LoadState : BehaviorSubject<LoadingState> = new BehaviorSubject(LoadingState.Unload);
    
    @Input() 
    Course : BehaviorSubject<Course>;
    
    IsExpanded : BehaviorSubject<boolean> = new BehaviorSubject(false);

    onIsExpandedChanged(expand : boolean) {
        console.log("onIsExpandedChanged " + expand);
        if (expand && this.LoadState.value == LoadingState.Unload){
            this.load();
        }
    }

    constructor(
        private courseProvider : CourseProvider,
        private courseService : CourseService,
        private router : Router,
    ){    }

    load() : void{
        this.LoadState.next(LoadingState.Loading);
        this.courseProvider.populateCourse(this.Course.value).subscribe(q => {
            this.Course.next(q);
            this.LoadState.next(LoadingState.Loaded);
        });
    }

    SelectCourse() : void{
        this.courseService.Activate(this.Course.value).subscribe(
            error => {
                if (error==ActivateScenarioError.sOk){
                    this.router.navigateByUrl("/courseDashboard");
                }
            }
        );
    }

    ngOnInit() {
        this.IsExpanded.subscribe(q => this.onIsExpandedChanged(q));        
    }
}
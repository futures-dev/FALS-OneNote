import { CourseProvider } from "Service/Providers/CourseProvider";
import { Course } from "Service/Fals/Entities/Course";
import { LoadingState } from "Service/Common/Enums";
import { Input, Component } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { OnInit } from "@angular/core";

@Component({
    selector: 'course',
    templateUrl: 'View/CourseList/Course.html',
    providers:[CourseProvider],
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
        private courseProvider : CourseProvider
    ){    }

    load() : void{
        this.LoadState.next(LoadingState.Loading);
        this.courseProvider.populateCourse(this.Course.value).subscribe(q => {
            this.Course.next(q);
            this.LoadState.next(LoadingState.Loaded);
        });
    }

    ngOnInit() {
        this.IsExpanded.subscribe(q => this.onIsExpandedChanged(q));        
    }
}
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";

// access the <Page> UI element and make some changes to it.
import { Page } from "ui/page";
// import the Color class from the NativeScript color module, 
// and the View class from the NativeScript view module.
import { Color } from "color";
import { View } from "ui/core/view";

@Component({
    selector: "my-app",
    // The providers array is a simple list of all the Angular services 
    // that you need to use in your component
    providers: [UserService],
    templateUrl: "./pages/login/login.html",
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginComponent implements OnInit {

    // [(ngModel)]="email" is a two way data binding with angular 
    // [(ngModel)]="email" is shorthand for [text]="email" (ngModelChange)="email=$event", 
    // which binds the email element’s text attribute to an email property and adds a change
    // event handler that updates the email property’s value whenever the user makes a change
    // email = "example@yann.com"

    // set the user property from chich we get the email and passord now and update the
    // two way data binding to [(ngModel)]="user.email" and [(ngModel)]="user.password"
    user: User;

    // add a new isLogginIn property
    // This app uses the same UI for the “Sign In” form and the “Sign Up” form. 
    // Therefore, when the user taps “Sign Up”, we need to update the text of 
    // the buttons and eventually the functionality that occurs when you tap them
    isLoggingIn = true;

    // create a new property that points at the <StackLayout> element.
    @ViewChild("container") container: ElementRef;

    constructor(private userserv: UserService,
                private router: Router,
                private page: Page) {

        this.user = new User();

        // hardcode your credentials in your AppComponent’s constructor()
        this.user.email = "user1@example.com";
        this.user.password = "password";

    }

    // ngOnInit gets invoked when Angular initializes this component.
    ngOnInit() {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = "res://bg_login";
    }

    submit() {
        if (this.isLoggingIn) {
            this.login();
        }
        else {
            this.signUp();
        }
        // alert("You're using: " + this.user.email);
    }

    // get login() from the user.serice
    login() {
        this.userserv.login(this.user)
            .subscribe(
                () => this.router.navigate(["/list"]),
                (error) => alert("Unfortunately we could not find your account.")
            );
    }

    signUp() {
        this.userserv.register(this.user)
            .subscribe(
                () => {
                    alert("Your account was successfully created.");
                    this.toggleDisplay();
                },
                () => alert("Unfortunately we were unable to create your account.")
            );
    }

    // add a new toggleDisplay() method
    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;

        let container = <View>this.container.nativeElement;
        container.animate({
            backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
            duration: 200
        });
    }

}
import { Component, OnInit } from '@angular/core';
import {Book} from '../interface/book';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../service/book.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {

  book: Book[];
  successMessage: string;
  failMessage: string;
  bookForm: FormGroup;
  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private routes: Router) { }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl('',
        [Validators.required,
          Validators.minLength(10)]),
        author: new FormControl('',
      [Validators.required,
        Validators.minLength(10)]),
      description: new FormControl('',
      [Validators.required,
        Validators.minLength(10)])
    }
    );

    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBookById(id)
      .subscribe(result => {
      this.book = result;
      this.bookForm.patchValue(this.book);
      this.successMessage = 'Edit book successfully !';
    }, error => {
      this.failMessage = 'Edit book fail';
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const {value} = this.bookForm;
      const data = {
        ...this.book,
        ...value
      };
      this.bookService.editBook(data)
        .subscribe(result => {
          this.routes.navigate(['']);
        }, error => {
          console.log(error);
        });
    }
  }
}

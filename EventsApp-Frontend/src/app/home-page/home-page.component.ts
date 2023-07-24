import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { User } from '../interfaces/user';
import { EventsService } from '../services/events/events.service';
import { ImagesService } from '../services/images/images.service';
import { UploadFile } from '../interfaces/upload-file';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private eventService: EventsService,
    public imageUpload: ImagesService,
    private sanitizer: DomSanitizer
  ) {}

  users: User[] = [];
  events: Event[];
  search: string;
  images: UploadFile[];
  imageSrc: SafeUrl;

  loadImages(): void {
    this.imageUpload.getAllImages().subscribe((data: any[]) => {
      this.images = data.map((image) => image.imageUrl);
      console.log(data);
    });
  }
  loadImageByName(fileName: string) {
    this.imageUpload.getImagebyName(fileName).subscribe(
      (blob: Blob) => {
        const objectUrl = URL.createObjectURL(blob);
        this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      },
      (error) => {
        console.error('A apărut o eroare la obținerea imaginii:', error);
      }
    );
  }

  ngOnInit(): void {
    this.loadImageByName('foto');
  }
}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit {
  constructor() {}

  message: string;
  imageName: string;
  selectedFile: File;
  @Input() imageUrl: any;
  @Output() image = new EventEmitter<File>();

  ngOnInit() {}

  preview(event: any) {
    if (event.target.files.length === 0) {
      return;
    }
    this.selectedFile = event.target.files[0]
    this.imageName = this.selectedFile.name;

    const mimeType = this.selectedFile.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    this.image.emit(this.selectedFile);
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
  }
}

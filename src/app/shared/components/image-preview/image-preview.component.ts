import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit, OnChanges {
  constructor() {}

  @Input() resetImage: any;
  @Output() imageSelected = new EventEmitter<File>();
  message: string;
  imageName: string;
  imageSource: string | ArrayBuffer;
  selectedFile: File;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.resetImage && changes.resetImage.currentValue) {
      this.reset();
    }
  }

  preview(event: any) {
    if (event.target.files.length === 0) {
      return;
    }
    this.selectedFile = event.target.files[0];
    this.imageName = this.selectedFile.name;

    const mimeType = this.selectedFile.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.imageSource = reader.result;
    };
    this.imageSelected.emit(this.selectedFile);
  }

  reset() {
    this.imageName = '';
    this.imageSource = null;
    this.selectedFile = null;
  }
}

import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';


class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  constructor(private imageService: ImageService) { }
  prediction!: String;
  imagePath!: File;
  imageUrl!: any;
  ngOnInit(): void {
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      let selectedFile = new ImageSnippet(event.target.result, file);
      this.imageService.uploadImage(selectedFile.file).subscribe(
        (response) => {
          this.prediction = response.prediction;
        },
        (err) => {
          console.log(err)
        })

    });
    this.imagePath = imageInput;
    reader.readAsDataURL(file);

    reader.onload = (_event) => {

      this.imageUrl = reader.result;
    }
  }

}

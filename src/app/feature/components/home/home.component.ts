import { Component, ElementRef, OnInit, ViewChild, Renderer2, Sanitizer, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// import { FileSaverService } from 'ngx-filesaver';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('imagePreviewLabelElm', { static: false }) imagePreviewLabelElm!: ElementRef<HTMLElement>;
  @ViewChild('previewImageElm', { static: false }) previewImageElm!: ElementRef<HTMLElement>;
  @ViewChild('imageDownloadElm', { static: false }) imageDownloadElm!: ElementRef<HTMLElement>;
  @ViewChild('canvasElm', { static: false }) canvasElm!: ElementRef;
  @ViewChild('downloadBtn', { static: false }) downloadBtn!: ElementRef<HTMLElement>;

  bgImages = [
    {
      url : '/assets/images/bg/boogle.png',
      x: 3565,
      y: 340,
      height: 1900,
      width: 1880
    },
    {
      url : '/assets/images/bg/degods.png',
      x: 2970,
      y: 270,
      height: 1566,
      width: 1560
    },
    {
      url : '/assets/images/bg/pesky-penguins.png',
      x: 2975,
      y: 275,
      height: 1576,
      width: 1570
    },
    {
      url : '/assets/images/bg/smb.png',
      x: 2985,
      y: 275,
      height: 1566,
      width: 1560
    },
    {
      url : '/assets/images/bg/solanauts.png',
      x: 2970,
      y: 270,
      height: 1566,
      width: 1580
    },
    {
      url : '/assets/images/bg/solsocks.png',
      x: 2968,
      y: 260,
      height: 1575,
      width: 1595
    },
    {
      url : '/assets/images/bg/thugbirdz.png',
      x: 2965,
      y: 225,
      height: 1586,
      width: 1640
    },
    {
      url :'/assets/images/bg/voxchainz.png',
      x: 2980,
      y: 275,
      height: 1566,
      width: 1560
    },
    {
      url : '/assets/images/bg/daa.png',
      x: 2972,
      y: 275,
      height: 1566,
      width: 1560
    },
    {
      url :  '/assets/images/bg/boneworld.png',
      x: 2895,
      y: 125,
      height: 1720,
      width: 1710
    }
  ];



  bgImageSrc = this.bgImages[0].url;
  bgSectionTheme = 0
  selectedFileUrl: any;
  canvas!: CanvasRenderingContext2D;
  downloadLink: any;
  imageFile: any;
  imageNumber: number =0;
  x = 0;
  y = 0;
  clearCanvas = false;
  showPreloader: boolean = false;


  constructor(
    private readonly domSanitizer: DomSanitizer,
    // private readonly _FileSaverService: FileSaverService,
    // private readonly _toastr: ToastrService,
    private readonly _renderer: Renderer2
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.changeBgImage(0);

  }


  changeBgImage(imageNumber: number) {


    var canvas: HTMLCanvasElement = this.canvasElm.nativeElement;
    var context = canvas.getContext('2d');
    context?.clearRect(0,0,canvas.width,canvas.height);
    context?.beginPath();
    this.bgImageSrc = this.bgImages[imageNumber].url;
    this.imageNumber = imageNumber;
    this.mergeImage();
  }

  chooseImageFile(file: any) {
    if (file && file.target.files.length > 0) {
      this.showPreloader = true;
      this.url = URL.createObjectURL(file.target.files[0]);
      this.selectedFileUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
      this.mergeImage();

    }
    else {
      // this._toastr.error('Please select your image first', 'Image Error', {
      //   timeOut: 3000,
      // })
      this.mergeImage();
    }
    this.mergeImages(file);
  }
  url ="";
  mergeImage()  {

    this.x = this.bgImages[this.imageNumber].x;
    this.y = this.bgImages[this.imageNumber].y;

    this.bgSectionTheme = this.imageNumber;

    // setTimeout(() => {

      // }, 2000);
        this.mergeImages(this.imageFile);

  }

  downloadImage() {
    // htmlToImage.toBlob(this.imageDownloadElm.nativeElement).then( (blob: any) => {
    //   console.log(blob)
    //   this._FileSaverService.save(blob, 'botborg-banner.jpg');
    // });
    // ************************************************************
    // this.downloadLink.click();
    this.showPreloader = true;

    setTimeout(() => {
      let image =  this.canvasElm.nativeElement.toDataURL('image/png', 1.0).replace("image/png", "image/octet-stream");
        let link = document.createElement('a');
        link.download = "my-image.png";
        link.href = image;
        link.click();
        setTimeout(() => {
          this.showPreloader = false;
        }, 3000);

    },500);




  }

  mergeImages(file: any) {

    if(file && file.target.files.length > 0){
      this.showPreloader = true;
    }
    this.imageFile = file;

    var canvas: HTMLCanvasElement = this.canvasElm.nativeElement;
    var context = canvas.getContext('2d');


    let bgImage: any;
    bgImage = new Image();
    let centerImage = new Image();
    if (file && file.target.files.length > 0) {

      let url = URL.createObjectURL(file.target.files[0]);
      bgImage.src = this.bgImageSrc;
      centerImage.src = url;

      bgImage.onload = () => {
        // context?.clearRect(0,0,context.canvas.width,context.canvas.height);
        canvas.width = bgImage.width;
        canvas.height = bgImage.height;

        context!.drawImage(bgImage, 0, 0);


        setTimeout(() => {
          context!.drawImage(centerImage,this.x, this.y, this.bgImages[this.imageNumber].height, this.bgImages[this.imageNumber].width);
          this.showPreloader = false;

        }, 1000);
      };
    }
  }


} // end of class



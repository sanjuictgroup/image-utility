import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { ImageCroppedEvent, Dimensions, ImageTransform, base64ToFile } from 'ngx-image-cropper';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'
import { Service } from "../services/service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css']
})

export class ImageCropperComponent implements OnInit {

    @ViewChild('file')
    fileVariable: ElementRef;

    @ViewChild("canvas") 
    canvas: ElementRef;

    private cx: CanvasRenderingContext2D;  

    scale = 1;
    rotation = 0;
    imgUrl: string;
    canvasRotation = 0;
    formatType = 'jpeg';
    formatMime = 'image/jpeg';
    showCropper = false;
    croppedImage: any = '';
    imageChangedEvent: any = '';
    transform: ImageTransform = {};
    containWithinAspectRatio  = false;

    public width;
    public height;
    colorLine = "#000000";
    imageStatusCropped = false;
    imageStatusCanvased = false;
    public locale: string = 'en';
    
    constructor(private activateRoute: ActivatedRoute, private router: Router, private service: Service) {
        this.locale = this.getNavigatorLanguage();  
    }

    ngOnInit(): void { }

    /** ---Image Manupulation Utils Start--- */

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        this.height = event.height;
        this.width  = event.width; 
        this.ngAfterViewInit()
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        this.imgUrl = this.croppedImage;
        this.height = event.height;
        this.width  = event.width; 
        this.ngAfterViewInit()
        console.log(event, base64ToFile(event.base64));
    }

    imageLoaded(image: HTMLImageElement) {
        console.log('Image loaded');
    }
    
    cropperReady(sourceImageDimensions: Dimensions) {
        console.log('Cropper ready', sourceImageDimensions);
    }

    loadImageFailed() {
        console.log('Load failed');
    }

    rotateLeft() {
        this.canvasRotation--;
        this.flipAfterRotate();
    } 

    rotateRight() {
        this.canvasRotation++;
        this.flipAfterRotate();
    }

    private flipAfterRotate() {
        const flippedH = this.transform.flipH;
        const flippedV = this.transform.flipV;
        this.transform = {
            ...this.transform,
            flipH: flippedV,
            flipV: flippedH
        };
    }

    flipHorizontal() {
        this.transform = {
            ...this.transform,
            flipH: !this.transform.flipH
        };
    }

    flipVertical() {
        this.transform = {
            ...this.transform,
            flipV: !this.transform.flipV
        };
    }

    resetImage() {
        this.scale = 1;
        this.rotation = 0;
        this.canvasRotation = 0;
        this.transform = {};
    }

    zoomOut() {
        this.scale -= .1;
        console.log(this.scale)
        
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    zoomIn() {
        this.scale += .1;
        console.log(this.scale)

        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    toggleContainWithinAspectRatio() {
        this.containWithinAspectRatio = !this.containWithinAspectRatio;
    }

    updateRotation() {
        this.transform = {
            ...this.transform,
            rotate: this.rotation
        };
    }

    /**
     * On radio select 
     * clear event & set image format
     */
    imageFormat(type, mime){
        this.imageChangedEvent = null;
        this.croppedImage = null;
        this.fileVariable.nativeElement.value = "";
        this.formatType = type;
        this.formatMime = mime;
    }

    /**
     * On download button click
     */
    downloadImg(){
        const dataURL = this.croppedImage;
        this.download(dataURL, '1.'+this.formatType);
    }

    /** Inable browser to download
     * @input { base64url, filename }
     */
    download(dataURL, filename) {​​​​​
        if (navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') === -1) {​​​​​
            window.open(dataURL);
        }​​​​​ else {​​​​​
            const blob = this.dataURLToBlob(dataURL);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        }​​​​​
    }​​​​
    
    /** Image base64 to Blob Image
     * @input base64url
     */
    dataURLToBlob(dataURL) {
        // Code taken from https://github.com/ebidel/filer.js
        const parts = dataURL.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const raw = window.atob(parts[1]);
        const rawLength = raw.length;
        const uInt8Array = new Uint8Array(rawLength);
        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], { type: contentType });
    }

    saveImageCropped(){

        const data = {
           'base64image': this.croppedImage,
           'mime': this.formatMime,
           'type': this.formatType
        }

        this.service.saveImageCropped(data).subscribe(result=>{
            this.imageStatusCropped = true;
        });
    }

    /** ---Image Manupulation Utils End--- */

    /** ---Image Marker Utils Start--- */

    private getNavigatorLanguage = () => (navigator.languages && navigator.languages.length) ? navigator.languages[0] : (navigator as any).userLanguage || navigator.language || (navigator as any).browserLanguage || 'en';

    public ngAfterViewInit() {
        
        const myCanvas = <HTMLCanvasElement> document.getElementById('mycanvas');
        this.cx = myCanvas.getContext('2d')!;

        let image = new Image();
    
        myCanvas.width = this.width;
        myCanvas.height = this.height;
       
        this.cx.lineWidth = 3;
        this.cx.lineCap = 'round';
        this.cx.strokeStyle = '#000';
        image.onload = ()=> {
            this.cx.drawImage(image, 0, 0, this.width, this.height);
        }

        image.src = this.croppedImage;
    
        this.captureEvents(myCanvas);
    }

    /** Circle Shapes Over Canvas 
     * TO DO
    */

    // public draw() {
    //     const myCanvas = <HTMLCanvasElement> document.getElementById('mycanvas');
    //     this.cx = myCanvas.getContext('2d')!;

    //     var bg = myCanvas.toDataURL("image/png");   
        
    //     var canvas = new fabric.Canvas('mycanvas');
    //     canvas.setBackgroundImage(bg,canvas.renderAll.bind(canvas));
        
    //     canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
      
    //     canvas.selectionColor = 'rgba(0,255,0,0.3)';
    //     canvas.selectionBorderColor = 'red';
    //     canvas.selectionLineWidth = 5;
    //     this.__canvases.push(canvas);
    // } 

    /** Canvas Events Main */
    private captureEvents(canvasEl: HTMLCanvasElement) {
        // this will capture all mousedown events from the canvas element
        fromEvent(canvasEl, 'mousedown')
          .pipe(
            switchMap((e) => {
              // after a mouse down, we'll record all mouse moves
              return fromEvent(canvasEl, 'mousemove')
                .pipe(
                  // we'll stop (and unsubscribe) once the user releases the mouse
                  // this will trigger a 'mouseup' event    
                  takeUntil(fromEvent(canvasEl, 'mouseup')),
                  // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
                  takeUntil(fromEvent(canvasEl, 'mouseleave')),
                  // pairwise lets us get the previous value to draw a line from
                  // the previous point to the current point    
                  pairwise()
                )
            })
          )
          .subscribe((res: [MouseEvent, MouseEvent]) => {
            const rect = canvasEl.getBoundingClientRect();
      
            // previous and current position with the offset
            const prevPos = {
              x: res[0].clientX - rect.left,
              y: res[0].clientY - rect.top
            };
      
            const currentPos = {
              x: res[1].clientX - rect.left,
              y: res[1].clientY - rect.top
            };
      
            // this method we'll implement soon to do the actual drawing
            this.drawOnCanvas(prevPos, currentPos);
          });
    }

    /** Canvas Pencil Colors */
    public red(){
      this.colorLine = "#FF3633";
    }

    public black(){
      this.colorLine = "#000000";
    }

    public white(){
      this.colorLine = "#ffffff";
    }

    public blue(){
      this.colorLine = "#112AFA";
    }

    public yellow(){
      this.colorLine = "#FAE800";
    }

    /** Pencil over Canvas */
    private drawOnCanvas(
        prevPos: { x: number, y: number }, 
        currentPos: { x: number, y: number }
    )  {
            // incase the context is not set
            if (!this.cx) { return; }
        
            // start our drawing path
            this.cx.beginPath();
        
            // we're drawing lines so we need a previous position
            if (prevPos) {
                // sets the start point
                this.cx.moveTo(prevPos.x, prevPos.y); // from
            
                // draws a line from the start pos until the current position
                this.cx.lineTo(currentPos.x, currentPos.y);

                this.cx.strokeStyle = this.colorLine;
            
                // strokes the current path with the styles we set earlier
                this.cx.stroke();
            }
    }

    /** Download Button in Marker canvas */
    downloadImgCanvas(){
        const myCanvas = <HTMLCanvasElement> document.getElementById('mycanvas');
        this.cx = myCanvas.getContext('2d')!;
        var dataURL = myCanvas.toDataURL(this.formatMime);
        this.download(dataURL, '1.'+this.formatType);
    }
    
    /** Save Image Button Marked Image */
    saveImageCanvased(){

        const myCanvas = <HTMLCanvasElement> document.getElementById('mycanvas');
        this.cx = myCanvas.getContext('2d')!;
        var dataURL = myCanvas.toDataURL(this.formatMime);

        const data = {
            'base64image': dataURL,
            'mime': this.formatMime,
            'type': this.formatType
         }

        this.service.saveImageAfterCanvas(data).subscribe(result=>{
            this.imageStatusCanvased = true;
        });
    }

    /** Clear canvas and load image again over canvas */
    public clearCanvas(){
        const myCanvas = <HTMLCanvasElement> document.getElementById('mycanvas');
        this.cx = myCanvas.getContext('2d')!;
        this.cx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        this.ngAfterViewInit();
    }
    
    /** ---Image Canvas Marker Utils End--- */
}

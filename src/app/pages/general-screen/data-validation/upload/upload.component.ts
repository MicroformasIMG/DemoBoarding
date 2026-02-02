import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService, DataService, FormService } from '@services';
import { Subscription } from 'rxjs';
import { Image,File, successFile } from '@interfaces';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public img !: string | ArrayBuffer| null;
  public isUpload !: boolean;
  public isError !: boolean;
  public isErrorUpload !: boolean;
  public existFile !: boolean;
  public name !: string;
  public sizeError : boolean = false;
  private subscription = new Subscription();

  private validTypes : string [] = ["jpg","jpeg","png","pdf"];

  @Input() onlyPdf !: boolean;
  /**This emittter allows pass the base 64 img to parent component (data-validation)*/
  @Input() lastSelect !: string;
  @Input() fileType !: number;
  @Output() success =  new EventEmitter<successFile>();
  @Output() reset = new EventEmitter<boolean>();
  @Input() componentName: string = "default";
  @Input() fileOtro !: boolean;
  /**
   * 
   * @param formService 
   */
  constructor(private formService : FormService, private dataService: DataService,  private authService : AuthService) { }

  ngOnInit(): void {
    this.existFile = false;
    this.isUpload = false;
    this.isErrorUpload = false;
  }


  /**
   * This function recovers the uploaded file, analyzes the type and generates the image in base 64 
   * 
   * @param event event of type change
   */
  public captureFile(event: Event) {
    
    const type = this.getFileType(event);
    const size = this.getSize(event);
    this.isUpload = true;
    /**If is other bank only checks pdf */
    if (this.onlyPdf) {

      if (type === 'pdf') {

        if (size <= 5) {

          /**This part transform file to base64 */
          this.extractBase64(event).then((r: { base: string | ArrayBuffer | null }) => {

            this.img = r.base!.toString();
            /**constructs the information that will be passed through the output emitter */
            let img: Image = {
              name: this.name,
              base64: this.img.split(',')[1]
            };

            //this.onBase64Image.emit(img);
            this.isUpload = false;

          });

          this.isError = false;

        }

        else{
          this.sizeError = true;
        }
        
      }

      else {

        this.isError = true;
        this.isUpload = false;
        this.existFile = false;
      }
    }

    else {

      if (this.validTypes.includes(type)) {

        if (size <= 5) {
          /**This part transform file to base64 */
          this.extractBase64(event).then((r: { base: string | ArrayBuffer | null }) => {

            this.img = r.base!.toString();
            /**constructs the information that will be passed through the output emitter */
            let img: Image = {
              name: this.name,
              base64: this.img.split(',')[1]
            };

            const {folio} = this.authService.user;
            let fol = folio!;
            let file : File  = {} as File;
          
            switch(this.lastSelect){

              //INE
              case "0": 

              if(this.fileType === 0){

                file = {

                  filename : this.name,
                  content :  this.img.split(',')[1],
                  type : "ine",
                  folio : fol
                }
              }
              else{

                file = {

                  filename : this.name,
                  content :  this.img.split(',')[1],
                  type : "ineReverso",
                  folio : fol
                }

              }

              break;
              //pasaport
              case "1":
                if(this.fileType === 0){

                  file = {
  
                    filename : this.name,
                    content :  this.img.split(',')[1],
                    type : "pasaporte",
                    folio : fol
                  }
                }
               
              break;
              //CEDULA
              case "2":

                if(this.fileType === 0){

                  file = {
  
                    filename : this.name,
                    content :  this.img.split(',')[1],
                    type : "cedulaProfesional",
                    folio : fol
                  }
                }
                else{

                  file = {
  
                    filename : this.name,
                    content :  this.img.split(',')[1],
                    type : "cedulaProfesionalReverso",
                    folio : fol
                  }

                }


              break;
              //cartilla
              case "3": 

              if(this.fileType === 0){

                file = {

                  filename : this.name,
                  content :  this.img.split(',')[1],
                  type : "cartillaMilitar",
                  folio : fol
                }
              }

              break;
              //estadocuenta
              case "4":

                if(this.fileType === 0){

                  file = {
  
                    filename : this.name,
                    content :  this.img.split(',')[1],
                    type : "estadoCuenta",
                    folio : fol
                  }
                }
              
              break;
              //acta
              case "5":

                if(this.fileType === 0){

                  file = {
  
                    filename : this.name,
                    content :  this.img.split(',')[1],
                    type : "actaConstitutiva",
                    folio : fol
                  }
                }
              
              break;

              case "6":

                if(this.fileType === 0){

                  file = {
  
                    filename : this.name,
                    content :  this.img.split(',')[1],
                    type : "cedulaFiscal",
                    folio : fol
                  }
                }
              
              break;
              case "7":

                if(this.fileType === 0){

                  file = {
  
                    filename : "fotosDomicilio",
                    content :  this.img.split(',')[1],
                    type : "fotosDomicilio",
                    folio : fol
                  }
                }
              
              break;
            }

        
            this.subscription.add(
              
              this.dataService.uploadFile(file).subscribe(
                
                
                { next : res => {

                  if(res !== 200){
                    this.isUpload = false;
                    this.isErrorUpload = true;
                    this.existFile = false;
  
                    this.success.emit({
                      lastSelect : this.lastSelect,
                      fileType : this.fileType
                    });
  
                  }
  
                  else{
  
                    this.success.emit({
                      lastSelect : this.lastSelect,
                      fileType : this.fileType
                    });
                    
                    this.isUpload = false;
                    this.existFile = true;
                    this.isErrorUpload = false;
                   
                  }
  
                },
                error: (err) => {

                  this.isUpload = false;
                  this.isErrorUpload = true;
                  this.existFile = false;

                  this.success.emit({
                    lastSelect: this.lastSelect,
                    fileType: this.fileType
                  });
                 

                }
              })
               
            );

          });
        }

        else{
          this.sizeError = true;
        }

      }
      /** if Error courred, actives flag of error upload */
      else {
        this.isError = true;
        this.isUpload = false;
    
      }
  }
  }
  /**
   * Extract file from input, and check his type
   * 
   * @param event event of type change
   * @returns string of image type
   */ 
  public getFileType(event : Event):string{

    const input = event.target as HTMLInputElement;
    this.name = input.files?.item(0)?.name!;
    const type = input.files?.item(0)?.type.split('/')[1]!;
   
    return type;
  }

  public getSize(event: Event): number {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const auxSize = Number(input.files[0].size);
      //const size = auxSize / 1048576; // Convert bytes to megabytes
      const size = input.files[0].size / 1024 ** 2;
      
      return size;
    }
    return 0; // Return 0 if no file is selected
  }
  
  

  /**
   * Builds base64 of image
   * 
   * @param event event of type change
   * @returns Promise that resolves object, it contains base64 result
   */
  public async extractBase64(event: Event):Promise<{base : string|ArrayBuffer|null}>{
    return new Promise((resolve, reject) => {

      const data = event.target as HTMLInputElement;
      const reader = new FileReader();
      reader.readAsDataURL(data.files?.item(0)!);

      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };

      reader.onerror = error => {
        reject(error);
      };

    });
  }

  /**Resets value of img*/
  public reUpload():void{
    if(this.sizeError){
      this.reset.emit(false);
      this.sizeError = false;
    }
    else{

      this.img = "";
      this.reset.emit(true);
      this.existFile = false
    }
    
  }

  public removeError():void{
    this.sizeError = false;
  }

}


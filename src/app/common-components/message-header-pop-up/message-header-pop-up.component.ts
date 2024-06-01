import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, mergeMap, pipe, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderService } from 'src/app/services/header.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-message-header-pop-up',
  templateUrl: './message-header-pop-up.component.html',
  styleUrls: ['./message-header-pop-up.component.scss']
})
export class MessageHeaderPopUpComponent implements OnInit,OnDestroy,OnChanges{
  @Input() searchText: string;
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  @ViewChild('selectedOption') selectedOption: ElementRef;
  allChatNumbers: any;
  chatHistory: any[] = [];
  selectedClient: any;
  textMessage: string;
  messageForm: FormGroup;
  chatUser: any = {};
  userInfo:any;
  tokenInfo: any;
  selectedTab: string;
  private destroy$ = new Subject<void>();
  startRow: number;
  searchChatData: any;
  todayDate = new Date();

constructor(
  private sideNavService:SidenavService,
  private headerService: HeaderService,
  private authService:AuthService,
  private fb: FormBuilder,
  private datePipe: DatePipe
  ){}


  ngOnInit(): void {
    this.userInfo =  this.authService.userInfo$.value.data.userInfoDto;
    this.tokenInfo =  this.authService.userInfo$.value.data.tokens;
    this.messageForm = this.fb.group({
      textMessage : [null,Validators.required],
    })
    this.headerService.clearSelection$.subscribe({
      next: (res:any)=>{
        if(res==true){
          this.chatUser = {};
          this.selectedClient = null;
          this.chatHistory = null;
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getChatAll(false);
  }

  getChatAll(isScroll: boolean = false,isMember: boolean = false){
      if (isScroll) {
        this.startRow += 1;
      } else {
        this.startRow = 1;
      }
    const payload = {
      endRow : 20,
      isMember : isMember,
      searchText :  this.searchText ?? "",
      startRow :  this.startRow,
    }
    this.headerService.GetChatAll(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) =>{
        if (!isScroll){
          this.allChatNumbers = res.data.items;
        }else{
          this.allChatNumbers.push(...res.data.items)
        }
        if(this.searchText){
          this.GetChatHistory(this.allChatNumbers[0]);
        }
      }
    })
  }

  getShortName(fullName) {

    return fullName.split(' ').map(n => n[0]).join('');
  }


  close(): void {
    this.sideNavService.close();
    this.headerService.clearSelection$.next(true);
  }

  GetChatHistory(item){
    this.chatUser.memberId = item?.memberId;
    this.chatUser.phoneNumber = item?.phoneNumber;
    const payload = {
      chatUserId : item?.chatContactMemberId,
      phone : item?.phoneNumber
    }
    this.headerService.GetChatHistory(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.chatHistory = res.data;
        this.chatHistory.forEach((ele)=>{
         const messageCreateOn = this.datePipe.transform(ele.messageCreateOn, 'dd/MM/yyyy');
         const todayDate = this.datePipe.transform(this.todayDate, 'dd/MM/yyyy');
         if(messageCreateOn == todayDate){
          ele.messageCreateOn = this.datePipe.transform(ele.messageCreateOn, ' hh:mm a');
         }else{
          ele.messageCreateOn = this.datePipe.transform(ele.messageCreateOn, 'dd/MM/yyyy hh:mm a');
         }
        })
        this.selectedClient = item
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);
      }
    })
  }

  addChat(){
    const textMessageValue = this.messageForm.controls['textMessage'].value;
    if (this.messageForm.valid && textMessageValue && textMessageValue.trim() !== ''){
    const payload = {
      chatContactMemberId: this.selectedClient.chatContactMemberId,
      createdBy: this.tokenInfo.userID.toString(),
      isMember: true,
      phoneNumber: this.selectedClient.phoneNumber,
      textMessage: this.messageForm.controls['textMessage'].value
    }
    this.headerService.addchat(payload).pipe(mergeMap((response)=>{
      const payload = {
        chatUserId : this.selectedClient.chatContactMemberId,
        phone : this.selectedClient.phoneNumber
      }
     return this.headerService.GetChatHistory(payload).pipe(takeUntil(this.destroy$))
    })
    ).subscribe({
      next: (res: any) => {
        this.chatHistory = res.data;
        this.chatHistory.forEach((ele)=>{
          const messageCreateOn = this.datePipe.transform(ele.messageCreateOn, 'dd/MM/yyyy');
          const todayDate = this.datePipe.transform(this.todayDate, 'dd/MM/yyyy');
          if(messageCreateOn == todayDate){
           ele.messageCreateOn = this.datePipe.transform(ele.messageCreateOn, ' hh:mm a');
          }else{
           ele.messageCreateOn = this.datePipe.transform(ele.messageCreateOn, 'dd/MM/yyyy hh:mm a');
          }
         })
        this.selectedClient = this.selectedClient;
        this.messageForm.get('textMessage').setValue(null);
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);
      }
    })
   }
  }
  searchAllChat(item){
    if (item.value.trim() === '') {
      return;
    }
    const payload ={
     searchText: item.value.trim(),
     IsFromChat: true,
     IsOnlyMember: false,
    }
    this.headerService.searchContacts(payload).pipe(takeUntil(this.destroy$)).subscribe({
     next:(res:any)=>{
      this.searchChatData = res.data
     }
    })
   }

   onSelectSelection(option){
      this.searchText = option.phone1
      this.getChatAll(false);
      this.selectedOption.nativeElement.value = '';
      this.searchChatData = null;
   }
   getActiveTabs(tab: string){
    this.allChatNumbers=null;
    this.chatHistory = null;
    this.selectedClient = null;
    this.chatUser = {};
    if(tab == 'allTab'){
      this.getChatAll(false)
    }else if(tab == 'groupTab'){

    }else if(tab == 'memberTab'){
      this.getChatAll(false,true)
    }
   }

   scrollToBottom() {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }
}

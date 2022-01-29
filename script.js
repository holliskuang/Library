//get forms
const table=document.querySelector('#table');
const form=document.querySelector('form');
const bookList=document.querySelector('#table-body');
const deleteAll=document.querySelector('#but')
const booksRead=document.querySelector('#read');
const booksUnread=document.querySelector('#unread');
const booksTotal=document.querySelector('#total')
const hollis=document.querySelector('#name');
hollis.textContent=('Hollis Kuang ' + '© '+ `${new Date().getFullYear()}`)
let myLibrary = [];
//Object Constructor
class Book{
  constructor(title,author,pages,read) {
  this.title =title;
  this.author=author;
  this.pages=pages;
  this.read=read;
}
}
// push book to library
function addBookToLibrary(book) {
  myLibrary.push(book)
}

//Check if into is correct,
// push form data into array using Book constructor and push function 
const getinfo = (e)=> {
  e.preventDefault();
  title=document.getElementById('form1').value;
  author=document.getElementById('form2').value;
  pages=document.getElementById('form3').value;
  read=document.getElementById('checkbox').checked;
  //form check
  if(formChecker(title,author,pages,read)==false){
   return;
  }
  let book= new Book(title,author,pages,read)
  addBookToLibrary(book);
  showLibrary(read);
  document.querySelector('form').reset();
}
//Show from Library
function showLibrary(){
bookList.textContent=''
 //counter for books read/not read
let counter=0;
for (i=0; i<myLibrary.length;i++){
  //new row
  const bookRow= document.createElement('tr');
  bookList.append(bookRow);
  //book title
  const newTitle=document.createElement('td');
  newTitle.textContent=myLibrary[i].title;
  bookRow.append(newTitle);
  //book author
  const newAuthor=document.createElement('td');
  newAuthor.textContent=myLibrary[i].author;
  bookRow.append(newAuthor);
  //book pages
  const newPages=document.createElement('td');
  newPages.textContent=myLibrary[i].pages;
  bookRow.append(newPages);
  // Read?
const newRead=document.createElement('td');
const readIcon=document.createElement('i');
 if (myLibrary[i].read===true){
   readIcon.classList.add('fas', 'fa-check', 'fa-lg');
   counter++;
   //read switch ability
   newRead.addEventListener('click',function(e){
     let rowRead= this.parentNode.rowIndex-1;
     myLibrary[rowRead].read=false;
     showLibrary();
   })
  } else {
    readIcon.classList.add('fas', 'fa-times', 'fa-lg');
    newRead.addEventListener('click',function(e){
      let rowRead= this.parentNode.rowIndex-1;
      myLibrary[rowRead].read=true;
      showLibrary();
    })
    
  }
  newRead.append(readIcon);
  bookRow.append(newRead);
  //trash
 let trash=document.createElement('td');
 let trashIcon=document.createElement('i');
  trashIcon.classList.add('far', 'fa-trash-alt' , 'fa-lg') 
  trash.addEventListener('click',function(e){
    let rowTrash=this.parentNode.rowIndex-1;
    myLibrary.splice(rowTrash,1);
    showLibrary();
  })
  trash.append(trashIcon);
  bookRow.append(trash);
  booksTotal.textContent='Total Books: ' +`${myLibrary.length}`;
  booksRead.textContent='Books Read: '+ `${counter}`;
  booksUnread.textContent='Books Unread: ' + `${myLibrary.length-counter}`
}
if(myLibrary.length===0){
  booksTotal.textContent='Total Books: ' +`${myLibrary.length}`;
  booksRead.textContent='Books Read: '+ `${counter}`;
  booksUnread.textContent='Books Unread: ' + `${myLibrary.length-counter}`
}
}
//delete all
deleteAll.addEventListener('click',function(e){
  myLibrary=[];
  showLibrary();
})

//form checker function
function formChecker(title,author,pages,read){
  if (title===''){
    window.alert('Please fill out the form');
    return false;
  }
  
    if (author===''){
    window.alert('Please fill out the form');
    return false;
  }
    if ((!(pages>=0)) || pages===''){
    window.alert('Please fill out a positive number');
    return false;
  }
  else 
    {return true};
}

//add name

//Add book to Library
form.addEventListener('submit', getinfo);

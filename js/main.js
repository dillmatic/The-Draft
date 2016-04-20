//Velocity/Jquery animations

$('nav').velocity("transition.slideDownIn",{duration:2000});


$(document).ready(function(){
    $('[data-toggle="popover"]').popover(); 
});


//BACKEND OPERATIONS

//asynchronously creating the database

var create = new XMLHttpRequest();
create.open('GET', 'create.php');
create.send();

//asynchronously reading from the database
var read = new XMLHttpRequest();
read.open('GET', 'read.php');
read.send();

//textarea variables
var textarea = document.querySelector('textarea');
var charCount = document.querySelector('#textareaFeedback')


//story variables
var story = document.querySelector('.story');
var storyContent = document.querySelector('.storyContent');



//buttons
var saveButton = document.querySelector('#save');
var dump =  document.querySelector('#dump');
var backButton = document.querySelector('#back');
var nextButton = document.querySelector('#next');


//Getting the character count to work
//setting maximum character count value    
var text_max = 250;

//create the max character text element and add inner text

charCount.innerHTML = text_max + " characters remaining";

//function to decrement the text_max counter on keydown
textarea.addEventListener('keydown', function(){
    var text_length = textarea.value.length;
    var text_remaining = text_max - text_length;
    charCount.innerHTML=text_remaining + " characters left";
})

//disable special characters in textarea and enter functionality
disableSpecialCharacters(textarea);

function disableSpecialCharacters(el){

    el.addEventListener('keydown',  function(e){
       if (e.keyCode == 13|| 
            (e.keyCode == 50 && e.shiftKey) || 
            e.keyCode == 51 && e.shiftKey || 
            e.keyCode == 53 && e.shiftKey || 
            e.keyCode == 54 && e.shiftKey || 
            e.keyCode == 56 && e.shiftKey || 
            e.keyCode == 187 ||
            e.keyCode == 188 && e.shiftKey || 
            e.keyCode == 189 || 
            e.keyCode == 190 && e.shiftKey || 
            e.keyCode == 191 && !e.shiftKey ||
            e.keyCode == 192 ||  
            e.keyCode == 219 || 
            e.keyCode == 220 || 
            e.keyCode == 221
           ){
            e.preventDefault();
        }
    });
}




// set up a event listner to check for status changes
read.onreadystatechange = function(){
    // if everything worked out, then..
    if (read.readyState == 4 && read.status == 200) {
        
        processText(read.responseText);

        }

    }


// this function will
// process the response from read.php
// and create list items for each paragraph
function processText(txt) {
    
    // turn the text into an object
    var obj = JSON.parse(txt);
    // only if success
    if (obj.message = 'success') {
        
        // extract the 'data' from it
        var data = obj.data;
        console.log(data);

        // iterate over all the data to create list items
        for (var i = 0; i < data.length; i++) {

            if(data[i] == data[0]){
                console.log("hi from maketitle!")
                makeTitle(data[i]);
                

            } else {
            console.log("hi from making paragraph!");
            makeParagraph(data[i])
            }

        }
        
    }
}

//making a new page


function makeNewPage(){
    console.log("making a page");
    
    var div = document.createElement('div');    div.setAttribute('class','storyContent active');
    div.style.position = 'absolute';
    div.style.height = story.clientHeight;
    story.appendChild(div);
    
    console.log(div);
    console.log(div.previousElementSibling);
    
   var prevPage = div.previousElementSibling;
    
    if(prevPage){
        prevPage.className = "storyContent";
    } else{
        return;
    }
    
    
    
}



//Adding a title/chapter

function makeTitle(data){
    var title = document.createElement( 'h1');
    title.className = 'sent';
    title.textContent = data.sent;
    title.setAttribute('data-id',data.id);
    title.setAttribute('contenteditable',true);

//if the story contents height is bigger than the pages width
//make a new div that acts as a new page and add the title there
    
    storyContent.appendChild(title);

    title.addEventListener('keydown', function(e) {
        if (e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();       
            

            var id = e.target.dataset.id;
            var idEncode = encodeURIComponent(id);

            var content = e.target.textContent.trim();
            var contentEncode = encodeURIComponent(content);

        if (content == "") {

            var id = e.target.dataset.id;
            var idEncode = encodeURIComponent(id);

            var content = e.target.textContent.trim();
            var contentEncode = encodeURIComponent(content);

            var data = "id=" + id;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'delete.php')

            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.send(data);

            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
            }

        } else {

            var data = "id=" + idEncode + "&text=" + contentEncode;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'update.php');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(data);
            return
            }
        }

    });
};

function makeParagraph(data){

// create a new paragraph item
    var p = document.createElement('p');
    // add a class
    p.className = 'sent';
    // add text to it
    p.textContent = data.sent;
    // add id to it
    p.setAttribute('data-id', data.id);
    // make the content editable
    p.setAttribute('contenteditable', true);
    
    //disabling special characters
    disableSpecialCharacters(p);
    
    //adding paragraph to the stage
    storyContent.appendChild(p);
    
    
    //checking if the paragraph is visible
    
    console.log(p.isVisible(p));

        if(p.isVisible(p) == false){

    //move it to a new page

            var lastPara = storyContent.lastChild;
    //        console.log(lastPara);

            makeNewPage();

            var pages= document.querySelectorAll('.storyContent');

            var lastPage = pages[pages.length - 1];

            lastPage.appendChild(lastPara);

            //change the page that new paragraphs will be appended to

            storyContent = lastPage;

        }
    
    
    p.addEventListener('keydown', function (e) {
        if (e.keyCode == 13 && !e.shiftKey) e.preventDefault();
        
        var id = e.target.dataset.id;
        var idEncode = encodeURIComponent(id);

        var content = e.target.textContent.trim();
        var contentEncode = encodeURIComponent(content);

        if (content == "") {

            var data = "id=" + id;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'delete.php')

            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.send(data);

            } else {
                var data = "id=" + idEncode + "&text=" + content;
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'update.php');
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.send(data);
                return
            }
    });


    }

//button functions
 
                
//save
saveButton.addEventListener('click', function() {
    
    //gathering and trimming the user's input

    var sentence = textarea.value.trim();


    //if the user inputted nothing
    
    if (sentence == "") {
        
        return

    } else {
        
    //if the user typed something add it to the database
        
        var uriSentence = encodeURIComponent(sentence);
        var data = "&text=" + uriSentence;

        var newPost = new XMLHttpRequest();
        newPost.open('POST', 'new.php');

    // set the header type
        newPost.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');    
        newPost.send(data);

        newPost.onreadystatechange = function(){
        
        if(newPost.readyState==4 && newPost.status==200){
            
            // Getting the new entry and appending it to the story div
            var post = new XMLHttpRequest();
            post.open('GET', 'getlast.php');
            post.send();

            post.onreadystatechange = function () {

                // if everything worked out, then..

                if (post.readyState == 4 && post.status == 200) {

//                    console.log(post.responseText);
                    console.log("posting to the story div!");

                getLastField(post.responseText);

                //clear the textarea afterwards  

                textarea.value="";

                return

                }
        
            }  
        }
    } 

}   

});

function getLastField(data) {

//grab the data from post.php
    
    var obj = JSON.parse(data);
    console.log(obj);

//only if success
    if (obj.message = 'success') {

    //extract the 'data' from it
        var data = obj.data;

        console.log(data)

        if(data.length == 1){
            console.log("making a title");
            makeTitle(data[0]);
            return
            
            
        } else if(data.length > 1){
            console.log("making para")
            makeParagraph(data[0]);
            return
            

        }
    }
}
//delete


dump.addEventListener("click",function(){
    
var story = document.querySelectorAll('.sent');


    for (var i=0;i<story.length;i++){
        var storyId = story[i].dataset.id;
        var storyIdEncode = encodeURIComponent(storyId);
        var data = "id="+storyIdEncode;

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'delete.php')
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);

        story[i].remove();

    };
});    


//previous page
backButton.addEventListener('click',prevPage);

function prevPage(){
    var activePage = document.querySelector('.active');
    
        var prevPage;
    prevPage= activePage.previousElementSibling;
    
    
    if(prevPage){
            activePage.className = "storyContent";
           prevPage.className ="storyContent active";
    } else if (prevPage == null) {
     console.log("nothing");
        
    }
    
}

//next page

nextButton.addEventListener('click',nextPage);

function nextPage(){
    var activePage = document.querySelector('.active');
    
        var nextPage;
    nextPage= activePage.nextElementSibling;
    
    
    if(nextPage){
            activePage.className = "storyContent";
           nextPage.className ="storyContent active";
    } else if (prevPage == null) {
     console.log("nothing");
        
    }    
    
}
/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/**
 * Define all global variables here.  
 */
var cocktail_array = [];
var editClicked = false;
var saveDel = false;
/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */
/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
      addClickHandlersToElements();
      loadCocktails();
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){
      $(".addBtn").click(handleAddClicked);
      $(".cancelBtn").click(handleCancelClick); 
      $(document).keypress(function(e) {
            if(!editClicked){
                  if(e.which == 13) {
                        handleAddClicked();
                  }
            }
        });
      $('.form-control').on('input', highlightTextInput);
      $('.student-list-container').on('click', removeErrorMessages);
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return:  none
 */
function handleAddClicked(event){
      validateCocktail();
}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){ 
      clearAddCocktailFormInputs();
      removeErrorMessages();
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addCocktail(){
      $('.addBtn').attr('disabled', true);
      var cocktail_object = {};
      var cocktailName = $('#cocktailName').val();
      var cocktailLocation = $('#location').val();
      var cocktailRating = $('#rating').val();

      cocktail_object.name = cocktailName;
      cocktail_object.location = cocktailLocation;
      cocktail_object.rating = cocktailRating;

      cocktail_array.push(cocktail_object);
      $('.data').empty();
      // clearAddCocktailFormInputs();
      addCocktailToServer(cocktail_object);
      updateCocktailList(cocktail_array);      
      // removeErrorMessages();
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddCocktailFormInputs(){
      $('input[name=cocktailName]').val("");
      $('input[name=location]').val("");
      $('input[name=rating]').val("");
}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderCocktailOnDom(cocktailObj){
      var tabBody = $('tbody');
      var row = $('<tr>');
      tabBody.append(row);

      const id = cocktailObj.id;
      let name = cocktailObj.name;
      let location = cocktailObj.location;
      let rating = cocktailObj.rating;

      var drinkName = $('<td>', {
            text: name,
            class: 'col-xs-3'
      });

      var drinkCourse = $('<td>', {
            text: location,
            class: 'col-xs-3'
      });

      var drinkRating = $('<td>', {
            text: rating,
            class: 'col-xs-3'
      });
      
      // var studName = $('<td>').text(studentObj.name);
      // var studCourse = $('<td>').text(studentObj.course_name);
      // var studGrade = $('<td>').text(studentObj.grade);
      var tblDat = $('<td>');

      var delBtn = $('<button>', {
            type: 'button',
            class: 'btn btn-danger',
            text: 'Delete',
            on: {
                  click: addErrorConfirmationBar
            }
      });

      var editBtn = $('<button>', {
            type: 'button',
            class: 'btn btn-info',
            text: 'Edit',
            on: {
                  click: editMode
            }
      });

      var saveBtn = $("<button>", {
            type: 'button',
            class: 'btn btn-success',
            text: 'Save'
      });

      var canBtn = $("<button>", {
            type: 'button',
            class: 'btn btn-default',
            text: 'Cancel'
      });

      var nameInput = $('<input />', {
            'type': 'text',
            'class': 'tableInput',
            'value': name,
            size: 12
      });

      var locationInput = $('<input />', {
            'type': 'text',
            'class': 'tableInput',
            'value': location,
            size: 12
      });

      var ratingInput = $('<input />', {
            'type': 'number',
            'class': 'tableInput',
            'value': rating,
            'style': "width: 3em",
            'min': 0,
            'max': 10
      });

      var confirmationRow = $('<tr>');

      var message = $('<td>', {
            text: 'Are you sure?',
            class: "text-right",
            'colspan': 2,
      }); 

      var emptyData = $('<td>');

      var confirmationBtn = $('<td>');
      
      var noBtn = $('<button>', {
            type: 'button',
            text: 'No',
            class: 'btn btn-info'
      });

      var yesBtn = $('<button>', {
            type: 'button', 
            text: 'Yes',
            class: 'btn btn-warning'
      });

      addMobileIcons();
      $(window).resize(addMobileIcons);

      var tableBtns = tblDat.append(delBtn, editBtn); 
      row.append(drinkName, drinkCourse, drinkRating, tableBtns);
      // updateBtn.click(updateAndPopulate);
      // delBtn.click(function(){
      //       $(this).closest('tr').remove();
      //       // var deleted = student_array.splice(studentObj), 1);
      //       var deletedStudent = studentObj;
      //       removeStudentFromServer(deletedStudent);
      // });

      function editMode(){
            if(editClicked || saveDel){
                  return;
            }
            if($(window).width()<475){
                  saveBtn.html('<i class="far fa-save"></i>');
                  canBtn.html('<i class="fas fa-window-close"></i>');
            }else{
                  saveBtn.html('Save');
            }

            editClicked = true;
            $(drinkName).text('');
            $(drinkCourse).text('');
            $(drinkRating).text('');

            $(nameInput).val(name);
            $(locationInput).val(location);
            $(ratingInput).val(rating);

            $(drinkName).append(nameInput);
            $(drinkCourse).append(locationInput);
            $(drinkRating).append(ratingInput);

            $(editBtn).replaceWith(saveBtn);
            $(delBtn).replaceWith(canBtn);

            $(saveBtn).on('click', updateCocktail);

            $(row).addClass('bg-warning');

            $(document).on('click', function(e) {
                  if(!$(e.target).is($(editBtn))
                  &&!$(e.target).is($(saveBtn))
                  &&!$(e.target).is($(nameInput))
                  &&!$(e.target).is($(locationInput))
                  &&!$(e.target).is($(ratingInput))
                  &&!$(e.target).is('i.fas.fa-edit')
            ) {
                        exitEditMode.call(this)
                  }
                }.bind(this));

            $(document).keypress(function(e) {
                  if(e.which == 13) {
                        updateCocktail();
                  }
            });
      }

      function updateCocktail(){
            var updateList = {
                  url: 'data.php',
                  method: 'GET',
                  data: {
                        'action': 'update',
                        'id': id,
                        'name': $(nameInput).val(),
                        'location': $(locationInput).val(),
                        'rating': $(ratingInput).val()
                  },
                  success: function(response){
                        if(response.success){
                              name = $(nameInput).val();
                              location = $(locationInput).val();
                              rating = parseFloat($(ratingInput).val()); 
                        }
                        saveDel = false;
                        exitEditMode();
                  },
                  failure: function(err) {
                        saveDel = false;
                        exitEditMode();
                  },
                  dataType: 'json',
            };
            saveDel = true;
            $.ajax(updateList)
      }

      function exitEditMode(){
            if(!editClicked){
                  return
            }
            $(document).off('click');

            $(editBtn).on('click', editMode);
            $(delBtn).on('click', addErrorConfirmationBar);

            $(drinkName).text(name);
            $(drinkCourse).text(location);
            $(drinkRating).text(rating);

            $(saveBtn).remove();
            $(canBtn).replaceWith(delBtn);
            $(tableBtns).append(editBtn);
            $(row).removeClass('bg-warning');

            for(let i=0; i<cocktail_array.length; i++){
                  if(cocktail_array[i].id === id){
                        cocktail_array[i].name = name;
                        cocktail_array[i].location = location;
                        cocktail_array[i].rating = rating;
                  }
            }
            var average = calculateRatingAverage(cocktail_array);
            renderRatingAverage(average);
            editClicked = false;
      }

      function addErrorConfirmationBar(){
            if(editClicked || saveDel){
                  return;
            }
            //Adds event handlers to yes and no buttons
            editClicked = true;
            noBtn.click(exitDeleteMode);
            yesBtn.click(function(){
                  removeCocktailFromServer(id, row);
                  exitDeleteMode();
            });

            //Color the student row
            row.addClass('bg-danger');

            //Adds an event handler so user can click outside dom area to exit delete mode
            $(document).on('click', function(e){
                  if(!$(e.target).is($(noBtn))
                  &&!$(e.target).is($(yesBtn))
                  &&!$(e.target).is($(delBtn))
                  &&!$(e.target).is('i.fas.fa-trash-alt')
                  ){
                        exitDeleteMode.call(this);
                  }
            }.bind(this));

            //Turn off delete button
            delBtn.off();

            //Append elements to DOM
            $(confirmationBtn).append(noBtn, yesBtn);
            $(confirmationRow).append(emptyData, message, confirmationBtn);
            $(row).after(confirmationRow);
      }

      function exitDeleteMode(){
            if(!editClicked){
                  return;
            }
            $(document).off('click');
            //Remove confirmation elements and color highlight
            confirmationRow.empty();
            confirmationRow.remove();
            row.removeClass('bg-danger');

            //Reassigns click handler to delete button
            delBtn.click(addErrorConfirmationBar);

            editClicked = false;
      }

      function addMobileIcons(){
            if($(window).width()<475){
                  nameInput.attr('size', 8);
                  locationInput.attr('size', 8);
                  delBtn.html('<i class="fas fa-trash-alt"></i>');
                  editBtn.html('<i class="fa fa-edit"></i>');
                  yesBtn.html('<i class="fas fa-check"></i>');
                  noBtn.html('<i class="fa fa-ban" aria-hidden="true"></i>');
            }else{
                 nameInput.attr('size', 12);
                 locationInput.attr('size', 12);
                 delBtn.html('Delete');
                 editBtn.html('Edit');
                 yesBtn.html('Yes');
                 noBtn.html('No'); 
            }
            if($(window).width()<355){
                  $('.student-list-container').addClass('table-responsive');
            }else{
                  $('.student-list-container').removeClass('table-responsive');
            }
      }
}
/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateCocktailList(cocktailArray){
      for(var drink = 0; drink < cocktailArray.length; drink++){
            var cocktail = cocktailArray[drink];
            // renderStudentOnDom(student);
      }
      renderRatingAverage(calculateRatingAverage(cocktailArray));
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateRatingAverage(cocktails){
      var totalRating = 0;
      var count = 0;

      for(var r = 0; r < cocktails.length; r++){
          totalRating = totalRating + parseInt(cocktails[r].rating);
          count++;
      }
      var ratingAverage = totalRating / count;

      if(ratingAverage === NaN){
            ratingAverage = 0;
      }
      var ratAve = ratingAverage.toFixed(2);
      
      return ratAve;
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderRatingAverage(average){
      $('.avgRating').text(average);
}

function loadCocktails(){
      var ajaxOptionGet = {
            url: 'data.php',
            dataType: 'json',
            method: 'get',
            data: {
                  action: 'readAll'
            },
            success: renderData,
            error: function(){
                  console.log('fail');
                }
      };
      $.ajax(ajaxOptionGet);
}

function renderData(response){
      cocktail_array = [];
      var drinks = response.data;
      for(var i = 0; i < drinks.length; i++){
            var oneDrink = drinks[i];
            renderCocktailOnDom(oneDrink);
            cocktail_array.push(drinks[i]);
      }
      updateCocktailList(cocktail_array);
      console.log(response);
      clearAddCocktailFormInputs();
      removeErrorMessages();
      $('.addBtn').attr('disabled', false);
}

function addCocktailToServer(cocktail_object){
      var ajaxOptionCreate = {
            url: 'data.php',
            dataType: 'json',
            method: 'get',
            data: {
                  action: 'insert',
                  name: cocktail_object.name,
                  location: cocktail_object.location,
                  rating: cocktail_object.rating,
            },
            success: renderAddCocktail,
            error: function(){
                  console.log('fail');
                }
      };
      $.ajax(ajaxOptionCreate);
}

function renderAddCocktail(){
      cocktail_array = [];
      loadCocktails();
}
function removeCocktailFromServer(index, row){
      var ajaxOptionDelete = {
            url: 'data.php',
            dataType: 'json',
            method: 'get',
            data: {
                  action: 'delete',
                  id: index
            },
            success: function(){
                  saveDel = false;
                  for(let i = 0; i < cocktail_array.length; i++){
                        if(cocktail_array[i].id === index){
                              cocktail_array.splice(i, 1);
                        }
                  }
                  var avg = calculateRatingAverage(cocktail_array);
                  renderRatingAverage(avg);
                  row.remove();
                  console.log("DELETED");
            },
            error: function(){
                  console.log('fail');
            },
            dataType: 'json',
      };
      saveDel = true;
      $.ajax(ajaxOptionDelete);
}

// function removeStudent(){
//       student_array = [];
//       loadPeople();
// }

// function updatePeople(studentObj){
//       var updateList = {
//             url: 'data.php',
//             dataType: 'json',
//             method: 'get',
//             data: {
//                   action: 'update', 
//                   name: studentObj.name,
//                   course: studentObj.course,
//                   grade: studentObj.grade,
//             },
//             success: function(){
//                   console.log(UPDATED);
//             },
//             error: function(){
//                   console.log('failed to update');
//             }
//       };
//       $.ajax(updateList);
// }

// function updateAndPopulate(){
//       var studObject = {};
//       var studName = $('#studentName').val();
//       var studCourse = $('#course').val();
//       var studGrade = $('#studentGrade').val();

//       if(studObject.studName === " "){
//             studObject.studName = this.studName;
//       }
//       if(studObject.studCourse === " "){
//             studObject.studCourse = this.studCourse;
//       }
//       if(studObject.studGrade === " "){
//             studObject.studGrade = this.studGrade;
//       }
//       updatePeople(studObject);
//       clearAddStudentFormInputs();
// }

function highlightTextInput(){
      let inputText = $(this).val();
      if(inputText === '' || inputText.length>40){
            $(this).closest('div').addClass('has-error');
            $(this).closest('div').removeClass('has-success');
      }
      else if($(this).is('#rating')&&(inputText<0 || inputText>10 || isNaN($('#rating').val()))){
            $(this).closest('div').addClass('has-error');
            $(this).closest('div').removeClass('has-success');
      }
      else if(inputText !== ''){
            $(this).closest('div').addClass('has-success');
            $(this).closest('div').removeClass('has-error');
            let warningText = $(this).closest('div').next();
            if(warningText.hasClass('text-danger')){
                  warningText.remove();
            }
      }
}

function validateCocktail(){
      let validate = 0;

      //Trim white spaces
      $('#cocktailName').val($('#cocktailName').val().trim());
      $('#location').val($('#location').val().trim());
      highlightTextInput.call($('#cocktailName')[0]);
      highlightTextInput.call($('#location')[0]);
      highlightTextInput.call($('#rating')[0]);

      $('.errorMessage').remove();

      if($('#cocktailName').val() ===''){
            $('<p class="text-danger errorMessage">&#9702 Cocktail name required.</p>').insertAfter('#nameInputGroup');
      }
      else if($('#cocktailName').val().length>40){
            $('<p class="text-danger errorMessage">&#9702 Must not exceed 40 characters.</p>').insertAfter('#nameInputGroup');
      }
      else{validate += 1;}

      if($('#location').val() ===''){
            $('<p class="text-danger errorMessage">&#9702 Location name required.</p>').insertAfter('#locationInputGroup');
      }
      else if($('#location').val().length>40){
            $('<p class="text-danger errorMessage">&#9702 Must not exceed 40 characters.</p>').insertAfter('#locationInputGroup');
      }
      else{validate += 1;}

      if($('#rating').val() ===''){
            $('<p class="text-danger errorMessage">&#9702 Rating required.</p>').insertAfter('#ratingInputGroup');
      }
      else if($('#rating').val()>10){
            $('<p class="text-danger errorMessage">&#9702 Rating must not exceed 10.</p>').insertAfter('#ratingInputGroup');
      }
      else if($('#rating').val()<0){
            $('<p class="text-danger errorMessage">&#9702 Rating cannot be negative.</p>').insertAfter('#ratingInputGroup');
      }
      else if(isNaN($('#rating').val())){
            $('<p class="text-danger errorMessage">&#9702 Rating must be a number from 1-10.</p>').insertAfter('#ratingInputGroup');
      }
      else{validate += 1;}

      if(validate === 3){
            addCocktail();
      }
}

function removeErrorMessages(){
      if($('#cocktailName').val() ===''
            && $('#location').val() ===''
            && $('#rating').val() ===''){
                  $('.errorMessage').remove();
                  $('#cocktailName').closest('div').removeClass('has-error');
                  $('#location').closest('div').removeClass('has-error');
                  $('#rating').closest('div').removeClass('has-error');
                  $('#cocktailName').closest('div').removeClass('has-success');
                  $('#location').closest('div').removeClass('has-success');
                  $('#rating').closest('div').removeClass('has-success');
            }
}

function setTwoNumberDecimal(inputBar){
      inputBar.value = parseFloat(inputBar.value).toFixed(2);
}
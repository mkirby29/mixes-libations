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
/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */
var student_array = [];
/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
      addClickHandlersToElements();
      loadPeople();
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
            if(!edit_clicked){
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
      validateStudent();
}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){ 
      clearAddStudentFormInputs();
      removeErrorMessages();
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent(){
      var student_object = {};
      var studentName = $('#studentName').val();
      var studentCourse = $('#course').val();
      var studentGrade = $('#studentGrade').val();

      student_object.name = studentName;
      student_object.course = studentCourse;
      student_object.grade = studentGrade;

      student_array.push(student_object);
      $('.data').empty();
      clearAddStudentFormInputs();
      addStudentToServer(student_object);
      updateStudentList(student_array);
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){
      $('input[name=studentName]').val(" ");
      $('input[name=course]').val(" ");
      $('input[name=studentGrade]').val(" ");
}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(studentObj){
      var tabBody = $('tbody');
      var row = $('<tr>');
      tabBody.append(row);
      
      var studName = $('<td>').text(studentObj.name);
      var studCourse = $('<td>').text(studentObj.course_name);
      var studGrade = $('<td>').text(studentObj.grade);
      var tblDat = $('<td>');
      var editBtn = $('<button>', {
            type: 'button',
            class: 'btn btn-info table_button',
            text: 'Edit',
            on: {
                  click: editMode
            }
      });
      var delBtn = $('<button>', {
            type: 'button',
            class: 'btn btn-danger',
            text: 'Delete'
      });
      var editRow = tblDat.append(editBtn); 
      var delRow = tblDat.append(delBtn);
      row.append(studName, studCourse, studGrade, delRow, editRow);
      // updateBtn.click(updateAndPopulate);
      delBtn.click(function(){
            $(this).closest('tr').remove();
            // var deleted = student_array.splice(studentObj), 1);
            var deletedStudent = studentObj;
            removeStudentFromServer(deletedStudent);
      });
}
/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(studentArray){
      for(var stud = 0; stud < studentArray.length; stud++){
            var student = studentArray[stud];
            // renderStudentOnDom(student);
      }
      renderGradeAverage(calculateGradeAverage(studentArray));
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(students){
      var totalGrade = 0;
      var count = 0;

      for(var g = 0; g < students.length; g++){
          totalGrade = totalGrade + parseInt(students[g].grade);
          count++;
      }
      var classAverage = totalGrade / count;
      return classAverage;
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(average){
      $('.avgGrade').text(average);
}

function loadPeople(){
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
      student_array = [];
      var people = response.data;
      for(var i = 0; i < people.length; i++){
            var onePerson = people[i];
            renderStudentOnDom(onePerson);
            student_array.push(people[i]);
      }
      updateStudentList(student_array);
}

function addStudentToServer(student_object){
      var ajaxOptionCreate = {
            url: 'data.php',
            dataType: 'json',
            method: 'get',
            data: {
                  action: 'insert',
                  name: student_object.name,
                  course: student_object.course,
                  grade: student_object.grade,
            },
            success: renderAddStudent,
            error: function(){
                  console.log('fail');
                }
      };
      $.ajax(ajaxOptionCreate);
}

function renderAddStudent(){
      student_array = [];
      loadPeople();
}
function removeStudentFromServer(studentObj){
      var ajaxOptionDelete = {
            url: 'data.php',
            dataType: 'json',
            method: 'get',
            data: {
                  action: 'delete',
                  student_id: studentObj.id,
            },
            success: function(){
                  console.log("DELETED");
            },
            error: function(){
                  console.log('fail');
            }
      };
      $.ajax(ajaxOptionDelete);
}

// function removeStudent(){
//       student_array = [];
//       loadPeople();
// }

function updatePeople(studentObj){
      var updateList = {
            url: 'data.php',
            dataType: 'json',
            method: 'get',
            data: {
                  action: 'update', 
                  name: studentObj.name,
                  course: studentObj.course,
                  grade: studentObj.grade,
            },
            success: function(){
                  console.log(UPDATED);
            },
            error: function(){
                  console.log('failed to update');
            }
      };
      $.ajax(updateList);
}

function updateAndPopulate(){
      var studObject = {};
      var studName = $('#studentName').val();
      var studCourse = $('#course').val();
      var studGrade = $('#studentGrade').val();

      if(studObject.studName === " "){
            studObject.studName = this.studName;
      }
      if(studObject.studCourse === " "){
            studObject.studCourse = this.studCourse;
      }
      if(studObject.studGrade === " "){
            studObject.studGrade = this.studGrade;
      }
      updatePeople(studObject);
      clearAddStudentFormInputs();
}
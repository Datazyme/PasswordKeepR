//returns data in HTML format
const getPasswords = (object) => {
  const password = `
  <tr>
    <td class="password_id" style="display:none;">${object.id}</td>
    <td class"credential_type">${object.is_user_created === true ? 'Personal' : `Organization -> ${object.organizations_name}`}</td>
    <td class="password_website">${object.website}</td>
    <td class="password_username">${object.username}</td>
    <td class="password_password">${object.password}</td>
    <td class="password_hint">${object.hint === null ? '' : object.hint}</td>
    <td class="password_category">${object.category}</td>
    <td><input type="submit" value="Edit" form="password-edit" class="edit-button"></td>
    <td><input type="submit" value="Delete" form="password-delete" class="delete-button"></td>
  </tr>
  `;
  return password;
};

//load all passwords asynchronously
const loadAllPasswords = function() {
  $.ajax('/api/passwords', { method: 'GET' })
    .then((response) => {
      //loops through JSON object from api/passwords route and prepend every entry to the password table
      for (const password of response.passwords) {
        $('.passwords-container').prepend(getPasswords(password));
      }
    })
    .catch((err) => {
      console.log("There was an ERROR ", err);
    });
};

//get only the new password
const loadNewPassword = function(event) {
  $.ajax('/api/passwords', { method: 'GET' })
    .then((response) => {
      const newPassword = response.passwords[response.passwords.length - 1];
      // loops through JSON object from api/passwords route and prepend only the new password
      $(getPasswords(newPassword)).prependTo('.passwords-container').hide().fadeIn('slow');
    })
    .catch((err) => {
      console.log("There was an ERROR ", err);
    });
};

//callback function when new username and password is added. the supplied data is then passed to a POST request query
const postNewPassword = (event) => {
  event.preventDefault();
  const organization_id = 1;
  const role_id = 3;
  const is_user_created = true;
  const category = $(".new-category").val();
  const website = $(".new-website").val();
  const username = $(".new-username").val();
  const password = $(".new-password").val();
  const hint = $(".new-hint").val();
  $.post('/api/passwords',
    {
      organization_id,
      role_id,
      is_user_created,
      website,
      username,
      password,
      hint,
      category,
    })
    .then(() =>{
    //helper function that will ONLY load the NEW username and password
      loadNewPassword();
    });
};

//callback function when user deletes a username and password. it passes the username and password information to a POST request query
const deleteCurrentItem = (event) => {
  if (confirm('Are you sure you want to delete?')) {
    event.preventDefault();
    const password_id = $(event.originalEvent.submitter).parent().siblings('.password_id').text();
    const row = $(event.originalEvent.submitter).parent().parent();
    $.post('/api/passwords/delete', {
      password_id
    })
      .then(() => {
      //animate table row to change colour to confirm entry has been successfully deleted
        $(event.originalEvent.submitter).parent().parent().hide('slow').css('background-color', 'maroon');
      });
  }
};

//callback function when user edits a username and password. it changes table cells to content-editable using replaceWith()
const editCurrentItem = (event) => {
  event.preventDefault();
  //this helper function just helps DRY up the code and eliminates repition of the DOM
  let siblingsSelector = (selector) => {
    return $(event.originalEvent.submitter).parent().siblings(`${selector}`);
  };
    //change current item table row color when editing
  $(event.originalEvent.submitter).parent().parent().hide().show('slow').css('background-color', 'lemonchiffon');
  siblingsSelector('.password_website').attr('contentEditable', 'true');
  siblingsSelector('.password_username').attr('contentEditable', 'true');
  siblingsSelector('.password_password').attr('contentEditable', 'true').css('-webkit-text-security', 'none');
  siblingsSelector('.password_hint').attr('contentEditable', 'true');
  siblingsSelector('.password_category').replaceWith(`
  <td class="password_category">${$(document).find('#category-pulldown')[0].outerHTML}</td>
  `);
  siblingsSelector('.password_category').next().replaceWith(`
  <td class="edit-td"><input type="submit" value="Done" form="password-edit-submit" class="submit-edit-button"></td>
  `);
};

//callback function when user is done editing username and password. the changes are then passed to a POST request query
const submitEditChanges = (event) => {
  event.preventDefault();
  //this helper function just helps DRY up the code and eliminates repition of the DOM
  let siblingsSelector = (selector) => {
    return $(event.originalEvent.submitter).parent().siblings(`${selector}`);
  };
  const data = {
    id: siblingsSelector('.password_id').text(),
    website: siblingsSelector('.password_website').text(),
    username: siblingsSelector('.password_username').text(),
    password: siblingsSelector('.password_password').text(),
    hint: siblingsSelector('.password_hint').text() ? siblingsSelector('.password_hint').text() : ' ',
    category: siblingsSelector('.password_category').children().val(),
  };

  //line 128, 130 and 139 validates the content-editable table cells when the DONE button is clicked. this prevents submitting null data to the POST request query
  let falsyChecker = true;

  for (const d in data) {
    if (!data[d]) {
      falsyChecker = false;
      //change current item row to red to indicate blank field
      $(event.originalEvent.submitter).parent().parent().hide().show('fast').css('background-color', 'lightcoral');
      return;
    }
  }

  //this code changes the table cells back to default non-editable mode after successful POST request
  if (falsyChecker) {
    $.post('/api/passwords/edit', data)
      .then(() => {
        //change table row colour back to default table colour
        $(event.originalEvent.submitter).parent().parent().hide().show('slow').css('background-color', '#ececec');
        siblingsSelector('.password_website').attr('contentEditable', 'false');
        siblingsSelector('.password_username').attr('contentEditable', 'false');
        siblingsSelector('.password_password').attr('contentEditable', 'false').css('-webkit-text-security', 'square');
        siblingsSelector('.password_hint').attr('contentEditable', 'false');
        siblingsSelector('.password_category').replaceWith(`<td class="password_category">${data.category}</td>`);
        siblingsSelector('.password_category').next().replaceWith(`<td><input type="submit" value="Edit" form="password-edit" class="edit-button"></td>`);
      });
  }

};

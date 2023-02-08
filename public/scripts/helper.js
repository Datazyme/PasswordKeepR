const getPasswords = (object) => {
  const password = `
  <tr>
    <td class="password_id" style="display:none;">${object.id}</td>
    <td class="password_website">${object.website}</td>
    <td class="password_username">${object.username}</td>
    <td class="password_password">${object.password}</td>
    <td class="password_hint">${object.hint === null ? '' : object.hint}</td>
    <td class="password_category">${object.category}</td>
    <td class="password_require_master">${object.require_master_password}</td>
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
      //loops through JSON object from api/passwords route and append every entry to the password table
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

//callback function when new username and password is added
const postNewPassword = (event) => {
  event.preventDefault();
  const user_id = 1;
  const organization_id = 1;
  const role_id = 3;
  const is_user_created = true;
  const category = $(".new-category").val();
  const website = $(".new-website").val();
  const username = $(".new-username").val();
  const password = $(".new-password").val();
  const hint = $(".new-hint").val();
  const require_master_password = $(".new-require-master").val();
  // console.log('submit')
  $.post('/api/passwords',
  {
    user_id,
    organization_id,
    role_id,
    is_user_created,
    website,
    username,
    password,
    hint,
    category,
    require_master_password
  })
  .then(() =>{
    loadNewPassword();
  })
}

const deleteCurrentItem = (event) => {
  event.preventDefault()
  const password_id = $(event.originalEvent.submitter).parent().siblings('.password_id').text();
  const row = $(event.originalEvent.submitter).parent().parent();
  $.post('/api/passwords/delete', {
    password_id
  })
  .then(() => {
    $(event.originalEvent.submitter).parent().parent().hide('slow').css('background-color', 'maroon')
  })
}

const editCurrentItem = (event) => {
  event.preventDefault();

  let siblingsSelector = (selector) => {
      return $(event.originalEvent.submitter).parent().siblings(`${selector}`);
    };
    //change current item table row color when editing
  $(event.originalEvent.submitter).parent().parent().hide().show('slow').css('background-color', 'lemonchiffon')
  siblingsSelector('.password_website').attr('contentEditable', 'true')
  siblingsSelector('.password_username').attr('contentEditable', 'true')
  siblingsSelector('.password_password').attr('contentEditable', 'true').css('-webkit-text-security', 'none')
  siblingsSelector('.password_hint').attr('contentEditable', 'true')
  siblingsSelector('.password_category').replaceWith(`
  <td class="password_category">${$(document).find('#category-pulldown')[0].outerHTML}</td>
  `)
  siblingsSelector('.password_require_master').replaceWith(`
  <td class="password_require_master">${$(document).find('#master-password-pulldown')[0].outerHTML}</td>
  `)
  siblingsSelector('.password_require_master').next().replaceWith(`
  <td class="edit-td"><input type="submit" value="Done" form="password-edit-submit" class="submit-edit-button"></td>
  `)
}

const submitEditChanges = (event) => {
  event.preventDefault()

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
      require_master_password: siblingsSelector('.password_require_master').children().val()
    };


    let falsyChecker = true;

    for (const d in data) {
      if(!data[d]) {
        falsyChecker = false;
        //change current item row to red to indicate blank field
        $(event.originalEvent.submitter).parent().parent().hide().show('fast').css('background-color', 'lightcoral')
        return;
      }
    }

    if (falsyChecker) {
      $.post('/api/passwords/edit', data)
        .then(() => {
          $(event.originalEvent.submitter).parent().parent().hide().show('slow').css('background-color', '#ececec')
          // $(event.originalEvent.submitter).parent().parent().css('background-color', '#ececec')
          siblingsSelector('.password_website').attr('contentEditable', 'false')
          siblingsSelector('.password_username').attr('contentEditable', 'false')
          siblingsSelector('.password_password').attr('contentEditable', 'false').css('-webkit-text-security', 'square')
          siblingsSelector('.password_hint').attr('contentEditable', 'false')
          siblingsSelector('.password_category').replaceWith(`<td class="password_category">${data.category}</td>`)
          siblingsSelector('.password_require_master').replaceWith(`<td class="password_require_master">${data.require_master_password}</td>`)
          siblingsSelector('.password_require_master').next().replaceWith(`<td><input type="submit" value="Edit" form="password-edit" class="edit-button"></td>`)
        })
  }

}

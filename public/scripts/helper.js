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
    <td><input type="submit" value="Edit" form="password-edit" id="edit-button"></td>
    <td><input type="submit" value="Delete" form="password-delete" id="delete-button"></td>
  </tr>
  `;
  return password;
};

const editPasswords = (object) => {
  const edit_box = `
  <tr>
    <td class="password_id" style="display:none;">${object.id}</td>
    <td class="edit-password_website"><input type="text" placeholder="http://" value="${object.website}"></td>
    <td class="edit-password_username"><input type="text" value="${object.username}"></td>
    <td class="edit-password_password"><input type="text" value="${object.password}"></td>
    <td class="edit-password_hint"><input type="text" value="${object.hint}"></td>
    <td class="edit-password_category">
      <select id="category-pulldown" value="${object.category}">
      <option value="Social Media">Social Media</option>
      <option value="Gaming">Gaming</option>
      <option value="Work">Work</option>
      <option value="Entertainment">Entertainment</option>
      </select>
    </td>
    <td class="edit-password_require_master">
      <select id="master-password-pulldown" value="${object.require_master}">
      <option value=false>False</option>
      <option value=true>True</option>
      </select>
    </td>
    <td><input type="submit" value="Done" form="password-edit-submit" id="submit-edit-button"></td>
    <td><input type="submit" value="Delete" form="password-delete" id="delete-button"></td>
  </tr>
  `;
  return edit_box;
};

const loadEntry = function() {
  $.ajax('/api/passwords', { method: 'GET' })
    .then((response) => {
      console.log("your page is grabbing the tweets from database", response);
      //loops through JSON object from api/passwords route and append every entry to the password table
      for (const password of response.passwords) {
        $('.passwords-container').prepend(getPasswords(password));
      }
      //(password);
    })
    .catch((err) => {
      console.log("There was an ERROR ", err);
    });
};

const handleSubmit = (event) => {
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
        loadEntry();

      })
    // console.log('submit');
}

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

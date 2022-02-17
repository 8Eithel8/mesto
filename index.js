let buttonEdit = document.querySelector('.profile__button_type_edit');
let popup = document.querySelector('.popup');

buttonEdit.addEventListener('click', function() {

  if (popup.classList.contains('opned')) {
    popup.classList.remove('opened');
    } else {
      popup.classList.add('opened');
  };
});

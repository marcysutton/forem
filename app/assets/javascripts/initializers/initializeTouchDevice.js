function getById(className) {
  return document.getElementById(className);
}
function getClassList(className) {
  return getById(className).classList;
}

function blur(event, className) {
  setTimeout(() => {
    if (document.activeElement !== getById(className)) {
      getClassList('top-bar__menu').remove('showing');
    }
  }, 10);
}

function removeShowingMenu() {
  getClassList('top-bar__menu').remove('showing');
  setTimeout(() => {
    getClassList('top-bar__menu').remove('showing');
  }, 5);
  setTimeout(() => {
    getClassList('top-bar__menu').remove('showing');
  }, 150);
}

function toggleMenu() {
  getClassList('top-bar__menu').toggle('showing');
}
let topBarMenu = getClassList('top-bar__menu');

function handleMenuBtnEscapeKey(e) {
  if (e.keyCode === 27 && topBarMenu.contains('showing')) {
    topBarMenu.remove('showing');
  }
}

function initializeTouchDevice() {
  var isTouchDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|DEV-Native-ios/i.test(
    navigator.userAgent,
  );
  if (navigator.userAgent === 'DEV-Native-ios') {
    document.body.classList.add('dev-ios-native-body');
  }
  setTimeout(() => {
    removeShowingMenu();
    if (isTouchDevice) {
      // Use a named function instead of anonymous so duplicate event handlers are discarded
      getById('navigation-butt').addEventListener('click', toggleMenu);
    } else {
      topBarMenu.add('desktop');
      getById('navigation-butt').addEventListener('click', (e) => {
        if (topBarMenu.contains('showing')) {
          topBarMenu.remove('showing');
          getById('navigation-butt').removeEventListener(
            'keyup',
            handleMenuBtnEscapeKey,
          );
        } else {
          topBarMenu.add('showing');
          getById('navigation-butt').addEventListener(
            'keyup',
            handleMenuBtnEscapeKey,
          );
        }
      });
      getById('last-nav-link').addEventListener('blur', (e) =>
        blur(e, 'second-last-nav-link'),
      );
    }
  }, 10);
}

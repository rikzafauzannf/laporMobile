var StackCards = function (element) {
  this.element = element;
  this.items = this.element.getElementsByClassName("card-Landing");
  this.scrollingListener = false;
  this.scrolling = false;
  initStackCardsEffect(this);
};

function initStackCardsEffect(element) {
  // use Intersection Observer to trigger animation
  var observer = new IntersectionObserver(stackCardsCallback.bind(element));
  observer.observe(element.element);
}

function stackCardsCallback(entries) {
  // Intersection Observer callback
  if (entries[0].isIntersecting) {
    // cards inside viewport - add scroll listener
    if (this.scrollingListener) return; // listener for scroll event already added
    stackCardsInitEvent(this);
  } else {
    // cards not inside viewport - remove scroll listener
    if (!this.scrollingListener) return; // listener for scroll event already removed
    window.removeEventListener("scroll", this.scrollingListener);
    this.scrollingListener = false;
  }
}

function stackCardsInitEvent(element) {
  element.scrollingListener = stackCardsScrolling.bind(element);
  window.addEventListener("scroll", element.scrollingListener);
}

function stackCardsScrolling() {
  if (this.scrolling) return;
  this.scrolling = true;
  window.requestAnimationFrame(animateStackCards.bind(this));
}

function animateStackCards() {
  var top = this.element.getBoundingClientRect().top;
  var offsetTop = 100,
    cardHeight = 300,
    marginY = 15;
  for (var i = 0; i < this.items.length; i++) {
    // cardTop/cardHeight/marginY are the css values for the card top position/height/Y offset
    var scrolling = offsetTop - top - i * (cardHeight + marginY);
    // debugger;
    if (scrolling > 0) {
      // card is fixed - we can scale it down
      this.items[i].setAttribute(
        "style",
        "transform: translateY(" +
          marginY * i +
          "px) scale(" +
          (cardHeight - scrolling * 0.05) / cardHeight +
          ");"
      );
    }
  }

  this.scrolling = false;
}

var stackCards = document.getElementsByClassName("card-deck-js");
var intersectionObserverSupported =
  "IntersectionObserver" in window && "IntersectionObserverEntry" in window;

if (stackCards.length > 0 && intersectionObserverSupported) {
  for (var i = 0; i < stackCards.length; i++) {
    new StackCards(stackCards[i]);
  }
}

// playbutton
$(document).ready(function () {
  // get video source from data-src button
  var $videoSrc;
  $(".video-btn").click(function () {
    $videoSrc = $(this).data("src");
  });
  console.log($videoSrc);
  // autoplay video on modal load
  $("#myModal").on("shown.bs.modal", function (e) {
    // youtube iframe configuration and settings
    $("#video").attr(
      "src",
      $videoSrc + "?autoplay=1&rel=0&controls=1&loop=1&modestbranding=1"
    );
  });
  // stop playing the youtube video when modal closed
  $("#myModal").on("hide.bs.modal", function (e) {
    // stop video
    $("#video").attr("src", $videoSrc);
  });
});

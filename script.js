document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. 네비게이션 상단 바 스크롤 이펙트 =====
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });



  // ===== 3. 스크롤 반응형 페이드인 애니메이션 (ScrollObserver) =====
  const scrollElements = document.querySelectorAll('.scroll-fade');

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop > (window.innerHeight || document.documentElement.clientHeight)
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add('visible');
  };

  const hideScrollElement = (element) => {
    element.classList.remove('visible');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.15)) {
        displayScrollElement(el);
      } else if (elementOutofView(el)) {
        hideScrollElement(el); // 화면 밖으로 완전히 나가면 애니메이션 재실행 가능하도록 설정
      }
    });
  };

  // 스크롤 이벤트 최적화(Throttle) 처리 포함 실행
  let isScrolling = false;
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        handleScrollAnimation();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  // 페이지 진입 시 첫 화면 즉시 실행
  handleScrollAnimation();
});
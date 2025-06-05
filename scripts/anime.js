    // DOM이 로드된 후 실행
    document.addEventListener('DOMContentLoaded', function() {
      // 애니메이션 카드에 인덱스 설정하여 시차 애니메이션 적용
      const animeCards = document.querySelectorAll('.anime-card');
      animeCards.forEach((card, index) => {
        card.style.setProperty('--card-index', index % 12); // 12개 단위로 반복
      });
      
      // 요일별 필터링 기능
      const weekdayTabs = document.querySelectorAll('.weekday-tab');
      const weekdayAnimeCards = document.querySelectorAll('.weekday-anime .anime-card');
      
      weekdayTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          // 모든 탭에서 active 클래스 제거
          weekdayTabs.forEach(t => t.classList.remove('active'));
          // 클릭한 탭에 active 클래스 추가
          this.classList.add('active');
          
          // 선택한 요일 가져오기
          const selectedDay = this.getAttribute('data-day');
          
          // 애니메이션 카드 필터링
          weekdayAnimeCards.forEach(card => {
            if (selectedDay === 'all' || card.getAttribute('data-day') === selectedDay) {
              card.style.display = '';
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, 50);
            } else {
              card.style.opacity = '0';
              card.style.transform = 'translateY(20px)';
              setTimeout(() => {
                card.style.display = 'none';
              }, 300);
            }
          });
        });
      });
      
      // 서브메뉴 활성화
      document.querySelectorAll('.submenu a').forEach(menuItem => {
        menuItem.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelectorAll('.submenu a').forEach(item => item.classList.remove('active'));
          this.classList.add('active');
        });
      });
      
      // 모바일 환경에서 스크롤 개선
      const scrollContainers = document.querySelectorAll('.navigation-container, .submenu, .weekday-tabs');
      scrollContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        container.addEventListener('mousedown', (e) => {
          isDown = true;
          container.classList.add('active');
          startX = e.pageX - container.offsetLeft;
          scrollLeft = container.scrollLeft;
        });
        container.addEventListener('mouseleave', () => {
          isDown = false;
          container.classList.remove('active');
        });
        container.addEventListener('mouseup', () => {
          isDown = false;
          container.classList.remove('active');
        });
        container.addEventListener('mousemove', (e) => {
          if(!isDown) return;
          e.preventDefault();
          const x = e.pageX - container.offsetLeft;
          const walk = (x - startX) * 2;
          container.scrollLeft = scrollLeft - walk;
        });
        
        // 터치 이벤트 추가
        container.addEventListener('touchstart', (e) => {
          startX = e.touches[0].pageX - container.offsetLeft;
          scrollLeft = container.scrollLeft;
        }, {passive: true});
        
        container.addEventListener('touchmove', (e) => {
          if (e.touches.length > 0) {
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
          }
        }, {passive: true});
      });
      
      // 모바일용 성능 최적화
      const handleVisibilityChange = () => {
        if (document.hidden) {
          document.body.classList.add('page-hidden');
          // 애니메이션 일시 중지
          document.querySelectorAll('.anime-card, .ranking-item').forEach(el => {
            el.style.animationPlayState = 'paused';
          });
        } else {
          document.body.classList.remove('page-hidden');
          // 애니메이션 재개
          document.querySelectorAll('.anime-card, .ranking-item').forEach(el => {
            el.style.animationPlayState = 'running';
          });
        }
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // 이미지 지연 로딩
      if ('IntersectionObserver' in window) {
        const lazyLoadObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const target = entry.target;
              const bgImg = target.getAttribute('data-bg');
              if (bgImg) {
                target.style.backgroundImage = `url(${bgImg})`;
                target.removeAttribute('data-bg');
                lazyLoadObserver.unobserve(target);
              }
            }
          });
        });
        
        document.querySelectorAll('.anime-image').forEach(img => {
          const currentBg = img.style.backgroundImage;
          if (currentBg) {
            const bgUrl = currentBg.match(/url\(['"]?([^'"]+)['"]?\)/i);
            if (bgUrl && bgUrl[1]) {
              img.setAttribute('data-bg', bgUrl[1]);
              img.style.backgroundImage = 'none';
              lazyLoadObserver.observe(img);
            }
          }
        });
      }
    });

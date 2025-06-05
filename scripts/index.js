    document.addEventListener('DOMContentLoaded', function() {
      // 애니메이션 카드 및 이미지 아이템에 시차 애니메이션 적용
      const cards = document.querySelectorAll('.post-card, .image-item');
      cards.forEach((card, index) => {
        card.style.setProperty('--card-index', index % 12);
        setTimeout(() => {
          card.style.opacity = '1';
        }, index * 100);
      });
      
      // 피드 아이템, 토픽 아이템, 이벤트 아이템에 시차 애니메이션 적용
      const listItems = document.querySelectorAll('.feed-item, .topic-item, .event-item, .release-item');
      listItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index % 10);
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, 500 + index * 50);
      });
      
      // 필터 버튼 활성화 기능
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          
          // 클릭 효과 추가
          this.style.transform = 'scale(1.05)';
          setTimeout(() => {
            this.style.transform = '';
          }, 200);
        });
      });
      
      // 키워드 배지 클릭 효과
      document.querySelectorAll('.keyword-badge').forEach(badge => {
        badge.addEventListener('click', function() {
          const searchInput = document.querySelector('.search-input');
          if(searchInput) {
            searchInput.value = this.textContent;
            searchInput.focus();
          }
          
          // 클릭 효과
          this.style.transform = 'scale(1.1) translateY(-2px)';
          setTimeout(() => {
            this.style.transform = '';
          }, 200);
        });
      });
      
      // 검색창 포커스 효과
      const searchInput = document.querySelector('.search-input');
      if(searchInput) {
        searchInput.addEventListener('focus', function() {
          const searchBox = this.closest('.search-box');
          if(searchBox) {
            searchBox.style.transform = 'translateY(-3px)';
            searchBox.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
          }
        });
        
        searchInput.addEventListener('blur', function() {
          const searchBox = this.closest('.search-box');
          if(searchBox) {
            searchBox.style.transform = '';
            searchBox.style.boxShadow = '';
          }
        });
      }
      
      // 스크롤 이벤트에 따른 애니메이션 효과
      const animateOnScroll = () => {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
          const sectionTop = section.getBoundingClientRect().top;
          const sectionBottom = section.getBoundingClientRect().bottom;
          const isVisible = (sectionTop < window.innerHeight - 100) && (sectionBottom > 0);
          
          if (isVisible && !section.classList.contains('animated')) {
            section.classList.add('animated');
            
            // 섹션 내부 요소들 애니메이션
            const title = section.querySelector('.section-title');
            if(title) {
              title.style.opacity = '0';
              title.style.transform = 'translateX(-20px)';
              setTimeout(() => {
                title.style.transition = 'all 0.6s ease';
                title.style.opacity = '1';
                title.style.transform = 'translateX(0)';
              }, 100);
            }
            
            // 섹션 내 카드 요소들 애니메이션
            const items = section.querySelectorAll('.post-card, .image-item, .feed-item, .topic-item, .event-item, .release-item');
            items.forEach((item, index) => {
              item.style.opacity = '0';
              item.style.transform = 'translateY(20px)';
              setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
              }, 200 + index * 50);
            });
          }
        });
      };
      
      // 초기 로드 시 애니메이션 실행
      setTimeout(animateOnScroll, 500);
      
      // 스크롤 이벤트 리스너 추가
      window.addEventListener('scroll', animateOnScroll);
      
      // 링크 효과
      document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', function() {
          if(!this.querySelector('.logo')) { // 로고 링크는 제외
            this.style.transition = 'all 0.3s ease';
          }
        });
      });
      
      // 이미지 지연 로딩
      const lazyLoadImages = () => {
        const images = document.querySelectorAll('.post-image, .image-item img, .release-cover img');
        
        images.forEach(img => {
          // 이미지가 뷰포트에 들어왔는지 확인
          const rect = img.getBoundingClientRect();
          const isInViewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
          );
          
          // 뷰포트에 있으면 배경 이미지나 이미지 소스 로드
          if(isInViewport) {
            if(img.classList.contains('post-image')) {
              img.style.backgroundImage = img.getAttribute('data-src') || img.style.backgroundImage;
            } else {
              img.src = img.getAttribute('data-src') || img.src;
            }
            
            // 이미지가 로드되면 애니메이션 적용
            img.classList.add('loaded');
          }
        });
      };
      
      // 초기 이미지 로딩
      setTimeout(lazyLoadImages, 300);
      
      // 스크롤 시 이미지 로딩
      window.addEventListener('scroll', lazyLoadImages);
      
      // 모바일에서 터치 효과 추가
      const addTouchEffects = () => {
        const touchableElements = document.querySelectorAll('.post-card, .image-item, .feed-item, .topic-item, .event-item, .release-item, .filter-btn, .keyword-badge, .login-btn, .signup-btn');
        
        touchableElements.forEach(el => {
          el.addEventListener('touchstart', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'scale(0.98)';
          });
          
          el.addEventListener('touchend', function() {
            this.style.transform = '';
          });
        });
      };
      
      // 모바일 터치 효과 적용
      if('ontouchstart' in window) {
        addTouchEffects();
      }
      
      // 푸터 애니메이션
      const footer = document.querySelector('footer');
      if(footer) {
        window.addEventListener('scroll', function() {
          const footerTop = footer.getBoundingClientRect().top;
          const isVisible = footerTop < window.innerHeight;
          
          if(isVisible && !footer.classList.contains('animated')) {
            footer.classList.add('animated');
            
            // 푸터 내 요소 애니메이션
            const sections = footer.querySelectorAll('.footer-section');
            sections.forEach((section, index) => {
              section.style.opacity = '0';
              section.style.transform = 'translateY(20px)';
              setTimeout(() => {
                section.style.transition = 'all 0.5s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
              }, 100 + index * 100);
            });
          }
        });
      }
    });

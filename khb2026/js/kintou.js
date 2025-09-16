   // 縦書き自動調整機能
    window.applyVerticalLayout = (elementId, containerHeight) => {
      const element = document.getElementById(elementId);
      if (!element) {
        console.warn(`Element with id "${elementId}" not found`);
        return;
      }

      // 縦書きクラスを追加
      element.classList.add('auto-vertical');
      
      // コンテナの高さを設定（指定がない場合は親要素の高さを使用）
      const fallbackHeight = element.parentElement ? element.parentElement.clientHeight : 0;
      const availableHeight = containerHeight || fallbackHeight;
      if (!availableHeight || availableHeight <= 0) {
        return;
      }
      
      // 文字列から改行を取り、前後空白は削る
      const text = element.textContent.replace(/\r?\n/g, '').trim();
      
      // 初期化
      element.style.letterSpacing = '0px';
      element.style.transform = 'none';
      
      // 文字数（サロゲートペア対応）
      const charCount = Array.from(text).length;
      
      // 現在（字間0・スケール無し）の高さ
      const naturalHeight = element.getBoundingClientRect().height;
      
      if (naturalHeight > availableHeight + 0.5) {
        // はみ出し → 縦方向に圧縮（扁平）
        const scale = availableHeight / naturalHeight;
        element.style.transform = `scaleY(${scale})`;
      } else {
        // 余り → letter-spacing で上下端ぴったり
        if (charCount > 1) {
          const gaps = charCount - 1;
          let spacing = (availableHeight - naturalHeight) / gaps;
          element.style.letterSpacing = `${spacing}px`;
          
          // 反映後の微調整（丸め誤差対応）
          const adjustedHeight = element.getBoundingClientRect().height;
          if (Math.abs(adjustedHeight - availableHeight) > 0.5 && adjustedHeight > 0) {
            const adjust = availableHeight / adjustedHeight;
            spacing = spacing * adjust;
            element.style.letterSpacing = `${spacing}px`;
          }
        }
      }
    };

    // 俳句欄の自動調整を適用する関数
    window.applyHaikuLayout = () => {
      // 各俳句欄のIDに対して自動調整を適用
      const haikuElements = [
        'k1_1', 'k1_3', 'k1_5',
        'k2_1', 'k2_3', 'k2_5', 
        'k3_1', 'k3_3', 'k3_5',
        'k4_1', 'k4_2', 'k4_3', 'k4_4', 'k4_5',
        'teamName'
      ];
      
      haikuElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element && element.textContent.trim()) {
          const availableHeight = getAvailableHeight(element);
          if (availableHeight > 0) {
            applyVerticalLayout(elementId, availableHeight);
          }
        }
      });
    };

    // ページ読み込み後に自動調整を適用
    document.addEventListener('DOMContentLoaded', () => {
      // 初回実行
      setTimeout(applyHaikuLayout, 100);
      
      // 俳句欄のテキスト変更を監視
      const haikuElements = [
        'k1_1', 'k1_3', 'k1_5',
        'k2_1', 'k2_3', 'k2_5', 
        'k3_1', 'k3_3', 'k3_5',
        'k4_1', 'k4_2', 'k4_3', 'k4_4', 'k4_5',
        'teamName'
      ];
      
      // 各要素にMutationObserverを設定
      haikuElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
          const observer = new MutationObserver(() => {
            setTimeout(() => {
              const availableHeight = getAvailableHeight(element);
              if (availableHeight > 0) {
                applyVerticalLayout(elementId, availableHeight);
              }
            }, 50);
          });
          observer.observe(element, { childList: true, characterData: true, subtree: true });
        }
      });
      
      // 定期的に再調整（フォールバック）
      setInterval(applyHaikuLayout, 1000);
    });
    
    // 利用可能な高さを計算する補助関数
    function getAvailableHeight(element) {
      const parent = element.closest('#left2, #right2');
      if (!parent) {
        const fallbackParent = element.parentElement;
        return fallbackParent ? fallbackParent.clientHeight : 0;
      }

      const h3 = parent.querySelector('h3');
      const h3Height = h3 ? h3.offsetHeight : 0;

      const parentStyles = window.getComputedStyle(parent);
      const parentPaddingTop = parseFloat(parentStyles.paddingTop) || 0;
      const parentPaddingBottom = parseFloat(parentStyles.paddingBottom) || 0;

      const container = element.parentElement;
      const containerStyles = container ? window.getComputedStyle(container) : null;
      const containerPaddingTop = containerStyles ? parseFloat(containerStyles.paddingTop) || 0 : 0;
      const containerPaddingBottom = containerStyles ? parseFloat(containerStyles.paddingBottom) || 0 : 0;

      const availableHeight = parent.clientHeight
        - h3Height
        - parentPaddingTop
        - parentPaddingBottom
        - containerPaddingTop
        - containerPaddingBottom;

      return availableHeight > 0 ? availableHeight : 0;
    }

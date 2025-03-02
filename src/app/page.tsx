'use client';
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

/*
首頁主組件
首頁標題、簡介、公告三個部分
*/
export default function Home() {
  // 追踪當前顯示的畫面編號（1-3）
  const [currentSlide, setCurrentSlide] = useState(1);
  // 追踪頁面滾動進度（0-1）
  const [scrollProgress, setScrollProgress] = useState(0);
  // 控制呼吸效果的不透明度
  const [breatheOpacity, setBreatheOpacity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  /*
  標題的呼吸效果動畫
  使用 requestAnimationFrame 創建平滑的透明度變化
  */
  useEffect(() => {
    const breatheAnimation = () => {
      const duration = 4000; // 動畫週期 4 秒
      const animate = (timestamp: number) => {
        const progress = (timestamp % duration) / duration;
        const opacity = 0.7 + 0.3 * Math.sin(progress * Math.PI * 2);
        setBreatheOpacity(opacity);
        requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    };

    breatheAnimation();
  }, []);

  /*
  監聽畫面滾動事件
  根據滾動位置更新進度和當前畫面
  */
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / scrollHeight;
      setScrollProgress(progress);

      // 更新當前畫面
      if (progress < 0.3) setCurrentSlide(1);
      else if (progress < 0.65) setCurrentSlide(2);
      else setCurrentSlide(3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
  計算各個畫面的不透明度
  */
  const getSlideOpacity = (slideNumber: number) => {
    switch (slideNumber) {
      case 1:
        const scrollFade = 1 - (scrollProgress / 0.3);
        return scrollFade * breatheOpacity;
      case 2:
        if (scrollProgress < 0.3) return 0;
        if (scrollProgress < 0.35) return (scrollProgress - 0.3) / 0.05;
        if (scrollProgress < 0.65) return 1;
        if (scrollProgress < 0.7) return 1 - ((scrollProgress - 0.65) / 0.05);
        return 0;
      case 3:
        return scrollProgress > 0.65 ? (scrollProgress - 0.65) / 0.05 : 0;
      default:
        return 0;
    }
  };

  /**
  滾動到指定的畫面位置
  @param slideNumber - 目標畫面編號
  */
    const scrollToSlide = (slideNumber: number) => {
      let top = 0;
      if (slideNumber === 2) {
        top = window.innerHeight
      } else if (slideNumber === 3) {
        top = window.innerHeight * 2
      }
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    };

  return (
    <div className="h-[300vh] bg-black snap-y snap-mandatory overflow-y-auto scroll-smooth">
      {/*第一張：首頁標題*/}
      <div className="h-screen snap-center relative">
        <div
          style={{
            opacity: getSlideOpacity(1),
            transition: 'opacity 0.1s ease-out'
          }}
          className="fixed inset-0 bg-black flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="flex items-center gap-4 pointer-events-auto">
            <Image
              className="invert"
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
            />
            <span className="text-5xl font-bold text-white">讀書會</span>
          </div>

          {/*向下滾動提示動畫*/}
          <div className="absolute bottom-8 animate-bounce pointer-events-auto">
            <Image
              src="/Down.jpg"
              alt="Down"
              width={30}
              height={30}
              className="opacity-80"
            />
          </div>
        </div>

        {/*透明點擊區域的位置*/}
        <button 
          onClick={() => scrollToSlide(2)}
          className="absolute bottom-0 left-0 w-full h-16 cursor-pointer z-10"
          style={{ bottom: '0', top: 'calc(100% - 64px)' }}  // 設定固定高度，從底部往上64px
          aria-label="滾動到簡介部分"
        />
      </div>

      {/*第二張：讀書會簡介*/}
      <div className="h-screen snap-center">
        <div
          style={{
            opacity: getSlideOpacity(2),
            transition: 'opacity 0.3s ease-out'
          }}
          className="fixed inset-0 bg-black flex"
        >
          {/*左側導航*/}
          <div className="w-48 p-8 flex flex-col gap-4 text-white">
            {['Next.js 讀書會', '簡介', '公告'].map((text, index) => {
              const slideNumber = index + 1;
              return (
                <button
                  key={text}
                  onClick={() => scrollToSlide(slideNumber)}
                  className={`text-left transition-colors ${currentSlide === slideNumber
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-300'
                    }`}
                >
                  {text}
                </button>
              );
            })}
          </div>

          {/*內容區域*/}
          <div className="flex-1 flex items-center justify-center">
            <div 
              className="group relative w-48 h-48"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/*按鈕*/}
              <button className="w-full h-full bg-transparent border border-gray-700 rounded-md group-hover:border-gray-500 transition-all duration-300">
                <span className="text-white text-xl">測試鈕</span>
              </button>

              {/*懸浮內容*/}
              <div 
                className={`fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm
                  transition-all duration-300 
                  ${isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              >
                <h1 className="text-4xl text-white font-bold">尚未創建內容</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*第三張：活動公告*/}
      <div className="h-screen snap-center">
        <div
          style={{
            opacity: getSlideOpacity(3),
            transition: 'opacity 0.3s ease-out'
          }}
          className="fixed inset-0 bg-black flex"
        >
          {/*左側導航*/}
          <div className="w-48 p-8 flex flex-col gap-4 text-white">
              {['Next.js 讀書會', '簡介', '公告'].map((text, index) => {
                const slideNumber = index + 1;
                return (
                  <button
                    key={text}
                    onClick={() => scrollToSlide(slideNumber)}
                    className={`text-left transition-colors ${currentSlide === slideNumber
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-300'
                      }`}
                  >
                    {text}
                  </button>
                );
              })}
            </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-8">
              <div className="text-white space-y-4">
                <h1 className="text-4xl font-bold text-center">尚未創建內容</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';
import Image from "next/image";
import {useEffect, useState} from "react";

/*
首頁主組件
首頁標題、簡介、公告三個部分
*/
export default function Home() {
    // 追踪當前顯示的畫面編號（1-3）
    const [currentSlide, setCurrentSlide] = useState(1);
    // 追踪頁面滾動進度（0-1）
    const [scrollProgress, setScrollProgress] = useState(0);

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
                return 1 - (scrollProgress / 0.3);
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
        <>
            <div className="h-[300vh] relative bg-black scroll-smooth">
                {/*左側導航*/}
                <div
                    className={`sticky z-50 top-16 right-0 w-48 px-4 flex flex-col gap-4 text-white`}
                    style={{
                        opacity: 1 - getSlideOpacity(1),
                        transition: 'opacity 0.1s ease-out'
                    }}>
                    {['讀書會', '簡介', '公告'].map((text, index) => {
                        const slideNumber = index + 1;
                        return (
                            <button
                                key={text}
                                onClick={() => scrollToSlide(slideNumber)}
                                className={`text-left transition-colors cursor-pointer ${currentSlide === slideNumber ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                {text}
                            </button>
                        );
                    })}
                </div>

                <div className={"sticky top-0 left-0 -mt-48 h-screen w-screen"}>
                    {/*第一張：首頁標題*/}
                    <div
                        style={{
                            opacity: getSlideOpacity(1),
                            transition: 'opacity 0.1s ease-out'
                        }}
                        className="absolute top-0 left-0 h-full w-full inset-0 bg-black flex flex-col items-center justify-center"
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

                        {/*向下滾動按鈕+提示動畫*/}
                        <button
                            onClick={() => scrollToSlide(2)}
                            className="absolute z-10 w-full bottom-0 h-16 cursor-pointer flex items-center justify-center">
                            <Image
                                src="/Down.jpg"
                                alt="Down"
                                width={30}
                                height={30}
                                className="opacity-80 animate-bounce"
                            />
                        </button>
                    </div>

                    {/*第二張：讀書會簡介*/}
                    <div style={{
                        opacity: getSlideOpacity(2),
                        transition: 'opacity 0.3s ease-out'
                    }} className="absolute top-0 left-0 h-full w-full bg-black  flex items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-4xl text-white font-bold mb-4">全台唯一面向初學者的網頁開發讀書會</h1>
                        </div>
                    </div>

                    {/*第三張：活動公告*/}
                    <div className="h-screen snap-center">
                        <div
                              style={{
                                opacity: getSlideOpacity(3),
                                transition: 'opacity 0.3s ease-out'
                              }}
                              className="inset-0 bg-black"
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-white text-4xl font-bold">
                                  尚未創建內容
                                </div>
                              </div>
                            </div>
                    {/*將以(嵌入 Google 日曆)作為公告內容*/}
                    {/* <div
                      style={{
                        opacity: getSlideOpacity(3),
                        transition: 'opacity 0.3s ease-out',
                      }}
                      className="absolute top-0 left-0 h-full w-full bg-black flex items-center justify-center"
                    >
                      <iframe
                        src="https://calendar.google.com/calendar/embed?src=你的日曆ID&ctz=Asia/Taipei"
                        style={{ border: 0 }}
                        width="800"
                        height="600"
                        className="rounded-xl shadow-lg"
                        allowFullScreen>  
                      </iframe>
                    </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}
